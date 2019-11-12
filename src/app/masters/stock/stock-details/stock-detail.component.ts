import {Component, OnInit, OnDestroy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators, FormArray} from "@angular/forms";
import {StockService} from "../services/stock.service";
import {StockDetailResponse} from "../models/stock-detail.model";
import {LedgerResponse} from "../../ledger/models/ledger.model";
import {LedgerService} from "../../ledger/services/ledger.service";
import {UnitService} from "../../unit/services/unit.service";
import {UnitResponse} from "../../unit/models/unit.model";
import {StockResponse} from "../models/stock.model";
import {StockGroupService} from "../../stock-group/services/stock-group.service";
import {SupplierService} from "../../supplier/services/supplier.service";
import {TouchSequence} from "selenium-webdriver";
import {SelectItem} from "primeng/api";
import { CommonService } from '../../../shared/services/common.services';

@Component({selector: "app-stock-detail", templateUrl: "./stock-detail.component.html", styleUrls: ["./stock-detail.component.scss"]})
export class StockDetailComponent implements OnInit,
OnDestroy {
    public stockItemId;
    public stockItemSubscription : Subscription;
    public stockGroupDataSubscription : Subscription;

    public ledgerDataSubscription : Subscription;
    public unitDataSubscription : Subscription;
    public stock;
    public sForm;
    public ledgerData = [];
    public unitData;
    public stockData;
    public barCodeApplicable : any;
    public stockGroupList = [];
    public unitDataList = [];
    public locationList = [];
    public currencyList = [];
    public supplierlist = [];
    public showLoader = false;
    filteredItems = [];

    errorMsg = "";
    successMsg = "";

    showError = false;
    showSuccess = false;
    companyId = localStorage.getItem("companyID");
    userId = localStorage.getItem("userID");
    ledgerModel = {};
    locationModel = {};
    // public stockItemGroup: SelectItem[];
    public stockItemGroup = [];
    public selectedBarcodeApplicable;
    public selectedlengthAPPLICABLE;
    public selectedstopsAPPLICABLE;
    public selectedshowInRMReport;
    public selectedActiveStatus;
    public selectedUnit;
    public selectedLocation;
    public selectedStockGroup;
    public statusList = [
        {
            label: "True",
            value: "True"
        }, {
            label: "False",
            value: "False"
        }
    ];
    constructor(private stockService : StockService, private ledgerService : LedgerService, private unitService : UnitService, private _route : ActivatedRoute, private _formBuilder : FormBuilder, private router : Router, private stockGroupService : StockGroupService, private supplierService : SupplierService, private commonService: CommonService) {
        this.stockForm();
        this.barCodeApplicable = [
            {
                label: "True",
                value: "True"
            }, {
                label: "False",
                value: "False"
            }
        ];
    }
    
    ngOnInit() {
        this.selectedBarcodeApplicable = this.barCodeApplicable[1].value;
        this.selectedlengthAPPLICABLE = this.barCodeApplicable[1].value;
        this.selectedstopsAPPLICABLE = this.barCodeApplicable[1].value;
        this.selectedshowInRMReport = this.barCodeApplicable[1].value;
        this.selectedActiveStatus = this.statusList[1].value;
        setTimeout(() => {
            this._route.params.subscribe(params => {
                this.stockItemId = params.id;
                // this.getLedgerData();
                this.getStockData(this.stockItemId);
            });
        }, 2000);

        this.getLedgerData();
        this.getUnitData();
        this.getStockGroupList();
        this.getLocation();
        this.getSupplier();
        this.getStockItemGroup();
    }

    back(url){
      this.commonService.getNavigate(url);
    }

    getStockItemGroup() {
        this.stockService.getStockItemGroup().subscribe(res => {
            if (res.status === "200") {
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    this.stockItemGroup.push({
                        label: data[i].stockItemDesc,
                        value: {
                            stockItemID: data[i].stockItemID,
                            itemDesc: data[i].stockItemDesc
                        }
                    });
                }
            }
        });
    }

    getStockData(stockId) {
        this.showLoader = true;
        this.stockItemSubscription = this.stockService.getStock(stockId).subscribe((res : StockDetailResponse) => {
            this.stock = res.data[0];
            this.showLoader = false;

            if (this.stockItemId && this.stock) {
                this.sForm.controls["itemName"].setValue(this.stock["itemName"]);
                this.sForm.controls["itemCode"].setValue(this.stock["itemCode"]);
                this.sForm.controls["stockItemID"].setValue(this.stock["stockItemID"]);
                this.sForm.controls["stockGroup_ID"].setValue(this.stock["stockGroup_ID"]);
                this.sForm.controls["unit_ID"].setValue(this.stock["unit_ID"]);
                this.sForm.controls["lengthAPPLICABLE"].setValue(this.stock["lengthAPPLICABLE"]);
                this.sForm.controls["stopsAPPLICABLE"].setValue(this.stock["stopsAPPLICABLE"]);
                this.sForm.controls["showInRMReport"].setValue(this.stock["showInRMReport"]);
                this.sForm.controls["mainBox"].setValue(this.stock["mainBox"]);
                this.sForm.controls["subBox"].setValue(this.stock["subBox"]);
                this.sForm.controls["minimum_Order_Level"].setValue(this.stock["minimum_Order_Level"]);
                this.sForm.controls["minimum_Order_Qty"].setValue(this.stock["minimum_Order_Qty"]);
                this.sForm.controls["bufferQty"].setValue(this.stock["bufferQty"]);
                this.sForm.controls["hsnCode"].setValue(this.stock["hsnCode"]);
                this.sForm.controls["taxrate"].setValue(this.stock["taxrate"]);
                this.sForm.controls["gstUnit"].setValue(this.stock["gstUnit"]);
                this.sForm.controls["barcodeapplicable"].setValue(this.stock["barcodeapplicable"]);
                this.sForm.controls["barcodelength"].setValue(this.stock["barcodelength"]);
                this.sForm.controls["branchName"].setValue(this.stock["branchName"]);
                this.sForm.controls["activeStatus"].setValue(this.stock["activeStatus"]);
                this.sForm.controls["company_ID"].setValue(this.stock["company_ID"]);
                this.sForm.controls["userID"].setValue(this.stock["userID"]);
                // this.sForm.controls["unit_ID"].setValue(this.stock["unit_ID"]);
                // this.sForm.controls["unitName"].setValue(this.stock["unitName"]);

                const arrstockItemBoxList = <FormArray>(this.sForm.get("stockItemBoxList"));

                for (var i = 0; i < this.stock.stockItemBoxList.length; i++) {
                    arrstockItemBoxList.controls[i].get("stockItemID").setValue(this.stock["stockItemBoxList"][i].stockItemID);
                    arrstockItemBoxList.controls[i].get("itemDesc").setValue(this.stock["stockItemBoxList"][i].itemDesc);
                }

                const controlArray = <FormArray> this.sForm.get("stockItemOpeningBal");
                // if (controlArray.length > 0) {
                // controlArray.removeAt(0);
                // }
                for (var i = 0; i < this.stock.stockItemOpeningBal.length; i++) {
                    controlArray.controls[i].get("stockItemOPID").setValue(this.stock["stockItemOpeningBal"][i].stockItemOPID);
                    controlArray.controls[i].get("stockitem_ID").setValue(this.stock["stockItemOpeningBal"][i].stockitem_ID);
                    controlArray.controls[i].get("location_ID").setValue(this.stock["stockItemOpeningBal"][i].location_ID);
                    controlArray.controls[i].get("locationName").setValue(this.stock["stockItemOpeningBal"][i].locationName);
                    controlArray.controls[i].get("qty").setValue(this.stock["stockItemOpeningBal"][i].qty);
                    controlArray.controls[i].get("rate").setValue(this.stock["stockItemOpeningBal"][i].rate);
                    controlArray.controls[i].get("amount").setValue(this.stock["stockItemOpeningBal"][i].amount);
                }

                const ControlStockItemSupplier = <FormArray>(this.sForm.get("stockItemSuppliers"));
                // if (ControlStockItemSupplier.length > 0) {
                // ControlStockItemSupplier.removeAt(0);
                // }
                for (var i = 0; i < this.stock.stockItemSuppliers.length; i++) {
                    ControlStockItemSupplier.controls[i].get("stokItemSupplierID").setValue(this.stock["stockItemSuppliers"][i].stokItemSupplierID);
                    ControlStockItemSupplier.controls[i].get("stockitem_ID").setValue(this.stock["stockItemSuppliers"][i].stockitem_ID);
                    ControlStockItemSupplier.controls[i].get("ledger_ID").setValue(this.stock["stockItemSuppliers"][i].ledger_ID);
                    ControlStockItemSupplier.controls[i].get("ledgerName").setValue(this.stock["stockItemSuppliers"][i].ledgerName);
                    ControlStockItemSupplier.controls[i].get("orderPercentage").setValue(this.stock["stockItemSuppliers"][i].orderPercentage);
                    ControlStockItemSupplier.controls[i].get("leadTime").setValue(this.stock["stockItemSuppliers"][i].leadTime);
                }
            }

            // console.log(this.ledger);
        });
    }

    stockForm() {
        this.sForm = this._formBuilder.group({
            stockItemID: [0],
            itemName: [
                "",
                [
                    Validators.required, Validators.minLength(4)
                ]
            ],
            itemCode: [0],
            stockGroup_ID: [0],
            // stockGroupName: ['', Validators.required],
            unit_ID: [0],
            minimum_Order_Level: [0],
            minimum_Order_Qty: [0],
            bufferQty: [0],
            hsnCode: [0],
            taxrate: [0],
            gstUnit: [0],
            barcodeapplicable: ["false"],
            barcodelength: [0],
            branchName: [""],
            activeStatus: ["false"],
            lengthAPPLICABLE: [
                "true", Validators.required
            ],
            stopsAPPLICABLE: [
                "true", Validators.required
            ],
            showInRMReport: [
                "true", Validators.required
            ],
            mainBox: [""],
            subBox: [""],
            company_ID: [JSON.parse(this.companyId) || 0],
            userID: [JSON.parse(this.userId) || 0],
            stockItemOpeningBal: this._formBuilder.array(
                [this.createStockItemOpeningBalance()]
            ),
            stockItemSuppliers: this._formBuilder.array(
                [this.createStockItemSupplier()]
            ),
            stockItemBoxList: this._formBuilder.array(
                [this.createStockItemBoxList()]
            )
        });
    }

    createStockItemBoxList() {
        return this._formBuilder.group({stockItemID: [0], itemDesc: [""]});
    }

    createStockItemOpeningBalance() {
        return this._formBuilder.group({
            stockItemOPID: [0],
            stockitem_ID: [0],
            location_ID: [0],
            locationName: [""],
            qty: [0],
            rate: [0],
            amount: [0]
        });
    }

    addOpeningBalance() {
        const stockItemArray = <FormArray> this.sForm.get("stockItemOpeningBal");
        stockItemArray.push(this._formBuilder.group({
            stockItemOPID: [],
            stockitem_ID: [],
            location_ID: [],
            locationName: [""],
            qty: [],
            rate: [],
            amount: []
        }));
    }

    removeOpeningBalance(index) {
        const stockItemArray = <FormArray> this.sForm.get("stockItemOpeningBal");
        stockItemArray.removeAt(index);
    }

    createStockItemSupplier() {
        return this._formBuilder.group({
            stokItemSupplierID: [0],
            stockitem_ID: [0],
            ledger_ID: [0],
            ledgerName: [""],
            orderPercentage: [0],
            leadTime: [0]
        });
    }

    addSupplier() {
        const stockItemArray = <FormArray> this.sForm.get("stockItemSuppliers");
        stockItemArray.push(this._formBuilder.group({
            stokItemSupplierID: [0],
            stockitem_ID: [0],
            ledger_ID: [0],
            ledgerName: [""],
            orderPercentage: [""],
            leadTime: [""]
        }));
    }

    removeSupplier(index) {
        const stockItemArray = <FormArray> this.sForm.get("stockItemSuppliers");
        stockItemArray.removeAt(index);
    }

    get itemName() {
        return this.sForm.get("itemName");
    }
    get itemCode() {
        return this.sForm.get("itemCode");
    }
    get stockGroup_ID() {
        return this.sForm.get("stockGroup_ID");
    }
    get stockGroupName() {
        return this.sForm.get("stockGroupName");
    }
    get unit_ID() {
        return this.sForm.get("unit_ID");
    }
    get unitName() {
        return this.sForm.get("unitName");
    }
    get minimum_Order_Level() {
        return this.sForm.get("minimum_Order_Level");
    }
    get minimum_Order_Qty() {
        return this.sForm.get("minimum_Order_Qty");
    }
    get bufferQty() {
        return this.sForm.get("bufferQty");
    }
    get hsnCode() {
        return this.sForm.get("hsnCode");
    }
    get taxrate() {
        return this.sForm.get("taxrate");
    }
    get gstUnit() {
        return this.sForm.get("gstUnit");
    }
    get lengthAPPLICABLE() {
        return this.sForm.get("lengthAPPLICABLE");
    }
    get stopsAPPLICABLE() {
        return this.sForm.get("stopsAPPLICABLE");
    }
    get showInRMReport() {
        return this.sForm.get("showInRMReport");
    }
    get mainBox() {
        return this.sForm.get("mainBox");
    }
    get subBox() {
        return this.sForm.get("subBox");
    }
    get barcodeapplicable() {
        return this.sForm.get("barcodeapplicable");
    }
    get barcodelength() {
        return this.sForm.get("barcodelength");
    }
    get branchName() {
        return this.sForm.get("branchName");
    }
    get activeStatus() {
        return this.sForm.get("activeStatus");
    }

    get stockItemOPID() {
        return this.sForm.get("stockItemOPID");
    }

    get locationName() {
        return this.sForm.get(["stockItemOpeningBal"], 0, ["locationName"]);
    }
    get qty() {
        return this.sForm.get(["stockItemOpeningBal"], 0, ["qty"]);
    }
    get rate() {
        return this.sForm.get(["stockItemOpeningBal"], 0, ["rate"]);
    }
    get amount() {
        return this.sForm.get(["stockItemOpeningBal"], 0, ["amount"]);
    }

    get ledger_ID() {
        return this.sForm.get(["stockItemSuppliers"], 0, ["ledger_ID"]);
    }

    get ledgerName() {
        return this.sForm.get(["stockItemSuppliers"], 0, ["ledgerName"]);
    }
    get orderPercentage() {
        return this.sForm.get(["stockItemSuppliers"], 0, ["orderPercentage"]);
    }
    get leadTime() {
        return this.sForm.get(["stockItemSuppliers"], 0, ["leadTime"]);
    }

    get stockItemID() {
        return this.sForm.get(["stockItemBoxList"], 0, ["stockItemID"]);
    }

    get itemDesc() {
        return this.sForm.get(["stockItemBoxList"], 0, ["itemDesc"]);
    }
    getLedgerData() {
        this.ledgerDataSubscription = this.ledgerService.getAllLedgers().subscribe((res : LedgerResponse) => {
            let data = res.data;
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    this.ledgerData.push({label: data[key].ledgerName, value: data[key].ledger_ID});
                }
            }
        });
    }

    getStockGrupData() {
        this.stockGroupDataSubscription = this.stockService.getAllStocks().subscribe((res : StockResponse) => {
            this.stockData = res.data;
        });
    }

    getUnitData() {
        this.unitDataSubscription = this.unitService.getAllUnits().subscribe((res : any) => {
            if (res.status === "200") {
                this.unitData = res.data;
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    this.unitDataList.push({label: data[i].unitName, value: data[i].unit_ID});
                }
                this.selectedUnit = this.unitDataList[0].value;
            }
        });
    }

    ngOnDestroy() {
        this.stockItemSubscription.unsubscribe();
        this.ledgerDataSubscription.unsubscribe();
        this.unitDataSubscription.unsubscribe();
    }

    saveStockItem(formData) {
        //console.log(formData);
        if (this.sForm.valid) {
            this.stockService.updateStock(formData).subscribe((res : StockResponse) => {
                if (res.status === "200") {
                    this.showSuccess = true;
                    this.successMsg = res.message;
                    setTimeout(() => {
                        this.router.navigate(["/masters/stockItems"]);
                    }, 3000);
                } else {
                    this.errorMsg = res.message;
                    this.showError = true;
                }
            });
        } else {
            return false;
        }
    }

    public getStockGroupList() {
        this.stockGroupService.getAllStockGroups().subscribe((res : any) => {
            if (res.status === "200") {
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    this.stockGroupList.push({label: data[i].stockGroupName, value: data[i].stockGroup_ID});
                }
            }

            this.selectedStockGroup = this.stockGroupList[0].value;
        });
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
                this.selectedLocation = this.locationList[0].value;
            }
        });
    }

    getSupplier() {
        this.supplierService.getAllSuppliers().subscribe((res : any) => {
            if (res && res.status === "200") { // this.supplierlist = res.data;
                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.supplierlist.push({label: data[key].supplierName, value: data[key].supplier_ID});
                    }
                }
            }
        });
    }

    filterItems(event) {
        this.filteredItems = [];
        for (let i = 0; i < this.supplierlist.length; i++) {
            let itemName = this.supplierlist[i].label;
            if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredItems.push(itemName);
            }
        }
    }

    getSelectedVal(event, elem, index) {
        for (var i = 0; i < this.supplierlist.length; i++) {
            if (this.supplierlist[i].label === event) {
                this.sForm.get(elem).controls[index].get("ledger_ID").setValue(this.supplierlist[i].value);
            }
        }
    }
}
