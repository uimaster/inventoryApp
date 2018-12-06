
export const BASEURL = 'http://apietrax.iflotech.in/api/'; // Dev base url
// export const BASEURL = 'http://192.168.1.20:90/api/'; // Live base url
// export const BASEURL = 'http://192.168.1.60:90/api/'; // Live base url


// Masters urls //
export const LOGIN_URL = BASEURL + 'jwtauth/Token';
export const GETSTOCK_URL = BASEURL + 'Stockitem/GetStockItems';
export const GETUNIT_URL = BASEURL + 'Units/GetUnitsList';
export const GETSTOCKGROUP_URL = BASEURL + 'StockGroup/GetStockGroupList';
export const GETLEDGERLIST = BASEURL + 'Ledger/GetLedgerList';
export const REFRESHTOKEN_URL = BASEURL + 'jwtauth/TokenRefresh';
export const UPDATELEDGERLIST = BASEURL + 'Ledger/UpdateLedgerDetails';
export const UPDATEUNITLIST = BASEURL + 'Units/UpdateUnitDetails';
export const UPDATESTOCKGROUPLIST = BASEURL + 'StockGroup/UpdateStockGroupDetails';
export const GETSTOCKITEM = BASEURL + 'Stockitem/GetStockItemDetails';
export const GETCUSTOMERLIST = BASEURL + 'Masters/GetCustomerList';
export const GETCUSTOMERDETAIL = BASEURL + 'Masters/GetCustomerDetails';
export const GETSUPPLIERLIST = BASEURL + 'Masters/GetSupplierList';
export const GETSUPPLIERDETAIL = BASEURL + 'Masters/GetSupplierDetails';
export const UPDATESUPPLIER = BASEURL + 'Masters/UpdateSupplierDetails';
export const UPDATECUSTOMER =  BASEURL + 'Masters/UpdateCustomerDetails';
export const UPDATESTOCK =  BASEURL + 'Stockitem/UpdateStockItemDetails';
export const CALCULATEDON =  BASEURL + 'Masters/GetCalculatedOnList';
export const TAXTYPE =  BASEURL + 'Masters/GetTaxTypeList';
export const LOCATIONURL = BASEURL + 'Masters/GetLocationList';
export const CURRENCYLISTURL = BASEURL + 'Masters/GetCurrencyList';

// Transaction urls //
export const GETTRANSACTION = BASEURL + 'Transactions/GetTransactionsList';
export const GETTRANSACTIONDETAILS = BASEURL + 'Transactions/GetTransactionDetails';
export const POSTTRANSACTION = BASEURL + 'Transactions/UpdateTransaction';
export const GETPOAUTHLIST = BASEURL + 'Transactions/getPOAuthList';
export const POSTPOAUTHLIST = BASEURL + 'Transactions/UpdatePOAuthStatus';
export const GETSALESORDERVERIFICATIONLIST = BASEURL + 'Transactions/GetSalesOrderDueForVerificationList';
export const GETSALESGENERATIONLIST = BASEURL + 'Transactions/GetSalesOrderDueForInvoiceList';
export const POSTSALESORDERVERIFICATION =  BASEURL + 'Transactions/PostSalesOrderVerification';
export const POSTINVOICEGENERATION =  BASEURL + 'Transactions/PostSalesInvoiceGeneration';
export const GETTAXTYPE = BASEURL + 'Ledger/GetTaxLedgerList';
export const GETPENDINGPOLIST = BASEURL + 'Transactions/getPendingPOList';
export const GETPENDINGSALESORDERLIST = BASEURL + 'Transactions/GetPendingSalesOrderList';
// export const GETPENDINGPOLIST = BASEURL + 'Transactions/getPendingPOList';
