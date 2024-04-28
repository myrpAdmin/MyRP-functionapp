import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { HttpMethod } from "../myrpTypes";
import CustomerService from "../services/customerService";

export async function customer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    if(request.method == HttpMethod.GET)
        return handleGet(request, context);
    else if (request.method == HttpMethod.POST)
        return handlePost(request, context);
};

app.http('customer', {
    authLevel: 'anonymous',
    handler: customer,
});


async function handleGet(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const svc = new CustomerService();
    const customers = await svc.getCustomer(+request.query.get("id"));

    return { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customers)
    };
}

async function handlePost(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    
    return { body: `Hello, ${name}!` };
}

