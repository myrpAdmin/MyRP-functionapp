import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { HttpMethod } from "../types/common";
import DesignService from "../services/designService";
import { IDesign } from "../types/designType";
import { BlobServiceClient } from "@azure/storage-blob";

const multipart = require("parse-multipart");

const svc = new DesignService();

export async function design(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  let path = request.params && request.params.path;

  if (path == "upload") {
    return await uploadDesign(request, context);
  } else if (path == "stoneMapping") {
    if (request.method == HttpMethod.GET) {
      return handleStoneMappingGet(request, context);
    } else if (request.method == HttpMethod.POST) {
      return handleStoneMappingPost(request, context);
    }
    return await uploadDesign(request, context);
  } else {
    if (request.method == HttpMethod.GET) return handleGet(request, context);
    else if (request.method == HttpMethod.POST)
      return handlePost(request, context);
    else if (request.method == HttpMethod.DELETE)
      return handleDelete(request, context);
  }
}

export async function uploadDesign(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  let bodyBuffer = Buffer.from(await request.arrayBuffer());
  let s = request.headers.get("content-type");
  let boundary = multipart.getBoundary(s);
  var part = multipart.Parse(bodyBuffer, boundary);
  let designId = request.query.get("designId");
  if (designId && designId != "" && part.length > 0) {
    let filename = request.query.get("filename")
      ? request.query.get("filename")
      : part[0].filename;
    const storageSecret = "replace value";
    const blobServiceClient = await BlobServiceClient.fromConnectionString(
      `DefaultEndpointsProtocol=https;AccountName=myrpfilestorage;AccountKey=${storageSecret};EndpointSuffix=core.windows.net`
    );
    const containerClient = blobServiceClient.getContainerClient("myrp");
    const blockBlobClient = containerClient.getBlockBlobClient(
      "design/" + designId + "/" + filename
    );

    const response = blockBlobClient.upload(part[0].data, part[0].data.length);

    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "upload success",
        response,
      }),
    };
  } else {
    return {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "designId/file not provided",
      }),
    };
  }
}

async function handleGet(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const designs = await svc.getDesign(request.query.get("designId"));
  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(designs),
  };
}
async function handleDelete(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const designId = request.query.get("designId");
  let response = "";
  if (designId) {
    response = (await svc.deleteDesign(+designId)) as any;
  }

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
}
async function handlePost(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const design = await request.json();
  let response = await svc.saveDesign(design as IDesign);
  return { body: JSON.stringify(response) };
}

async function handleStoneMappingGet(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const designs = await svc.getStoneMapping(request.query.get("designId"));
  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(designs),
  };
}
async function handleStoneMappingPost(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const stoneMappings = await request.json();
  let response = await svc.saveStoneMapping(
    request.query.get("designId"),
    stoneMappings as [IStoneMapping]
  );
  return { body: JSON.stringify(response) };
}

app.http("design", {
  methods: ["GET", "POST", "DELETE"],
  authLevel: "anonymous",
  handler: design,
  route: "design/{*path}",
});
