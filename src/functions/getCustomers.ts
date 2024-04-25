import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import CustomerSvc from "../services/customer";

export async function getCustomers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    const svc = new CustomerSvc();
    const customers = await svc.getCustomers();

    return { status: 200,
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        },
        body: JSON.stringify(customers)
    };
};

app.http('getCustomers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: getCustomers
});
