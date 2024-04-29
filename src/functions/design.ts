import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { HttpMethod } from "../types/common";
import DesignService from "../services/designService";
import { IDesign } from "../types/designType";

const svc = new DesignService();

export async function design(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  if (request.method == HttpMethod.GET) return handleGet(request, context);
  else if (request.method == HttpMethod.POST)
    return handlePost(request, context);
  else if (request.method == HttpMethod.DELETE)
    return handleDelete(request, context);
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
  svc.saveDesign(design as IDesign);
  return { body: JSON.stringify(design) };
}

app.http("design", {
  methods: ["GET", "POST", "DELETE"],
  authLevel: "anonymous",
  handler: design,
});
