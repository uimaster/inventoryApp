import {Router, ActivatedRoute} from "@angular/router";
import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from "@angular/core";
import {FormBuilder, FormGroup, FormArray} from "@angular/forms";
import {PurchaseService} from "../purchase/purchase.service";
import {StockService} from "../masters/stock/services/stock.service";
import {LedgerService} from "../masters/ledger/services/ledger.service";
import {TransactionServices} from "./transaction.service";
import {SupplierService} from "../masters/supplier/services/supplier.service";
import {SelectItem} from "primeng/primeng";
import {CustomerService} from "../masters/customer/services/customer.service";
import {Alert} from "selenium-webdriver";

@Component({selector: "app-transaction-form", templateUrl: "./transaction.form.html", styleUrls: ["./transaction.form.scss"]})
export class TransactionFormComponent implements OnInit,
OnDestroy {
    public transactionForm : any;
    public showError = false;
    public showSuccess = false;
    public successMsg = "";
    public errorMsg = "";
    public companyId = localStorage.getItem("companyID");
    public userId = localStorage.getItem("userID");
    public transactionId = localStorage.getItem("transactionID");
    public detailsData = {};
    public ItemData = [];
    public ledgerData = [];
    public POData = [];
    public currencyList = [];
    public itemMasterList = [];
    public locationList = [];
    public ledgerList = [];
    public customerList = [];
    public salesOrderPendingList = [];
    public POpendingList = [];
    public transactionTypeSeriesList = [];
    public boxDetailData = [];
    public batchDetailData = [];
    public GRNTermsData = [];
    public invoiceTermData = [];
    public workCompletionData = [];
    public supplierList = [];
    public transItemDetails = true;
    public transLedgerDetails = true;
    public transPOTerms = true;
    public transBoxDetails = true;
    public transBatchDetails = true;
    public transGRNTerms = true;
    public transInvoiceTerms = true;
    public transWorkCompletionDetails = true;
    public showCurrency = true;
    public showLocation = true;
    public totalAmount = 0;
    public date3 = new Date();
    public date5 = new Date();
    public date4 = new Date();
    public showActionBtn = false;
    public showSupplier = false;
    public showLedger = true;
    public transationLinkRef = false;
    public transactionTypeId : number;
    public gstTaxList = [];
    public selectedCar3 : any;
    public selectedCity : any;
    public showLoader = false;
    public filteredItems = [];
    public itemName : string;
    public barcodeFields = false;
    public showTransactionSeries = false;
    public showPO = false;
    public showBarcode = false;
    public transationLinkRefInput = false;
    public transationLinkRefNamePO = false;
    public GrnInput = false;
    public showBoxCode = false;
    // @ViewChild('taxSelect') taxSelect: ElementRef;
    public allBarCodesScanned = false;
    public showBarcode4Pl = false;
    public showBarcode4Fg = false;
    public showScannedQty = false;
    public displayGrnBarcodeDialog = false;
    public displayLengthDialog = false;
    public showBarcode4Grn = false;
    public displayItemDescDialog = false;
    public ledgerLocationList = [];
    public barCodeApplicableStatus = [];
    public selectedSeries;
    public eqlQty = false;
    public equalQtyList = [];
    public ItemBarCodeLength : any;
    public GRNvalidateStatus = false;

    @ViewChild("itemBarCode")itemBarCode : ElementRef;
    @ViewChild("itemQtyGnr")itemQtyGnr : ElementRef;
    @ViewChild("startLength")startLength : ElementRef;
    @ViewChild("endtLength")endtLength : ElementRef;
    @ViewChild("itemStops")itemStops : ElementRef;
    @ViewChild("barCode1")barCode1 : ElementRef;
    @ViewChild("itemDesc")itemDesc : ElementRef;

    public grnBarcodeTitle : any;
    public grnValidationMsg = "";
    public plValidationMsg = "";
    public grnItemIndex = 0;
    public showLength4So = false;
    public enableNumberTxt;
    public BarcodeSuccessMsg = "";
    public disabledScanBtn = false;
    public lengthCalcStatus = false;

    constructor(private fb : FormBuilder, private poService : PurchaseService, private stockService : StockService, private ledgerService : LedgerService, private trasactionService : TransactionServices, private supplierService : SupplierService, private customerService : CustomerService, private router : Router, private activatedRoute : ActivatedRoute) {}

    ngOnInit() {
        this.transItemDetails = JSON.parse(localStorage.getItem("transItemDetails"));
        this.transLedgerDetails = JSON.parse(localStorage.getItem("transLedgerDetails"));
        this.transPOTerms = JSON.parse(localStorage.getItem("transPOTerms"));
        this.transBoxDetails = JSON.parse(localStorage.getItem("transBoxDetails"));
        this.transBatchDetails = JSON.parse(localStorage.getItem("transBatchDetails"));
        this.transGRNTerms = JSON.parse(localStorage.getItem("transGRNTerms"));
        this.transInvoiceTerms = JSON.parse(localStorage.getItem("transInvoiceTerms"));
        this.transWorkCompletionDetails = JSON.parse(localStorage.getItem("transWorkCompletionDetails"));
        this.showCurrency = JSON.parse(localStorage.getItem("showCurrency"));

        this.showLedger = JSON.parse(localStorage.getItem("showLedger"));
        this.showSupplier = JSON.parse(localStorage.getItem("showSupplier"));
        this.transationLinkRef = JSON.parse(localStorage.getItem("transationLinkRef"));
        this.showLocation = JSON.parse(localStorage.getItem("showLocation"));
        this.transactionTypeId = JSON.parse(localStorage.getItem("transactionTypeId"));
        this.barcodeFields = JSON.parse(localStorage.getItem("barcodeFields"));
        this.showTransactionSeries = JSON.parse(localStorage.getItem("showTransactionSeries"));
        this.showPO = JSON.parse(localStorage.getItem("showPO"));
        this.showBarcode = JSON.parse(localStorage.getItem("showBarcode"));
        this.transationLinkRefInput = JSON.parse(localStorage.getItem("transationLinkRefInput"));
        this.transationLinkRefNamePO = JSON.parse(localStorage.getItem("transationLinkRefNamePO"));
        this.GrnInput = JSON.parse(localStorage.getItem("GrnInput"));
        this.showBoxCode = JSON.parse(localStorage.getItem("showBoxCode"));
        this.showActionBtn = JSON.parse(localStorage.getItem("showActionBtn"));
        this.showBarcode4Pl = JSON.parse(localStorage.getItem("showBarcode4Pl"));
        this.showBarcode4Fg = JSON.parse(localStorage.getItem("showBarcode4Fg"));
        this.showScannedQty = JSON.parse(localStorage.getItem("showScannedQty"));
        this.showBarcode4Grn = JSON.parse(localStorage.getItem("showBarcode4Grn"));
        this.showLength4So = JSON.parse(localStorage.getItem("showLength4So"));

        this.showLoader = true;
        this.getItemList();
        this.getCurrency();
        // this.getItemMasterList();
        this.getLocation();
        this.getLedgers();
        this.createTransactionForm();
        this.getSupplier();
        this.getGstRate();
        // this.getPendingSalesOrderList();
        this.getPOPendingList();
        this.getCustomers();
        this.getTransactionTypeSeries();
        setTimeout(() => {
            this.getTrasactionDetails(this.transactionId);
        }, 2000);

        setTimeout(() => {
            if (!this.isEmpty(this.detailsData)) {
                if (this.detailsData[0].transactionDate == "" || this.detailsData[0].transactionDate == null) {
                    this.getSelectedDate(this.date3, "transactionDate");
                }
                if (this.transPOTerms !== undefined) {
                    if (this.POData.length > 0) {
                        if (this.POData[0].transactionDueDate == "" || this.POData[0].transactionDueDate == null) {
                            this.getSelectedDate(this.date5, "transactionDueDate");
                        }
                    }
                }
            } else {
                this.getSelectedDate(this.date3, "transactionDate");
                if (this.transPOTerms) {
                    this.getSelectedDate(this.date5, "transactionDueDate");
                }
            }

            this.selectedSeries = this.transactionTypeSeriesList[0].value;
            const LedgerId = this.transactionForm.controls["ledgerID"].value;
            if (LedgerId) {
                this.getLedgerLocation(LedgerId);
            }
        }, 6000);
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    createTransactionForm() {
        this.transactionForm = this.fb.group({
            transactionID: [0],
            transactionDate: [0],
            transactionNo: [""],
            poNo: [""],
            transactionTypeId: [this.transactionTypeId],
            transactionSeriesID: [0],
            ledgerID: [0],
            transactionLinkID: [0],
            transactionLinkRef: [""],
            companyID: [JSON.parse(this.companyId)],
            locationID: [1],
            transaction_Remarks: [""],
            transaction_Amount: [0],
            transaction_PendingAmount: [0],
            currencyID: [1],
            ledaddid: [0],
            // transactionDueDate: [''],
            userID: [JSON.parse(this.userId)],
            transItemDetails: this.fb.array(
                [this.createItemDetails()]
            ),
            transLedgerDetails: this.fb.array(
                [this.createLedgerDetails()]
            ),
            transBoxDetails: this.fb.array(
                [this.createBoxDetails()]
            ),
            transBatchDetails: this.fb.array(
                [this.createBatchDetails()]
            ),
            transGRNTerms: this.fb.array(
                [this.createGRNTerms()]
            ),
            transPOTerms: this.fb.array(
                [this.createPOTerms()]
            ),
            transInvoiceTerms: this.fb.array(
                [this.createInvoiceTerms()]
            ),
            transWorkCompletionDetails: this.fb.array(
                [this.createWorkCompletionDetails()]
            )
        });
    }

    createBoxDetails() {
        if (this.transBoxDetails) {
            return this.fb.group({
                stockitemID: [0],
                stockItemDesc: "",
                itemQty: [0],
                itemRate: [0],
                itemAmount: [0],
                transactionBoxSerialNo: [0],
                boxPosition: [0],
                SCHREF: [0]
            });
        } else {
            return this.fb.group([]);
        }
    }

    get transactionBoxSerialNo() {
        return this.transactionForm.get(["transBoxDetails"], 0, ["transactionBoxSerialNo"]);
    }
    get boxPosition() {
        return this.transactionForm.get(["transBoxDetails"], 0, ["boxPosition"]);
    }
    get SCHREF() {
        return this.transactionForm.get(["transBoxDetails"], 0, ["SCHREF"]);
    }
    get ledaddid() {
        return this.transactionForm.get("ledaddid");
    }

    createBatchDetails() {
        if (this.transBatchDetails) {
            return this.fb.group({
                batchNo: [0],
                itemCode: [0],
                stockitemID: [0],
                batchID: [0],
                qty: [0],
                transactionID: [0]
            });
        } else {
            return this.fb.group([]);
        }
    }

    addBatch() {
        const stockItemArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
        stockItemArray.push(this.fb.group({batchNo: [0], stockitemID: [0], batchID: [0]}));
    }

    removeBatch(index) {
        const stockItemArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
        stockItemArray.removeAt(index);
    }

    get batchNo() {
        return this.transactionForm.get(["transBatchDetails"], 0, ["batchNo"]);
    }
    get batchID() {
        return this.transactionForm.get(["transBatchDetails"], 0, ["batchID"]);
    }

    createGRNTerms() {
        if (this.transGRNTerms) {
            return this.fb.group({
                inwardNo: [1],
                inwardDate: [0],
                transporter: [0],
                dcNo: [0],
                dcDate: [0],
                invoiceNo: [0],
                invoiceDate: [0]
            });
        } else {
            return this.fb.group([]);
        }
    }
    get inwardNo() {
        return this.transactionForm.get(["transGRNTerms"], 0, ["inwardNo"]);
    }
    get batcInwardDatehID() {
        return this.transactionForm.get(["transGRNTerms"], 0, ["inwardDate"]);
    }
    get transporter() {
        return this.transactionForm.get(["transGRNTerms"], 0, ["transporter"]);
    }
    get dcNo() {
        return this.transactionForm.get(["transGRNTerms"], 0, ["dcNo"]);
    }
    get dcDate() {
        return this.transactionForm.get(["transGRNTerms"], 0, ["dcDate"]);
    }
    get invoiceNo() {
        return this.transactionForm.get(["transGRNTerms"], 0, ["invoiceNo"]);
    }
    get invoiceDate() {
        return this.transactionForm.get(["transGRNTerms"], 0, ["invoiceDate"]);
    }

    createInvoiceTerms() {
        if (this.transInvoiceTerms) {
            return this.fb.group({
                transporterLedgerID: [1],
                transporterLRNO: [0],
                transporterLRDate: [0],
                transporterGSTIN: [0],
                GSTEwayBillNo: [0],
                GSTEWayBillDate: [0]
            });
        } else {
            return this.fb.group([]);
        }
    }
    get transporterLedgerID() {
        return this.transactionForm.get(["transInvoiceTerms"], 0, ["transporterLedgerID"]);
    }
    get transporterLRNO() {
        return this.transactionForm.get(["transInvoiceTerms"], 0, ["transporterLRNO"]);
    }
    get transporterLRDate() {
        return this.transactionForm.get(["transInvoiceTerms"], 0, ["transporterLRDate"]);
    }
    get transporterGSTIN() {
        return this.transactionForm.get(["transInvoiceTerms"], 0, ["transporterGSTIN"]);
    }
    get GSTEwayBillNo() {
        return this.transactionForm.get(["transInvoiceTerms"], 0, ["GSTEwayBillNo"]);
    }
    get GSTEWayBillDate() {
        return this.transactionForm.get(["transInvoiceTerms"], 0, ["GSTEWayBillDate"]);
    }

    createWorkCompletionDetails() {
        if (this.transWorkCompletionDetails) {
            return this.fb.group({
                jobCompletionDate: [1],
                departmentName: [0],
                transctionJobWorkRemarks: [0],
                location: [0],
                billAmount: [0],
                materialAmount: [0],
                labourAmount: [0]
            });
        } else {
            return this.fb.group([]);
        }
    }
    get jobCompletionDate() {
        return this.transactionForm.get(["transWorkCompletionDetails"], 0, ["jobCompletionDate"]);
    }
    get departmentName() {
        return this.transactionForm.get(["transWorkCompletionDetails"], 0, ["departmentName"]);
    }
    get transctionJobWorkRemarks() {
        return this.transactionForm.get(["transWorkCompletionDetails"], 0, ["transctionJobWorkRemarks"]);
    }
    get location() {
        return this.transactionForm.get(["transWorkCompletionDetails"], 0, ["location"]);
    }
    get billAmount() {
        return this.transactionForm.get(["transWorkCompletionDetails"], 0, ["billAmount"]);
    }
    get materialAmount() {
        return this.transactionForm.get(["transWorkCompletionDetails"], 0, ["materialAmount"]);
    }
    get labourAmount() {
        return this.transactionForm.get(["transWorkCompletionDetails"], 0, ["labourAmount"]);
    }

    get transactionID() {
        return this.transactionForm.get("transactionID");
    }
    get transactionDate() {
        return this.transactionForm.get("transactionDate");
    }
    get poNo() {
        return this.transactionForm.get("poNo");
    }

    get transactionNo() {
        return this.transactionForm.get("transactionNo");
    }
    get ledgerID() {
        return this.transactionForm.get("ledgerID");
    }
    get transaction_Amount() {
        return this.transactionForm.get("transaction_Amount");
    }
    get transaction_PendingAmount() {
        return this.transactionForm.get("transaction_PendingAmount");
    }
    get currencyID() {
        return this.transactionForm.get("currencyID");
    }
    get transactionDueDate() {
        return this.transactionForm.get("transactionDueDate");
    }

    get transactionLinkID() {
        return this.transactionForm.get("transactionLinkID");
    }

    createItemDetails() {
        if (this.transItemDetails) {
            return this.fb.group({
                transactionID: [0],
                stockitemID: [0],
                transactionItem_AdditionalDesciption: [""],
                locationID: [1],
                stockItemDesc: "",
                itemQty: [0],
                itemReceived_Qty: [0],
                itemChallan_Qty: [0],
                itemPending_Qty: [0],
                itemRate: [0],
                itemAmount: [0],
                itemStops: [0],
                itemLength: [0],
                itemEndLendth: [0],
                itemStartLength: [0],
                itemBatchApplicable: [0],
                packingBoxStockItemID: [0],
                transactionItemSerialNo: [0],
                itemBarCodeApplicableStatus: [false],
                itemBarCodeLength: [0],
                boxCode: [""]
            });
        } else {
            return this.fb.group([]);
        }
    }

    addItemDetails() { // if (this.barCodeApplicableStatus.length < 1) {
        this.barCodeApplicableStatus.push({status: false});
        // }
        // console.log(this.barCodeApplicableStatus);
        const stockItemArray = <FormArray>(this.transactionForm.get("transItemDetails"));
        stockItemArray.push(this.fb.group({
            transactionID: [1],
            stockitemID: [1],
            transactionItem_AdditionalDesciption: [],
            locationID: [1],
            itemQty: [0],
            itemReceived_Qty: [0],
            itemChallan_Qty: [0],
            itemPending_Qty: [0],
            itemRate: [0],
            itemAmount: [0],
            stockItemDesc: [""],
            itemStops: [0],
            itemLength: [0],
            itemEndLendth: [0],
            itemStartLength: [0],
            itemBatchApplicable: [0],
            packingBoxStockItemID: [0],
            transactionItemSerialNo: [0],
            itemBarCodeApplicableStatus: [false],
            itemBarCodeLength: [0],
            boxCode: [""]
        }));
    }

    deleteItemDetails(index) {
        const stockItemArray = <FormArray>(this.transactionForm.get("transItemDetails"));
        stockItemArray.removeAt(index);
        this.getAmount();
    }

    get stockitemID() {
        return this.transactionForm.get(["transItemDetails"], 0, ["stockitemID"]);
    }

    get boxCode() {
        return this.transactionForm.get(["transItemDetails"], 0, ["boxCode"]);
    }

    get stockItemDesc() {
        return this.transactionForm.get(["transItemDetails"], 0, ["stockItemDesc"]);
    }

    get transactionItem_AdditionalDesciption() {
        return this.transactionForm.get(["transItemDetails"], 0, ["transactionItem_AdditionalDesciption"]);
    }
    get itemQty() {
        return this.transactionForm.get(["transItemDetails"], 0, ["itemQty"]);
    }

    get itemRate() {
        return this.transactionForm.get(["transItemDetails"], 0, ["itemRate"]);
    }
    get itemAmount() {
        return this.transactionForm.get(["transItemDetails"], 0, ["itemAmount"]);
    }
    get itemBarCodeApplicableStatus() {
        return this.transactionForm.get(["transItemDetails"], 0, ["itemBarCodeApplicableStatus"]);
    }

    createLedgerDetails() {
        if (this.transLedgerDetails) {
            return this.fb.group({transactionID: [0], ledgerID: [1], taxRate: [0], ledgerAmount: [0]});
        } else {
            return this.fb.group([]);
        }
    }

    addItemLedger() {
        const ledgerArray = <FormArray>(this.transactionForm.get("transLedgerDetails"));
        ledgerArray.push(this.fb.group({transactionID: [0], ledgerID: [0], taxRate: [0], ledgerAmount: [0]}));
    }
    deleteItemLedger(index) {
        const ledgerArray = <FormArray>(this.transactionForm.get("transLedgerDetails"));
        ledgerArray.removeAt(index);
    }

    get taxRate() {
        return this.transactionForm.get(["transLedgerDetails"], 0, ["taxRate"]);
    }
    get ledgerAmount() {
        return this.transactionForm.get(["transLedgerDetails"], 0, ["ledgerAmount"]);
    }

    createPOTerms() {
        if (this.transPOTerms) {
            return this.fb.group({
                transactionDueDate: [0],
                transactionTransporter: [""],
                transctionSupplierRef: [""],
                transactionDeilveryTerms: [""],
                transactionPaymentTerms: [""],
                transactionPackingTerms: [""],
                transactionFreightTerms: [""]
            });
        } else {
            return this.fb.group([]);
        }
    }
    get transactionTransporter() {
        return this.transactionForm.get(["transPOTerms"], 0, ["transactionTransporter"]);
    }
    get transctionSupplierRef() {
        return this.transactionForm.get(["transPOTerms"], 0, ["transctionSupplierRef"]);
    }
    get transactionDeilveryTerms() {
        return this.transactionForm.get(["transPOTerms"], 0, ["transactionDeilveryTerms"]);
    }
    get transactionPaymentTerms() {
        return this.transactionForm.get(["transPOTerms"], 0, ["transactionPaymentTerms"]);
    }
    get transactionPackingTerms() {
        return this.transactionForm.get(["transPOTerms"], 0, ["transactionPackingTerms"]);
    }
    get transactionFreightTerms() {
        return this.transactionForm.get(["transPOTerms"], 0, ["transactionFreightTerms"]);
    }

    convertToDateFormat(Datestr) {
        // if (Datestr != '') {
        // var datedata = Datestr.split('-');
        // var formatedDateString =
        //     datedata[0] + '-' + datedata[1] + '-' + datedata[2];
        //     console.log(formatedDateString);
        // return formatedDateString;
        // }

        let dDate = new Date(Datestr.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        let year = dDate.getFullYear();
        var month: any = dDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day: any = dDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let fDate = day + "-" + month + "-" + year;
        return fDate;
    }

    getSelectedDate(date, inputTaget) {
        console.log(date);
        let dDate = new Date(date);
        let year = dDate.getFullYear();
        var month: any = dDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day: any = dDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let fDate = day + "-" + month + "-" + year;
        if (inputTaget === "transactionDate") {
            this.transactionForm.controls[inputTaget].setValue(fDate);
        } else if (inputTaget === "transactionDueDate") {
            const controlArray = <FormArray> this.transactionForm.get("transPOTerms");
            controlArray.controls[0].get("transactionDueDate").setValue(fDate);
        }
    }

    checkQty() {
        this.equalQtyList = [];
        const itemFormArray = <FormArray>(this.transactionForm.get("transItemDetails"));
        for (var i = 0; i < itemFormArray.length; i++) {
            let rcvItemQty = itemFormArray.controls[i].get("itemReceived_Qty").value;
            let ItemQty = itemFormArray.controls[i].get("itemQty").value;
            if (rcvItemQty === ItemQty) {
                this.equalQtyList.push(i);
            } else {
                this.equalQtyList.push("null");
            }
        }
    }

    getTrasactionDetails(id) {
        if (id > 0) {
            this.trasactionService.getTransactionDetails(id).subscribe(res => {
                if (res.status === "200") {
                    this.detailsData = res.data;
                    // if (this.detailsData[0].length > 0) {
                    this.transactionForm.controls["transactionID"].setValue(this.detailsData[0].transactionID);
                    this.transactionForm.controls["transactionDate"].setValue(this.convertToDateFormat(this.detailsData[0].transactionDate));
                    this.transactionForm.controls["transactionNo"].setValue(this.detailsData[0].transactionNo);
                    this.transactionForm.controls["poNo"].setValue(this.detailsData[0].poNo);
                    this.transactionForm.controls["transactionTypeId"].setValue(this.detailsData[0].transactionTypeId);
                    this.transactionForm.controls["transactionSeriesID"].setValue(this.detailsData[0].transactionSeriesID);
                    this.transactionForm.controls["ledgerID"].setValue(this.detailsData[0].ledgerID);
                    this.transactionForm.controls["transactionLinkID"].setValue(this.detailsData[0].transactionLinkID);
                    this.transactionForm.controls["transactionLinkRef"].setValue(this.detailsData[0].transactionLinkRef);
                    this.transactionForm.controls["companyID"].setValue(this.detailsData[0].companyID);
                    this.transactionForm.controls["locationID"].setValue(this.detailsData[0].locationID);
                    this.transactionForm.controls["transaction_Remarks"].setValue(this.detailsData[0].transaction_Remarks);
                    this.transactionForm.controls["transaction_Amount"].setValue(this.detailsData[0].transaction_Amount);
                    this.transactionForm.controls["transaction_PendingAmount"].setValue(this.detailsData[0].transaction_PendingAmount);
                    this.transactionForm.controls["currencyID"].setValue(this.detailsData[0].currencyID);
                    this.transactionForm.controls["ledaddid"].setValue(this.detailsData[0].ledaddid);
                    // this.transactionForm.controls['transactionDueDate'].setValue(this.detailsData[0].transactionDueDate);
                    this.totalAmount = this.detailsData[0].transaction_Amount;
                    // }

                    if (this.detailsData[0].transItemDetails.length > 0 && this.transItemDetails) {
                        const formArray = <FormArray>(this.transactionForm.get("transItemDetails"));
                        formArray.removeAt(0);
                        this.barCodeApplicableStatus = [];
                        for (let i = 0; i < this.detailsData[0].transItemDetails.length; i++) {
                            formArray.push(this.fb.group({
                                transactionID: [this.detailsData[0].transItemDetails[i].transactionID],
                                stockitemID: [this.detailsData[0].transItemDetails[i].stockitemID],
                                stockItemDesc: [this.detailsData[0].transItemDetails[i].stockItemDesc],
                                transactionItem_AdditionalDesciption: [this.detailsData[0].transItemDetails[i].transactionItem_AdditionalDesciption],
                                locationID: [1],
                                itemQty: [this.detailsData[0].transItemDetails[i].itemQty],
                                boxCode: [this.detailsData[0].transItemDetails[i].boxCode],
                                itemReceived_Qty: [this.detailsData[0].transItemDetails[i].itemReceived_Qty],
                                itemChallan_Qty: [this.detailsData[0].transItemDetails[i].itemChallan_Qty],
                                itemPending_Qty: [this.detailsData[0].transItemDetails[i].itemPending_Qty],
                                itemRate: [this.detailsData[0].transItemDetails[i].itemRate],
                                itemAmount: [this.detailsData[0].transItemDetails[i].itemAmount],
                                itemStops: [this.detailsData[0].transItemDetails[i].itemStops],
                                itemLength: [this.detailsData[0].transItemDetails[i].itemLength],
                                itemEndLendth: [this.detailsData[0].transItemDetails[i].itemEndLendth],
                                itemStartLength: [this.detailsData[0].transItemDetails[i].itemStartLength],
                                itemBatchApplicable: [this.detailsData[0].transItemDetails[i].itemBatchApplicable],
                                packingBoxStockItemID: [this.detailsData[0].transItemDetails[i].packingBoxStockItemID],
                                transactionItemSerialNo: [this.detailsData[0].transItemDetails[i].transactionItemSerialNo],
                                itemBarCodeApplicableStatus: [this.detailsData[0].transItemDetails[i].itemBarCodeApplicableStatus],
                                itemBarCodeLength: [this.detailsData[0].transItemDetails[i].itemBarCodeLength]
                            }));

                            this.barCodeApplicableStatus.push({status: this.detailsData[0].transItemDetails[i].itemBarCodeApplicableStatus});
                        }
                        this.checkQty();
                    }
                    if (this.detailsData[0].transPOTerms.length > 0 && this.transPOTerms) {
                        this.POData = this.detailsData[0].transPOTerms;
                        const controlArray = <FormArray>(this.transactionForm.get("transPOTerms"));
                        controlArray.controls[0].get("transactionDeilveryTerms").setValue(this.POData[0].transactionDeilveryTerms);
                        controlArray.controls[0].get("transactionTransporter").setValue(this.POData[0].transactionTransporter);
                        controlArray.controls[0].get("transctionSupplierRef").setValue(this.POData[0].transctionSupplierRef);
                        controlArray.controls[0].get("transactionPackingTerms").setValue(this.POData[0].transactionPackingTerms);
                        controlArray.controls[0].get("transactionPaymentTerms").setValue(this.POData[0].transactionPaymentTerms);
                        controlArray.controls[0].get("transactionFreightTerms").setValue(this.POData[0].transactionFreightTerms);
                        controlArray.controls[0].get("transactionDueDate").setValue(this.convertToDateFormat(this.POData[0].transactionDueDate));
                        // var dueDate = this.convertToDateFormat(this.POData[0].transactionDueDate);
                        // controlArray.controls[0].get('transactionDueDate').setValue(dueDate);
                    }
                    if (this.detailsData[0].transLedgerDetails.length > 0 && this.transLedgerDetails) {
                        const ledgerArray = <FormArray>(this.transactionForm.get("transLedgerDetails"));
                        ledgerArray.removeAt(0);
                        for (let i = 0; i < this.detailsData[0].transLedgerDetails.length; i++) {
                            ledgerArray.push(this.fb.group({
                                transactionID: [this.detailsData[0].transLedgerDetails[i].transactionID],
                                ledgerID: [this.detailsData[0].transLedgerDetails[i].ledgerID],
                                taxRate: [this.detailsData[0].transLedgerDetails[i].taxRate],
                                ledgerAmount: [this.detailsData[0].transLedgerDetails[i].ledgerAmount]
                            }));
                        }
                    }

                    if (this.detailsData[0].transBoxDetails.length > 0 && this.transBoxDetails) {
                        this.boxDetailData = this.detailsData[0].transBoxDetails;
                        const controlArray = <FormArray>(this.transactionForm.get("transBoxDetails"));

                        if (controlArray.length > 0) {
                            controlArray.removeAt(0);
                        }

                        for (let i = 0; i < this.boxDetailData.length; i++) {
                            controlArray.push(this.fb.group({
                                stockitemID: [this.boxDetailData[i].stockitemID],
                                stockItemDesc: [this.boxDetailData[i].stockitemDesc],
                                itemQty: [this.boxDetailData[i].itemQty],
                                itemRate: [this.boxDetailData[i].itemRate],
                                itemAmount: [this.boxDetailData[i].itemAmount],
                                transactionBoxSerialNo: [this.boxDetailData[i].transactionBoxSerialNo],
                                boxPosition: [this.boxDetailData[i].boxPosition],
                                SCHREF: [this.boxDetailData[i].schref]
                            }));
                        }
                    }

                    if (this.detailsData[0].transBatchDetails.length > 0 && this.transBatchDetails) {
                        this.batchDetailData = this.detailsData[0].transBatchDetails;
                        const controlArray = <FormArray>(this.transactionForm.get("transBatchDetails"));

                        if (controlArray.length > 0) {
                            controlArray.removeAt(0);
                        }

                        for (var i = 0; i < this.batchDetailData.length; i++) {
                            controlArray.push(this.fb.group({
                                batchNo: [this.batchDetailData[i].batchNo],
                                itemCode: [this.batchDetailData[i].itemCode],
                                stockitemID: [this.batchDetailData[i].stockitemID],
                                qty: [this.batchDetailData[i].qty],
                                transactionID: [this.batchDetailData[i].batchNo],
                                batchID: [this.batchDetailData[i].batchID]
                            }));
                        }
                    }

                    if (this.detailsData[0].transGRNTerms.length > 0 && this.transGRNTerms) {
                        this.GRNTermsData = this.detailsData[0].transGRNTerms;
                        const controlArray = <FormArray>(this.transactionForm.get("transGRNTerms"));
                        controlArray.controls[0].get("inwardNo").setValue(this.GRNTermsData[0].inwardNo);
                        controlArray.controls[0].get("transporter").setValue(this.GRNTermsData[0].transporter);
                        controlArray.controls[0].get("dcNo").setValue(this.GRNTermsData[0].dcNo);
                        controlArray.controls[0].get("dcDate").setValue(this.GRNTermsData[0].dcDate);
                        controlArray.controls[0].get("invoiceNo").setValue(this.GRNTermsData[0].invoiceNo);
                        controlArray.controls[0].get("invoiceDate").setValue(this.GRNTermsData[0].invoiceDate);
                        controlArray.controls[0].get("inwardDate").setValue(this.GRNTermsData[0].inwardDate);
                    }

                    if (this.detailsData[0].transInvoiceTerms.length > 0 && this.transInvoiceTerms) {
                        this.invoiceTermData = this.detailsData[0].transInvoiceTerms;
                        const controlArray = <FormArray>(this.transactionForm.get("transInvoiceTerms"));
                        controlArray.controls[0].get("transporterLedgerID").setValue(this.invoiceTermData[0].transporterLedgerID);
                        controlArray.controls[0].get("transporterLRNO").setValue(this.invoiceTermData[0].transporterLRNO);
                        controlArray.controls[0].get("transporterLRDate").setValue(this.invoiceTermData[0].transporterLRDate);
                        controlArray.controls[0].get("transporterGSTIN").setValue(this.invoiceTermData[0].transporterGSTIN);
                        controlArray.controls[0].get("GSTEwayBillNo").setValue(this.invoiceTermData[0].GSTEwayBillNo);
                        controlArray.controls[0].get("GSTEWayBillDate").setValue(this.invoiceTermData[0].GSTEWayBillDate);
                    }

                    if (this.detailsData[0].transWorkCompletionDetails.length > 0 && this.transWorkCompletionDetails) {
                        this.workCompletionData = this.detailsData[0].transWorkCompletionDetails;
                        const controlArray = <FormArray>(this.transactionForm.get("transWorkCompletionDetails"));
                        controlArray.controls[0].get("jobCompletionDate").setValue(this.workCompletionData[0].jobCompletionDate);
                        controlArray.controls[0].get("departmentName").setValue(this.workCompletionData[0].departmentName);
                        controlArray.controls[0].get("transctionJobWorkRemarks").setValue(this.workCompletionData[0].transctionJobWorkRemarks);
                        controlArray.controls[0].get("location").setValue(this.workCompletionData[0].location);
                        controlArray.controls[0].get("bllAmount").setValue(this.workCompletionData[0].billAmount);
                        controlArray.controls[0].get("materialAmount").setValue(this.workCompletionData[0].materialAmount);
                        controlArray.controls[0].get("labourAmount").setValue(this.workCompletionData[0].labourAmount);
                    }
                }
                this.showLoader = false;
            });
        }
        this.showLoader = false;
    }

    convertDateyymmdd(cDate) {
        // var dDate = new Date(cDate);
        // // dDate = new Date(cDate.replace( /(\d{2})[-/](\d{2})[-/](\d+)/, '$2/$1/$3'));
        // let year = dDate.getFullYear();
        // var month: any = dDate.getMonth() + 1;
        // if(month < 10) {
        // month = '0' + month;
        // }
        // var day: any = dDate.getDate();
        // if(day < 10) {
        // day = '0' + day;
        // }
        // let fDate = year + '-' + month + '-' + day;
        // return fDate;

        if (cDate != "") {
            var datedata = cDate.split("-");
            var formatedDateString = datedata[2] + "-" + datedata[1] + "-" + datedata[0];
            console.log(formatedDateString);
            return formatedDateString;
        }
    }

    saveTransation(formData) {
        if (this.transactionForm.valid) {
            this.showLoader = true;

            // const controlArray = <FormArray>this.transactionForm.get('transPOTerms');
            // if (this.isEmpty(controlArray)) {
            // let dateData = this.convertDateyymmdd(controlArray.controls[0].get('transactionDueDate').value);
            // formData.transPOTerms[0].transactionDueDate = dateData;
            // }

            formData.transactionDate = this.convertDateyymmdd(formData.transactionDate);
            this.trasactionService.AddTransaction(formData).subscribe(res => {
                if (res && res.status === "200") {
                    this.successMsg = res.message;
                    this.showSuccess = true;
                    let rollBackUrl = localStorage.getItem("rollBackUrl");
                    setTimeout(() => {
                        this.router.navigate(["/" + rollBackUrl]);
                    }, 3000);
                } else {
                    this.errorMsg = res.message;
                    this.showError = true;
                    this.showLoader = false;
                }
            });
        }
    }

    getCurrency() {
        this.poService.getCurrency().subscribe(res => {
            if (res && res.status === "200") { // this.currencyList = res.data;

                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.currencyList.push({label: data[key].currencyName, value: data[key].currencyID});
                    }
                }
            }
        });
    }

    getSupplier() {
        this.supplierService.getAllSuppliers().subscribe(res => {
            if (res && res.status === "200") { // this.currencyList = res.data;

                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.supplierList.push({label: data[key].supplierName, value: data[key].supplier_ID});
                    }
                }
            }
        });
    }

    getItemList() {
        this.trasactionService.getItemList().subscribe(res => {
            let data = res.data;
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    this.itemMasterList.push({label: data[key].stockItemDesc, value: data[key].stockItemID});
                }
            }
        });
    }

    filterItems(event) {
        this.filteredItems = [];
        for (let i = 0; i < this.itemMasterList.length; i++) {
            let itemName = this.itemMasterList[i].label;
            if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredItems.push(itemName);
            }
        }
    }

    getSelectedVal(event, elem, index) {
        const itemListArray = <FormArray> this.transactionForm.get(elem);
        var itemId = 0;
        for (let i = 0; i < this.itemMasterList.length; i++) {
            if (this.itemMasterList[i].label === event) {
                itemListArray.controls[index].get("stockitemID").setValue(this.itemMasterList[i].value);
                itemId = this.itemMasterList[i].value;
            }
        }
        this.getItemRate(itemId, index);
    }

    getLocation() {
        this.stockService.getLocation().subscribe(res => {
            if (res && res.status === "200") { // this.locationList = res.data;

                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.locationList.push({label: data[key].locationName, value: data[key].locationID});
                    }
                }
            }
        });
    }

    getGstRate() {
        this.trasactionService.getTaxType().subscribe(res => {
            if (res && res.status === "200") { // this.ledgerList = res.data;

                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.gstTaxList.push({label: data[key].ledgerName, value: data[key].ledger_ID, rateofTax: data[key].rateofTax});
                    }
                }
            }
        });
    }

    getLedgers() {
        this.ledgerService.getAllLedgers().subscribe(res => {
            if (res && res.status === "200") {
                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.ledgerList.push({label: data[key].ledgerName, value: data[key].ledger_ID});
                    }
                }
            }
        });
    }

    getCustomers() {
        this.customerService.getAllCustomers().subscribe(res => {
            if (res && res.status === "200") {
                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.customerList.push({label: data[key].customerName, value: data[key].customer_ID});
                    }
                }
            }
        });
    }

    getPOPendingList() {
        this.trasactionService.getPendingPOList().subscribe(res => {
            if (res && res.status === "200") {
                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.POpendingList.push({label: data[key].transactionNo, value: data[key].transactionID});
                    }
                }
            }
        });
    }

    getTaxRate(data, i) {
        const ledgerfrmArray = <FormArray>(this.transactionForm.get("transLedgerDetails"));
        ledgerfrmArray.controls[i].get("taxRate").setValue(data.selectedOption.rateofTax);
        this.getAmount();
    }

    // GET TOTAL AMOUNT //
    getAmount() {
        const itemfrmArray = <FormArray>(this.transactionForm.get("transItemDetails"));
        var itemTotalAmount = 0;
        for (let i = 0; i < itemfrmArray.length; i++) {
            const itemRate = itemfrmArray.controls[i].get("itemRate").value;
            const itemQnt = itemfrmArray.controls[i].get("itemQty").value;
            const itemAmount = itemRate * itemQnt;
            itemfrmArray.controls[i].get("itemAmount").setValue(itemAmount);
            itemTotalAmount = itemTotalAmount + itemAmount;
        }

        const ledgerfrmArray = <FormArray>(this.transactionForm.get("transLedgerDetails"));
        var ledgerAmnt = 0;
        var grantLedgerAmnt = 0;
        for (let i = 0; i < ledgerfrmArray.length; i++) {
            const taxRate = ledgerfrmArray.controls[i].get("taxRate").value;
            const onePercnt = itemTotalAmount / 100;
            ledgerAmnt = taxRate * onePercnt;
            ledgerfrmArray.controls[i].get("ledgerAmount").setValue(ledgerAmnt);
            grantLedgerAmnt = grantLedgerAmnt + ledgerAmnt;
        }
        this.totalAmount = itemTotalAmount + grantLedgerAmnt;
        this.transactionForm.controls["transaction_Amount"].setValue(this.totalAmount);
    }

    getSelectLinkRef(event) {
        if (event.value !== undefined) {
            this.trasactionService.getTransactionDetails(event.value).subscribe(res => {
                if (res.status === "200") {
                    this.detailsData = res.data;
                    this.totalAmount = this.detailsData[0].transaction_Amount;
                    this.transactionForm.controls["transaction_Amount"].setValue(this.detailsData[0].transaction_Amount);
                    this.transactionForm.controls["ledgerID"].setValue(this.detailsData[0].ledgerID);
                    if (this.detailsData[0].transItemDetails.length > 0 && this.transItemDetails) {
                        this.ItemData = this.detailsData[0].transItemDetails;
                        const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));

                        if (controlArray.length > 0) {
                            while (controlArray.length !== 0) {
                                controlArray.removeAt(0);
                            }
                        }
                        this.barCodeApplicableStatus = [];
                        for (var i = 0; i < this.ItemData.length; i++) {
                            controlArray.push(this.fb.group({
                                transactionID: [this.ItemData[i].transactionID],
                                stockitemID: [this.ItemData[i].stockitemID],
                                stockItemDesc: [this.ItemData[i].stockItemDesc],
                                transactionItem_AdditionalDesciption: [this.ItemData[i].transactionItem_AdditionalDesciption],
                                itemQty: [0],
                                itemReceived_Qty: [this.ItemData[i].itemReceived_Qty],
                                itemChallan_Qty: [0],
                                itemPending_Qty: [this.ItemData[i].itemPending_Qty],
                                itemRate: [this.ItemData[i].itemRate],
                                itemAmount: [this.ItemData[i].itemAmount],
                                itemStops: [this.ItemData[i].itemStops],
                                itemLength: [this.ItemData[i].itemLength],
                                itemEndLendth: [this.ItemData[i].itemEndLendth],
                                itemStartLength: [this.ItemData[i].itemStartLength],
                                itemBatchApplicable: [this.ItemData[i].itemBatchApplicable],
                                packingBoxStockItemID: [this.ItemData[i].packingBoxStockItemID],
                                transactionItemSerialNo: [this.ItemData[i].transactionItemSerialNo],
                                locationID: [this.ItemData[i].locationID],
                                boxCode: [this.ItemData[i].boxCode],
                                itemBarCodeApplicableStatus: [this.ItemData[i].itemBarCodeApplicableStatus],
                                itemBarCodeLength: [this.ItemData[i].itemBarCodeLength]
                            }));
                            this.barCodeApplicableStatus.push({status: this.ItemData[i].itemBarCodeApplicableStatus});
                        }
                        this.checkQty();
                    }
                    if (this.detailsData[0].transLedgerDetails.length > 0 && this.transLedgerDetails) {
                        this.ledgerData = this.detailsData[0].transLedgerDetails;
                        const controlArray = <FormArray>(this.transactionForm.get("transLedgerDetails"));
                        if (controlArray.length > 0) {
                            while (controlArray.length !== 0) {
                                controlArray.removeAt(0);
                            }
                        }
                        for (var i = 0; i < this.ledgerData.length; i++) {
                            controlArray.push(this.fb.group({
                                transactionID: [this.ledgerData[i].transactionID],
                                ledgerID: [this.ledgerData[i].ledgerID],
                                taxRate: [this.ledgerData[i].taxRate],
                                ledgerAmount: [this.ledgerData[i].ledgerAmount]
                            }));
                        }
                    }
                }
            });
        }
    }

    getSelectLinkRefPL(event) {
        if (event.value !== undefined) {
            this.trasactionService.getTransactionDetails(event.value).subscribe(res => {
                if (res.status === "200") {
                    this.detailsData = res.data;
                    this.totalAmount = this.detailsData[0].transaction_Amount;
                    this.transactionForm.controls["transaction_Amount"].setValue(this.detailsData[0].transaction_Amount);
                    this.transactionForm.controls["ledgerID"].setValue(this.detailsData[0].ledgerID);
                    if (this.detailsData[0].transItemDetails.length > 0 && this.transItemDetails) {
                        this.ItemData = this.detailsData[0].transItemDetails;
                        const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));

                        if (controlArray.length > 0) {
                            while (controlArray.length !== 0) {
                                controlArray.removeAt(0);
                            }
                        }
                        this.barCodeApplicableStatus = [];
                        for (var i = 0; i < this.ItemData.length; i++) {
                            controlArray.push(this.fb.group({
                                transactionID: [this.ItemData[i].transactionID],
                                stockitemID: [this.ItemData[i].stockitemID],
                                stockItemDesc: [this.ItemData[i].stockItemDesc],
                                transactionItem_AdditionalDesciption: [this.ItemData[i].transactionItem_AdditionalDesciption],
                                itemQty: [this.ItemData[i].itemPending_Qty],
                                itemReceived_Qty: [0],
                                itemChallan_Qty: [this.ItemData[i].itemChallan_Qty],
                                itemPending_Qty: [this.ItemData[i].itemPending_Qty],
                                itemRate: [this.ItemData[i].itemRate],
                                itemAmount: [this.ItemData[i].itemAmount],
                                itemStops: [this.ItemData[i].itemStops],
                                itemLength: [this.ItemData[i].itemLength],
                                itemEndLendth: [this.ItemData[i].itemEndLendth],
                                itemStartLength: [this.ItemData[i].itemStartLength],
                                itemBatchApplicable: [this.ItemData[i].itemBatchApplicable],
                                packingBoxStockItemID: [this.ItemData[i].packingBoxStockItemID],
                                transactionItemSerialNo: [this.ItemData[i].transactionItemSerialNo],
                                locationID: [this.ItemData[i].locationID],
                                boxCode: [this.ItemData[i].boxCode],
                                itemBarCodeApplicableStatus: [this.ItemData[i].itemBarCodeApplicableStatus],
                                itemBarCodeLength: [this.ItemData[i].itemBarCodeLength]
                            }));
                            this.barCodeApplicableStatus.push({status: this.ItemData[i].itemBarCodeApplicableStatus});
                        }
                        this.checkQty();
                    }
                    if (this.detailsData[0].transLedgerDetails.length > 0 && this.transLedgerDetails) {
                        this.ledgerData = this.detailsData[0].transLedgerDetails;
                        const controlArray = <FormArray>(this.transactionForm.get("transLedgerDetails"));
                        if (controlArray.length > 0) {
                            while (controlArray.length !== 0) {
                                controlArray.removeAt(0);
                            }
                        }
                        for (var i = 0; i < this.ledgerData.length; i++) {
                            controlArray.push(this.fb.group({
                                transactionID: [this.ledgerData[i].transactionID],
                                ledgerID: [this.ledgerData[i].ledgerID],
                                taxRate: [this.ledgerData[i].taxRate],
                                ledgerAmount: [this.ledgerData[i].ledgerAmount]
                            }));
                        }
                    }
                }
            });
        }
    }

    clearErrorBox() {
        this.plValidationMsg = "";
        this.BarcodeSuccessMsg = "";
    }

    // BARCODE FUNCTION FOR PACKING LIST
    getBarcode(data) {
        this.disabledScanBtn = true;
        var inputData = this.barCode1.nativeElement.value;
        this.plValidationMsg = "";
        if (inputData !== "") {
            var barcode = inputData.split("-");
            var inputItemCode = 0;
            var batchCode = "";
            if ((barcode !== 0 && barcode !== undefined) || barcode !== "") {
                if (barcode[0] !== undefined) {
                    if (barcode[0].trim() !== null) {
                        inputItemCode = barcode[0].trim();
                    }
                }

                if (barcode[1] !== undefined) {
                    if (barcode[1].trim() !== null) {
                        batchCode = barcode[1].trim();
                    }
                }
            } else { // this.plValidationMsg = "Please enter correct data.";
                alert("Please enter correct data.");
            }
            if (batchCode.length === 7) {
                const formArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
                for (var i = 0; i < formArray.length; i++) {
                    if (batchCode) {
                        let listBarCode = formArray.controls[i].get("batchNo").value;
                        let listItemcode = formArray.controls[i].get("itemCode").value;

                        if (inputItemCode === listItemcode) {
                            if (listBarCode === batchCode) { // this.plValidationMsg = "Batch already scanned (Duplicate Batch)";
                                alert("Batch already scanned (Duplicate Batch)");
                                this.barCode1.nativeElement.value = "";

                                return false;
                            }
                        }
                    }
                }

                var stockItem = 0;
                var splitedStockItem = 0;
                var itemCode;
                const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));
                for (var i = 0; i < controlArray.length; i++) {
                    itemCode = controlArray.controls[i].get("stockItemDesc").value;
                    if (itemCode !== undefined || itemCode != null || itemCode !== "") {
                        splitedStockItem = itemCode.split("|");
                        stockItem = splitedStockItem[0].trim();
                    }

                    if (inputItemCode === stockItem) {
                        this.grnItemIndex = i;
                        let currentLength = controlArray.controls[i].get("itemLength").value;
                        let currentStops = controlArray.controls[i].get("itemStops").value;
                        if (currentLength > 0) { // this.showLengthBarcodeDialog();
                            this.calculateLength();
                            if (this.lengthCalcStatus !== true) {
                                this.enableNumberTxt = true;
                                // this.plValidationMsg = "Please fill Correct Length and Stops";
                                alert("Please fill Correct Length and Stops.");
                                return false;
                            }
                        }
                        let scanQty = controlArray.controls[i].get("itemReceived_Qty").value;
                        let qty = controlArray.controls[i].get("itemQty").value;
                        if (scanQty >= qty) { // this.plValidationMsg = "Scanned quantity can not be greater quantity.";
                            alert("Scanned quantity can not be greater quantity.");
                            this.barCode1.nativeElement.value = "";

                            return false;
                        } else {
                            this.validateBatch4PL(barcode[0].trim(), barcode[1].trim(), i, scanQty, 0);
                            this.checkQty();
                            break;
                        }
                    }
                }

                if (itemCode !== undefined || itemCode != null || itemCode !== "") {
                    if (inputItemCode !== stockItem) { // this.plValidationMsg = "This Item is not available in Item List, Please try again.";
                        alert("This Item is not available in Item List, Please try again.");
                        this.barCode1.nativeElement.value = "";
                    }
                } else { // this.plValidationMsg = "This Item is not available in Item List, Please try again.";
                    alert("This Item is not available in Item List, Please try again.");
                    this.barCode1.nativeElement.value = "";
                }
            } else {
                console.log("Barcode no valid");
                return false;
            }
        } else {
            alert("Please enter correct Barcode.");
            // this.plValidationMsg = "Please enter correct Barcode.";
        }

        this.enableNumberTxt = false;
    }

    showLengthBarcodeDialog() {
        this.displayLengthDialog = true;
        this.enableNumberTxt = false;
        this.startLength.nativeElement.value = "";
        this.endtLength.nativeElement.value = "";
        this.itemStops.nativeElement.value = "";
        this.plValidationMsg = "";
        this.lengthCalcStatus = false;
    }

    calculateLength() {
        this.lengthCalcStatus = false;
        const itemStartLength = this.startLength.nativeElement.value;
        const itemEndLength = this.endtLength.nativeElement.value;
        const itemStops = this.itemStops.nativeElement.value;
        const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));
        const currentItemLength = controlArray.controls[this.grnItemIndex].get("itemLength").value;
        const currentItemStops = controlArray.controls[this.grnItemIndex].get("itemStops").value;
        let finalLength = itemEndLength - itemStartLength;

        if (itemStartLength == null || itemStartLength == "") {
            this.plValidationMsg = "Length Start is required.";
            this.lengthCalcStatus = false;
            return false;
        } else if (itemEndLength == null || itemEndLength == "") {
            this.plValidationMsg = "Length End is required.";
            this.lengthCalcStatus = false;
            return false;
        } else if (itemStops == null || itemStops == "") {
            this.plValidationMsg = "Item Stop is required.";
            this.lengthCalcStatus = false;
            return false;
        } else if (finalLength != currentItemLength) { // this.plValidationMsg = "Length is not matching with Item's Length, Please try again.";
            alert("Length is not matching with Item's Length, Please try again.");
            this.lengthCalcStatus = false;
            return false;
        } else if (itemStops != currentItemStops) { // this.plValidationMsg = "Stop is not matching with Item's Stops, Please try again";
            alert("Stop is not matching with Item's Stops, Please try again.");
            this.lengthCalcStatus = false;
            return false;
        } else {
            controlArray.controls[this.grnItemIndex].get("itemStartLength").setValue(JSON.parse(itemStartLength));
            controlArray.controls[this.grnItemIndex].get("itemEndLendth").setValue(JSON.parse(itemEndLength));
            this.plValidationMsg = "";
            this.lengthCalcStatus = true;
        }

        // this.displayLengthDialog = false;
    }

    // BARCODE FUNCTION FOR FG INWARD
    getBarcodeFg(data) {
        this.disabledScanBtn = true;
        var inputData = this.barCode1.nativeElement.value;
        if (inputData !== "") {
            var barcode = inputData.split("-");
            var inputItemCode = "";
            var batchCode = "";
            if ((barcode !== 0 && barcode !== undefined) || barcode !== "") {
                if (barcode[0] !== undefined) {
                    if (barcode[0].trim() !== null) {
                        inputItemCode = barcode[0].trim();
                    }
                }
                if (barcode[1] !== undefined) {
                    if (barcode[1].trim() !== null) {
                        batchCode = barcode[1].trim();
                    }
                }
            } else { // this.plValidationMsg = "Please enter correct data.";
                alert("Please enter correct data.");
            }
            if (batchCode.length === 7) {
                const formArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
                for (var i = 0; i < formArray.length; i++) {
                    if (batchCode) {
                        let listBarCode = formArray.controls[i].get("batchNo").value;
                        let listItemcode = formArray.controls[i].get("itemCode").value;

                        if (inputItemCode == listItemcode) {
                            if (listBarCode == batchCode) { // this.plValidationMsg = "Batch already scanned (Duplicate Batch)";
                                alert("Batch already scanned (Duplicate Batch)");
                                this.barCode1.nativeElement.value = "";

                                return false;
                            }
                        }
                    }
                }
                this.validateBatch4Fg(inputItemCode, batchCode, 1);
            } else {
                console.log("Barcode no valid");
                return false;
            }
        } else { // this.plValidationMsg = "Please enter correct Barcode.";
            alert("Please enter correct Barcode.");
        }
    }

    // FUNCTION TO VALIDATE BARCODE
    validateBatch(itemcode, batchcode, index, scanQty, qty) {
        const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));
        this.trasactionService.validateBatch(itemcode, batchcode, 2).subscribe(res => {
            if (res.status === "200") {
                let data = res.data;

                const formArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
                formArray.push(this.fb.group({
                    batchNo: [data[0].batchno],
                    stockitemID: [data[0].stockItemID],
                    batchID: [data[0].batchid],
                    itemCode: [data[0].itemCode],
                    qty: [1],
                    transactionID: [data[0].transactionID || 0]
                }));
                if (formArray.controls[0].get("batchNo").value === 0) {
                    formArray.removeAt(0);
                }
                let existingQty = controlArray.controls[index].get("itemQty").value;
                controlArray.controls[index].get("itemReceived_Qty").setValue(scanQty + 1);
                controlArray.controls[index].get("itemQty").setValue(JSON.parse(qty) + existingQty);
                // controlArray.controls[index].get('itemBarCodeApplicableStatus').setValue('true');
                this.barCode1.nativeElement.value = "";
                alert(res.message);
            } else {
                alert(res.message);
                this.barCode1.nativeElement.value = "";
            }
        });
    }

    validateBatch4PL(itemcode, batchcode, index, scanQty, qty) {
        this.BarcodeSuccessMsg = "";
        const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));
        this.trasactionService.validateBatch(itemcode, batchcode, 2).subscribe(res => {
            if (res.status === "200") {
                let data = res.data;

                const formArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
                formArray.push(this.fb.group({
                    batchNo: [data[0].batchno],
                    stockitemID: [data[0].stockItemID],
                    batchID: [data[0].batchid],
                    itemCode: [data[0].itemCode],
                    qty: [1],
                    transactionID: [data[0].transactionID || 0]
                }));
                if (formArray.controls[0].get("batchNo").value === 0) {
                    formArray.removeAt(0);
                }
                let existingQty = controlArray.controls[index].get("itemQty").value;
                controlArray.controls[index].get("itemReceived_Qty").setValue(scanQty + 1);
                controlArray.controls[index].get("itemQty").setValue(JSON.parse(qty) + existingQty);
                // controlArray.controls[index].get('itemBarCodeApplicableStatus').setValue('true');
                this.barCode1.nativeElement.value = "";
                this.BarcodeSuccessMsg = "Batch Scanned " + res.message + "fully.";
                this.barCode1.nativeElement.value = "";
                this.startLength.nativeElement.value = "";
                this.endtLength.nativeElement.value = "";
                this.itemStops.nativeElement.value = "";
            } else {
                alert(res.message);
                this.plValidationMsg = res.message;
                this.barCode1.nativeElement.value = "";
            }
        });
    }

    // FUNCTION TO VALIDATE BARCODE AND ITEMS IN ITEMS LIST

    validateBatch4Fg(itemcode, batchcode, type) {
        this.trasactionService.validateBatch(itemcode, batchcode, type).subscribe(res => {
            if (res.status === "200") {
                let data = res.data;

                const formArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
                formArray.push(this.fb.group({
                    batchNo: [data[0].batchno],
                    stockitemID: [data[0].stockItemID],
                    batchID: [data[0].batchid],
                    itemCode: [data[0].itemCode],
                    qty: [1],
                    transactionID: [data[0].transactionID || 0]
                }));
                if (formArray.controls[0].get("batchNo").value === 0) {
                    formArray.removeAt(0);
                }

                const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));
                var listItemStockId = "";
                var listItemcode = "";
                for (var i = 0; i < controlArray.length; i++) {
                    listItemcode = controlArray.controls[i].get("stockItemDesc").value;

                    if (listItemcode === itemcode) {
                        let qty = controlArray.controls[i].get("itemQty").value;
                        controlArray.controls[i].get("itemQty").setValue(qty + 1);
                        // listItemStockId = controlArray.controls[i].get('stockitemID').value;
                        this.barCode1.nativeElement.value = "";
                        return false;
                    }
                }

                for (var i = 0; this.itemMasterList.length; i++) {
                    let itemdesc = this.itemMasterList[i].label.split("|");
                    if (itemcode == itemdesc[0]) {
                        listItemStockId = this.itemMasterList[i].value;
                        break;
                    }
                }

                if (controlArray.controls[0].get("stockItemDesc").value === "") {
                    controlArray.removeAt(0);
                }
                controlArray.push(this.fb.group({
                    transactionID: [0],
                    stockitemID: [listItemStockId],
                    stockItemDesc: [itemcode],
                    transactionItem_AdditionalDesciption: [""],
                    locationID: [1],
                    itemQty: [1],
                    boxCode: [0],
                    itemReceived_Qty: [0],
                    itemChallan_Qty: [0],
                    itemPending_Qty: [0],
                    itemRate: [0],
                    itemAmount: [0],
                    itemStops: [0],
                    itemLength: [0],
                    itemBatchApplicable: [0],
                    packingBoxStockItemID: [0],
                    transactionItemSerialNo: [0],
                    itemBarCodeApplicableStatus: ["false"],
                    itemBarCodeLength: [0]
                }));

                this.barCode1.nativeElement.value = "";

                this.BarcodeSuccessMsg = "Batch Scanned " + res.message + "fully.";
                return false;
            } else {
                this.plValidationMsg = res.message;
                this.barCode1.nativeElement.value = "";
            }
        });
    }

    showGrnBarcodeDialog(index) {
        this.grnValidationMsg = "";
        this.BarcodeSuccessMsg = "";
        var stockItemId = 0;
        const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));
        stockItemId = controlArray.controls[index].get("stockitemID").value;
        this.grnBarcodeTitle = controlArray.controls[index].get("stockItemDesc").value;
        this.ItemBarCodeLength = controlArray.controls[index].get("itemBarCodeLength").value;
        this.itemBarCode.nativeElement.value = "";
        this.itemQtyGnr.nativeElement.value = "";

        this.itemQtyGnr.nativeElement.value = 1;
        this.grnItemIndex = index;
        if (this.grnBarcodeTitle === "") {
            alert("Please select Item before start scan.");
        }

        this.trasactionService.getItemRate(stockItemId, 0).subscribe(res => {
            if (res.status === "200") {
                if (res.data !== undefined) {
                    if (res.data[0].barcodeapplicable === true) {
                        this.displayGrnBarcodeDialog = true;
                    } else {
                        alert("This Stock Item is not applicable for Barcode Scan.");
                        this.displayGrnBarcodeDialog = false;
                        return false;
                    }
                }
            }
        });
    }

    callGRNBarcode() {
        this.grnValidationMsg = "";
        this.BarcodeSuccessMsg = "";
        const itemBarCodeVal = this.itemBarCode.nativeElement.value;
        if (itemBarCodeVal.length === this.ItemBarCodeLength) {
            this.addGrnBarcode();
        }
    }

    addGrnBarcode() {
        const itemBarCodeVal = this.itemBarCode.nativeElement.value;
        const itemQtyGnrVal = this.itemQtyGnr.nativeElement.value;
        var trtType = 0;
        const grnBatch = localStorage.getItem("transGRNTerms");
        if (grnBatch === "true") {
            trtType = 3;
        } else {
            trtType = 2;
        }
        var itemCode = this.grnBarcodeTitle.split("|");
        var sptItemCode = itemCode[0].trim();

        if (itemBarCodeVal !== null || itemBarCodeVal !== "") {
            this.trasactionService.validateBatch(sptItemCode, itemBarCodeVal, trtType).subscribe(res => {
                if (res.status === "200") {
                    this.GRNvalidateStatus = true;
                    this.grnFunctionAfterValidate(res.data);
                } else {
                    this.GRNvalidateStatus = false;
                    this.grnFunctionAfterValidate(res.data);
                }
            });
        }
    }

    grnFunctionAfterValidate(data) {
        const itemBarCodeVal = this.itemBarCode.nativeElement.value;
        const itemQtyGnrVal = this.itemQtyGnr.nativeElement.value;
        var itemCode = this.grnBarcodeTitle.split("|");
        var sptItemCode = itemCode[0].trim();

        if (itemBarCodeVal == null || itemBarCodeVal === "") {
            this.grnValidationMsg = "Barcode is required.";
            return false;
        } else if (itemQtyGnrVal == null || itemQtyGnrVal === "") {
            this.grnValidationMsg = "Quantity is required.";
            this.barCode1.nativeElement.value = "";
            return false;
        } else if (itemQtyGnrVal < 1) {
            this.grnValidationMsg = "Quantity should be greater than 0.";
            this.barCode1.nativeElement.value = "";
            return false;
        } else if (itemBarCodeVal.length < this.ItemBarCodeLength) {
            this.grnValidationMsg = "Barcode length should not be less than " + this.ItemBarCodeLength;
            return false;
        } else if (this.GRNvalidateStatus === false) {
            this.grnValidationMsg = "Batch already exist (Duplicate Batch)";
            return false;
        } else {
            this.grnValidationMsg = "";
        }

        if (itemBarCodeVal !== "") {
            const formArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
            for (var i = 0; i < formArray.length; i++) {
                if (itemBarCodeVal) {
                    const listBarCode = formArray.controls[i].get("batchNo").value;
                    const listItemcode = formArray.controls[i].get("itemCode").value;
                    if (sptItemCode === listItemcode) {
                        if (listBarCode === itemBarCodeVal) {
                            this.grnValidationMsg = "Batch already exist (Duplicate Batch)";
                            return false;
                        }
                    }
                }
            }
            const controlArray = <FormArray>(this.transactionForm.get("transItemDetails"));
            const batchArray = <FormArray>(this.transactionForm.get("transBatchDetails"));
            let transactionId = localStorage.getItem("transactionID");
            let stockItemId = controlArray.controls[this.grnItemIndex].get("stockitemID").value;

            batchArray.push(this.fb.group({
                batchNo: [itemBarCodeVal],
                stockitemID: [stockItemId],
                batchID: [data[0].batchid],
                itemCode: [sptItemCode],
                qty: [itemQtyGnrVal],
                transactionID: [JSON.parse(transactionId)]
            }));
            if (batchArray.controls[0].get("batchNo").value === 0) {
                batchArray.removeAt(0);
            }
            const existingQty = controlArray.controls[this.grnItemIndex].get("itemQty").value;
            const existingQtyRec = controlArray.controls[this.grnItemIndex].get("itemReceived_Qty").value;
            controlArray.controls[this.grnItemIndex].get("itemQty").setValue(JSON.parse(itemQtyGnrVal) + existingQty);
            controlArray.controls[this.grnItemIndex].get("itemReceived_Qty").setValue(JSON.parse(itemQtyGnrVal) + existingQtyRec);
            // this.displayGrnBarcodeDialog = false;
            this.itemBarCode.nativeElement.value = "";
            this.BarcodeSuccessMsg = "Barcode added Successfully.";
        }
    }

    getTransactionTypeSeries() {
        this.trasactionService.getTransactionTypeSeries().subscribe(res => {
            if (res && res.status === "200") {
                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.transactionTypeSeriesList.push({label: data[key].seriesName, value: data[key].transactionSeriesID});
                    }
                }
            }
        });
    }

    getSupplierDetails(event) {
        let supplierId = event.value;
        this.supplierService.getSupplierData(supplierId).subscribe(res => {
            if (res && res.status === "200") {
                let data = res.data;
                this.setTaxTerms(data);
            }
        });
    }

    getCustomerDetails(event) {
        let customerId = event.value;
        this.customerService.getCustomerData(customerId).subscribe(res => {
            if (res && res.status === "200") {
                let data = res.data;
                this.setTaxTerms(data);
            }
        });

        this.getLedgerLocation(customerId);
    }

    setTaxTerms(inputData) {
        var data = [];
        data = inputData;

        if (data[0].supplierTaxes || data[0].customerTaxes) {
            let ItemData = data[0].supplierTaxes || data[0].customerTaxes;
            let controlArray = <FormArray>(this.transactionForm.get("transLedgerDetails"));

            if (controlArray.length > 0) {
                while (controlArray.length !== 0) {
                    controlArray.removeAt(0);
                }
            }

            for (var i = 0; i < ItemData.length; i++) {
                controlArray.push(this.fb.group({
                    transactionID: [0],
                    ledgerID: [ItemData[i].taxLedgerID],
                    taxRate: [ItemData[i].taxRate],
                    ledgerAmount: [0]
                }));
            }
        }

        if (data[0].supplierTerms || data[0].customerTerms) {
            let ItemData = data[0].supplierTerms || data[0].customerTerms;
            let controlArray = <FormArray> this.transactionForm.get("transPOTerms");

            if (controlArray.length > 0) {
                while (controlArray.length !== 0) {
                    controlArray.removeAt(0);
                }
            }

            for (var i = 0; i < ItemData.length; i++) {
                controlArray.push(this.fb.group({
                    transactionDueDate: [0],
                    transactionTransporter: [ItemData[i].transporters],
                    transctionSupplierRef: [""],
                    transactionDeilveryTerms: [ItemData[i].deliveryTerms],
                    transactionPaymentTerms: [ItemData[i].paymentTerms],
                    transactionPackingTerms: [""],
                    transactionFreightTerms: [""]
                }));
            }
        }
    }

    getItemRate(itemId, index) {
        const ledgerId = this.transactionForm.controls["ledgerID"].value || 0;
        const formArray = <FormArray> this.transactionForm.get("transItemDetails");
        this.trasactionService.getItemRate(itemId, ledgerId).subscribe(res => {
            if (res && res.status === "200") {
                formArray.controls[index].get("itemRate").setValue(res.data[0].itemRate);
                formArray.controls[index].get("itemBarCodeApplicableStatus").setValue(res.data[0].barcodeapplicable);
                formArray.controls[index].get("itemBarCodeLength").setValue(res.data[0].barcodelength);
                this.barCodeApplicableStatus.push({status: res.data[0].barcodeapplicable});
            }
        });
    }

    getLedgerLocation(ledgerId) {
        this.ledgerLocationList = [];
        this.trasactionService.getLedgerLocation(ledgerId).subscribe(res => {
            if (res && res.status === "200") {
                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.ledgerLocationList.push({label: data[key].ledgerLocationName, value: data[key].locationID});
                    }
                }
            }
        });
    }

    ngOnDestroy() {
        localStorage.setItem("barcodeFields", "false");
        localStorage.setItem("showTransactionSeries", "false");
        localStorage.setItem("showPO", "false");
        localStorage.setItem("showBarcode", "false");
        localStorage.setItem("transationLinkRefInput", "false");
        localStorage.setItem("transationLinkRef", "false");
        localStorage.setItem("transationLinkRefNamePO", "false");
        localStorage.setItem("GrnInput", "false");
        localStorage.setItem("showBoxCode", "false");
        localStorage.setItem("showActionBtn", "false");
        localStorage.setItem("showBarcode4Pl", "false");
        localStorage.setItem("showBarcode4Fg", "false");
        localStorage.setItem("showScannedQty", "false");
        localStorage.setItem("showBarcode4Grn", "false");
        localStorage.setItem("showLength4So", "false");
    }
}
