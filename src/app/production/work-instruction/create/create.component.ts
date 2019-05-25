import {Router} from "@angular/router";
import {WorkInstructionService} from "./../work-instruction.service";
import {FormBuilder, FormArray, Validators} from "@angular/forms";
import {FormGroup} from "@angular/forms";
import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {TransactionServices} from "../../../transactionsShared/transaction.service";

@Component({selector: "app-create", templateUrl: "./create.component.html", styleUrls: ["./create.component.scss"]})
export class CreateWorkInstructionComponent implements OnInit {
    public workInstructionForm : FormGroup;
    public displayworksModal = false;
    @ViewChild("barCode")barCode : ElementRef;
    @ViewChild("serialNum")serialNum : ElementRef;
    @ViewChild("quantity")quantity : ElementRef;
    public plValidationMsg = "";
    public workInstructionItemList = [];
    public currentIndex = 0;
    public disabledSerial = true;
    public showLoader = false;
    public rowLength = 0;
    public disableAll : boolean;

    constructor(private fb : FormBuilder, private transactionService : TransactionServices, private workInstructionService : WorkInstructionService, private router : Router) {}

    ngOnInit() {
        this.disableAll = false;
        this.createForm();
    }

    convertToDateFormat(Datestr) {
        if (Datestr != "") {
            var datedata = Datestr.split("-");
            var formatedDateString = datedata[0] + "-" + datedata[1] + "-" + datedata[2];
            console.log(formatedDateString);
            return formatedDateString;
        }

        // let dDate = new Date(
        // Datestr.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
        // );
        // let year = dDate.getFullYear();
        // var month: any = dDate.getMonth() + 1;
        // if (month < 10) {
        // month = "0" + month;
        // }
        // var day: any = dDate.getDate();
        // if (day < 10) {
        // day = "0" + day;
        // }
        // let fDate = day + "-" + month + "-" + year;
        // return fDate;
    }

    createForm() {
        const date = new Date();
        this.workInstructionForm = this.fb.group({
            AssemblyWorkInstructionID: [0],
            AssemblyWorkInstructionDate: [date],
            BatchNo: [
                , Validators.required
            ],
            BatchID: [0],
            StockItemID: [
                , Validators.required
            ],
            AssemblerID: [
                0, Validators.required
            ],
            AssemblerName: [''],
            AssemblyWorkInstructionDetails: this.fb.array([]),
            AssemblyBatchDetails: this.fb.array([])
        });
    }

    instructionDetailsForm() {
        return this.fb.group({InstructionSRNo: [], StockitemId: [], Qty: []});
    }

    instructionBatchDetailsForm() {
        return this.fb.group({batchid: [0], batchno: [""], stockItemID: [0], qty: [0]});
    }

    get BatchNo() {
        return this.workInstructionForm.get("BatchNo");
    }
    get StockItemID() {
        return this.workInstructionForm.get("StockItemID");
    }

    get Qty() {
        return this.workInstructionForm.get(["Qty"]);
    }

    getOpenBarcodeModal() {
        this.displayworksModal = true;
        this.barCode.nativeElement.value = "";
        this.plValidationMsg = "";
    }

    getStartScan() { // setTimeout(() => {
        var inputData = this.barCode.nativeElement.value;
        if (inputData !== "") {
            var barcodeVal = inputData.trim().split("-");
            if (barcodeVal[1]) {
                if (barcodeVal[1].length === 7) {
                    this.startScan();
                }
            }
        } else {
            alert("Please enter correct Barcode.");
        }
        // }, 1000);
    }

    startScan() {
        var inputData = this.barCode.nativeElement.value;
        this.currentIndex = 0;
        const barchArray = <FormArray>(this.workInstructionForm.controls["AssemblyBatchDetails"]);
        for (var i = 0; i < barchArray.length; i++) {
            barchArray.removeAt(i);
        }

        if (inputData !== "") {
            var barcodeVal = inputData.split("-");
            var splitBarcode = "";
            var splitBatchCode = "";
            if ((barcodeVal !== 0 && barcodeVal !== undefined) || barcodeVal !== "") {
                if (barcodeVal[0].trim() !== null) {
                    splitBarcode = barcodeVal[0].trim();
                }
                if (barcodeVal[1].trim() !== null) {
                    splitBatchCode = barcodeVal[1].trim();
                }
                this.getBatchValidate(splitBarcode, splitBatchCode, 1);
            } else {
                alert("Please enter correct data.");
            }
        }
    }

    getBatchValidate(itemcode, batchcode, type) {
        this.transactionService.validateBatch(itemcode, batchcode, type).subscribe(res => {
            if (res.status === "200") {
                this.getWorkInstructionDetailsForItem(res.data[0].stockItemID);
                this.workInstructionForm.controls["StockItemID"].setValue(res.data[0].stockItemID);
                this.workInstructionForm.controls["BatchID"].setValue(res.data[0].batchid);
                this.workInstructionForm.controls["BatchNo"].setValue(batchcode);
                // this.workInstructionForm.controls["BatchNo"].setValue(itemcode);
                this.displayworksModal = false;
            } else {
                alert(res.message);
                this.barCode.nativeElement.value = '';
            }
        });
    }

    getWorkInstructionDetailsForItem(itemcode) {
        this.workInstructionService.getWorkInstructionDetailsForItem(itemcode).subscribe(res => {
            if (res.status === "200") {
                this.workInstructionItemList = res.data;
                this.getValidateItems();
            }
        });
    }

    getValidateItems() {
        if (this.workInstructionItemList.length > this.currentIndex) {
            const currentRowData = this.workInstructionItemList[this.currentIndex];
            this.rowLength = currentRowData.batchLength;
            if (currentRowData.batchStatus === false) {
                this.disabledSerial = true;
            } else {
                this.disabledSerial = false;
            }
        } else {
            alert('No item left.');
        }
    }

    getValidateQty() {
        this.showLoader = true;
        const currentRowData = this.workInstructionItemList[this.currentIndex];
        var quantityData = this.quantity.nativeElement;
        const formArray = <FormArray>(this.workInstructionForm.controls["AssemblyWorkInstructionDetails"]);

        if (this.workInstructionItemList.length > this.currentIndex) {
            if (currentRowData.qty == quantityData.value.trim()) {
                quantityData.value = "";
                formArray.push(this.fb.group({
                    InstructionSRNo: [currentRowData.instructionSRNo],
                    StockitemId: [currentRowData.stockItemID],
                    Qty: [currentRowData.qty]
                }));
                this.currentIndex = this.currentIndex + 1;
                if (this.workInstructionItemList.length > this.currentIndex) {
                    this.getValidateItems();
                }
                if (this.workInstructionItemList.length === this.currentIndex) {
                    this.disableAll = true;
                    alert('All items are completed.');
                }
                this.showLoader = false;
            } else {
                alert("Enter valid Quantity.");
                this.showLoader = false;
                return false;
            }
        } else {
            alert('No item left.');
        }
        this.showLoader = false;
    }

    startScanSerial(event) {
        var barCode;
        barCode = event.target.value;
        if (barCode.length === this.rowLength) {
            this.showLoader = true;
            const BatchFormArray = <FormArray>(this.workInstructionForm.controls["AssemblyBatchDetails"]);
            for (var i = 0; i < BatchFormArray.length; i++) {
                if (barCode === BatchFormArray.controls[i].get("batchno").value) {
                    alert('This Serial aleady exist. Please try again.');
                    this.showLoader = false;
                    return false;
                }
            }

            var stockItem = this.workInstructionItemList[this.currentIndex].itemCode;
            if (barCode !== "" && barCode !== undefined && stockItem !== undefined) {
                this.getBatchValidateForSerial(stockItem, barCode, 4);
                this.showLoader = false;
                this.serialNum.nativeElement.value = "";
            } else {
                alert("Please enter correct data.");
                this.showLoader = false;
            }
            this.showLoader = false;
        }
    }

    getBatchValidateForSerial(itemcode, batchcode, type) {
        const AssemblFormArray = <FormArray>(this.workInstructionForm.controls["AssemblyWorkInstructionDetails"]);
        const BatchFormArray = <FormArray>(this.workInstructionForm.controls["AssemblyBatchDetails"]);
        const currentRowData = this.workInstructionItemList[this.currentIndex];
        this.transactionService.validateBatch(itemcode, batchcode, type).subscribe(res => {
            if (res.status === "200") {
                AssemblFormArray.push(this.fb.group({
                    InstructionSRNo: [currentRowData.instructionSRNo],
                    StockitemId: [currentRowData.stockItemID],
                    Qty: [currentRowData.qty]
                }));
                BatchFormArray.push(this.fb.group({
                    batchid: [res.data[0].batchid],
                    batchno: [res.data[0].batchno],
                    stockItemID: [res.data[0].stockItemID],
                    qty: [JSON.parse(res.data[0].qty)]
                }));
                this.currentIndex = this.currentIndex + 1;
                if (this.workInstructionItemList.length > this.currentIndex) {
                    this.getValidateItems();
                }
                if (this.workInstructionItemList.length === this.currentIndex) {
                    this.disableAll = true;
                    alert('All items are completed.');
                }
            } else {
                alert(res.message);
            }
        });
    }

    saveWorkInstruction(data) {
        this.showLoader = true;
        // let date = this.convertToDateFormat(data.AssemblyWorkInstructionDate);
        // this.workInstructionForm.controls['AssemblyWorkInstructionDate'].setValue(date);
        this.workInstructionService.postWorkInstructionDetails(data).subscribe(val => {
            alert(val.message);
            this.showLoader = false;
            setTimeout(() => {
                this.router.navigate(["/production/workInstruction"]);
            }, 2000);
        });
        this.showLoader = false;
    }

    getAssembler(event) {
        let id = event.target.value;
        if (id.length >= 4) {
            this.workInstructionService.getAssembler(id).subscribe(res => {
                if (res.status === '200') {
                    if (res.data[0] !== null && res.data[0] !== undefined) {
                        this.workInstructionForm.controls['AssemblerName'].setValue(res.data[0].assemblerName);
                        this.workInstructionForm.controls['AssemblerID'].setValue(res.data[0].assemblerID);
                    }
                }
            });
        }

    }
}
