export interface CustomerResponse {
    message: string;
    status: string;
    data: {};
}

export interface Customer {
    customer_ID: number;
    customerName: string;
    customerAddress: string;
    state: string;
    contactNos: string;
    customerGSTIN: string;
   

}
