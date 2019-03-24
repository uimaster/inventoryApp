
export const BASEURL = 'http://apietrax.iflotech.in/api/'; // Dev base url
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
export const UPDATECUSTOMER = BASEURL + 'Masters/UpdateCustomerDetails';
export const UPDATESTOCK = BASEURL + 'Stockitem/UpdateStockItemDetails';
export const CALCULATEDON = BASEURL + 'Masters/GetCalculatedOnList';
export const TAXTYPE = BASEURL + 'Masters/GetTaxTypeList';
export const LOCATIONURL = BASEURL + 'Masters/GetLocationList';
export const CURRENCYLISTURL = BASEURL + 'Masters/GetCurrencyList';
export const GETSTATEURL = BASEURL + 'Masters/GetStates';
export const GETLEDGERGROUPLIST = BASEURL + 'Ledger/GetLedgerGroupList';
export const GETSTOCKITEMGROUP = BASEURL + '/Stockitem/GetStockItemsforGroup';

// Transaction urls //
export const GETTRANSACTION = BASEURL + 'Transactions/GetTransactionsList';
export const GETTRANSACTIONDETAILS = BASEURL + 'Transactions/GetTransactionDetails';
export const POSTTRANSACTION = BASEURL + 'Transactions/UpdateTransaction';
export const GETPOAUTHLIST = BASEURL + 'Transactions/getPOAuthList';
export const POSTPOAUTHLIST = BASEURL + 'Transactions/UpdatePOAuthStatus';
export const GETSALESORDERVERIFICATIONLIST = BASEURL + 'Transactions/GetSalesOrderDueForVerificationList';
export const GETSALESGENERATIONLIST = BASEURL + 'Transactions/GetSalesOrderDueForInvoiceList';
export const POSTSALESORDERVERIFICATION = BASEURL + 'Transactions/PostSalesOrderVerification';
export const POSTINVOICEGENERATION = BASEURL + 'Transactions/PostSalesInvoiceGeneration';
export const GETTAXTYPE = BASEURL + 'Ledger/GetTaxLedgerList';
export const GETPENDINGPOLIST = BASEURL + 'Transactions/getPendingPOList';
export const GETPENDINGSALESORDERLIST = BASEURL + 'Transactions/GetPendingSalesOrderList';
export const GETITEMLIST = BASEURL + 'Stockitem/GetStockItems';
export const GENERATEREPORT = BASEURL + 'Reports/GenerateReportsPDF';
export const DOWNLOADREPORT = BASEURL + 'ReportDownload/DownloadReportPDF';
export const VALIDATEBATCH = BASEURL + 'StockItem/GetValidateBatch';
export const GETTRANSACTIONTYPESERIES = BASEURL + 'Transactions/GetTransactionTypeSeries';
export const GETITEMSRATE = BASEURL + 'StockItem/GetStockItemRate';
export const GETLEDGERLOCATION = BASEURL + 'Masters/GetLedgerLocationList';


// PriceLIST
export const GETPRICELISTLIST = BASEURL + 'PriceLists/GetPriceLists';
export const GETPRICELISTDETAIL = BASEURL + 'PriceLists/GetPriceListDetails';
export const UPDATEPRICELIST = BASEURL + 'PriceLists/UpdatePriceList';

// Bill of Material URLS
export const GETBOMLIST = BASEURL + 'BOM/getBOMList';
export const GETBOMDETAIL = BASEURL + 'BOM/GetBOMDetails';
export const GETBOMTYPES = BASEURL + 'BOM/GetBOMType';
export const GETBOMLEVELS = BASEURL + 'BOM/getBOMLevels';
export const GETBOMCOMTYPES = BASEURL + 'BOM/getBOMComponentTypes';
export const GETBOMPARATYPES = BASEURL + 'BOM/getParameterTypes';
export const UPDATEBOM = BASEURL + 'BOM/POSTUpdateBOM';

// Planning
export const GETFGLIST = BASEURL + 'planning/getFGPlanList';
export const GETFGDETAIL = BASEURL + 'planning/GetFGPlanDetails';
export const UPDATEFG = BASEURL + 'planning/POSTUpdateFGPlan';
export const GETRMQLIST = BASEURL + 'planning/getRMQList';
export const GETRMQDETAIL = BASEURL + 'planning/GetRMQDetails';
export const UPDATERMQ = BASEURL + 'planning/POSTUpdateRMQ';
export const GETSTOCKITEMFORGROUP = BASEURL + 'Stockitem/GetStockItemsforGroup';

// REPORTS
export const POREPORT = BASEURL + 'Reports/GeneratePOReport';
export const SOREPORT = BASEURL + 'Reports/GenerateSOReport';
export const SODETAILSREPORT = BASEURL + 'Reports/GenerateSODetailsReport';
export const DESPATCHDETAILSREPORT = BASEURL + 'Reports/GenerateDespatchDetailsReport';
export const STOCKSUMMARYREPORT = BASEURL + 'Reports/GenerateStockSummaryReport';
export const MSLREPORT = BASEURL + 'Reports/GenerateMSLReport';
export const SALESREPORT = BASEURL + 'Reports/GenerateSalesReport';
export const GRNREGISTER = BASEURL + 'Reports/GenerateGRNRegister';
export const STOCKISSUEREGISTER = BASEURL + 'Reports/GenerateStockIssueRegister';
export const STOCKITEMLIST = BASEURL + 'Stockitem/GetStockItemsforTransaction';
export const GETSHIPPINGDETAILS = BASEURL + 'Transactions/GetShippingDetailsForInvoice';
export const UPDATESHIPPINGDETAILS = BASEURL + 'Transactions/UpdateShippingInfoForInvoices';
export const GETSHIPPINGLEDGERS = BASEURL + 'Ledger/getTransporterList';

// Users
export const USERLIST = BASEURL + 'Users/GetUsersList';
export const GETUSERDETAILS = BASEURL + 'Users/GetUsersDetails';
