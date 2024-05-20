import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { HttpMethod } from "../types/common";
import CustomerService from "../services/customerService";
import CommonMasterRepo from "../repositories/commonMasterRepo";
import CommonMasterService from "../services/commonMasterService";

const svc = new CustomerService();

export async function common(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  if (request.method == HttpMethod.GET) return handleGet(request, context);
}

async function handleGet(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const svc = new CommonMasterService();
  const masterData = await svc.getMasterData(request.query.get("groupKey"));

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(masterData),
  };
}

app.http("common", {
  methods: ["GET", "POST", "DELETE"],
  authLevel: "anonymous",
  handler: common,
  route: "common/{*path}",
});
