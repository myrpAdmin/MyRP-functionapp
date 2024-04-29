import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { HttpMethod } from "../types/common";
import CustomerService from "../services/customerService";
import { ICustomer } from "../types/customerType";

const svc = new CustomerService();

export async function customer(
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
  const svc = new CustomerService();
  const customers = await svc.getCustomer(request.query.get("id"));

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customers),
  };
}
async function handleDelete(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const svc = new CustomerService();
  const id = request.query.get("id");
  let response = "";
  if (id) {
    response = (await svc.deleteCustomer(+id)) as any;
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
  const customer = await request.json();
  svc.saveCustomer(customer as ICustomer);
  return { body: JSON.stringify(customer) };
}

app.http("customer", {
  methods: ["GET", "POST", "DELETE"],
  authLevel: "anonymous",
  handler: customer,
});
