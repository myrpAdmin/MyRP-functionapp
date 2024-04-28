interface ICustomer {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    tenantId: number;
    createdBy: number;
    createdOn: Date;
    updatedBy: number;
    updatedOn: Date;
    softDelete: boolean;
}

export enum HttpMethod {
    GET = "GET",
    POST = "POST"
}


export type {
    ICustomer
}