export interface LedgerResponse {
    message: string;
    status: string;
    data: {};
}

export interface Ledger {
    ledger_ID: number;
    ledgerName: string;
    ledgerGroupID: number;
    rateofTax: number;
    calculatedOn: number;
    taxType: number;
    company_ID: number;
    uSerID: number;

}
