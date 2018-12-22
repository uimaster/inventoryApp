export interface StockGroupResponse {
    message: string;
    status: string;
    data: {};
}


export interface StockGroup {
    stockGroup_ID: number;
    stockGroupName: string;
    parentName: string;
    activeStatus: boolean;
    company_ID: number;
    userID: number;
}
