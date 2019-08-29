import { Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TransactionServices } from "./../../../transactionsShared/transaction.service";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { WorkInstructionService } from "../work-instruction.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  public workInstructionDetails = [];
  public workInstructionForm: FormGroup;
  public showLoader = false;
  public displayworksModal = false;
  public plValidationMsg = "";
  public displayGrnBarcodeDialog = false;
  @ViewChild("itemBarCode") itemBarCode: ElementRef;
  @ViewChild("itemQtyGnr") itemQtyGnr: ElementRef;
  @ViewChild("startLength") startLength: ElementRef;
  @ViewChild("endtLength") endtLength: ElementRef;
  public grnBarcodeTitle: any;
  public grnValidationMsg = "";
  public BarcodeSuccessMsg = "";
  public GRNvalidateStatus = false;
  public ItemBarCodeLength: any;
  public currentIndex: number;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionServices,
    private workInstructionService: WorkInstructionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentIndex = 0;
    this.createForm();
    setTimeout(() => {
      this.getWorkInstructionDetails();
    }, 500);
  }

  createForm() {
    const date = new Date();
    this.workInstructionForm = this.fb.group({
      AssemblyWorkInstructionID: [0],
      AssemblyWorkInstructionDate: [date],
      BatchNo: [, Validators.required],
      BatchID: [0],
      serialNumber: [],
      StockItemID: [],
      AssemblerID: [0],
      AssemblerName: ["", Validators.required],
      assemblyWorkInstructionDetails: this.fb.array([]),
      AssemblyBatchDetails: this.fb.array([])
    });
  }

  instructionDetailsForm() {
    return this.fb.group({ 
      InstructionSRNo: [],
      StockitemId: [],
      Qty: [],
      batchLength:[],
      batchStatus: [],
      itemCode: [],
      itemDesc: [],
      scanQty: [],
      instructiondescription:[]
    });
  }

  instructionBatchDetailsForm() {
    return this.fb.group({
      batchID: [0],
      batchNo: [""],
      stockItemID: [0],
      qty: [0],
      itemCode: [0]
    });
  }
  get serialNumber() {
    return this.workInstructionForm.get("serialNumber");
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

  scanItem(id) {
    console.log(id);
  }

  delete(id) {
    console.log(id);
  }

  deleteItemBatch(index) {
    const batchFormArray = <FormArray>(
      this.workInstructionForm.controls["AssemblyBatchDetails"]
    );
    const itemCode = batchFormArray.controls[index].get("stockItemID").value;
    const detailsFormArray = <FormArray>(
      this.workInstructionForm.controls["assemblyWorkInstructionDetails"]
    );
    for (let i = 0; i < detailsFormArray.length; i++) {
      if (detailsFormArray.controls[i].get("stockItemID").value === itemCode) {
        const getQty = detailsFormArray.controls[i].get("qty").value;
        detailsFormArray.controls[i].get("qty").setValue(getQty - 1);
      }
    }
    batchFormArray.removeAt(index);
  }

  getWorkInstructionDetails() {
    this.workInstructionService.getWorkInstructionDetails().subscribe(res => {
      if (res.status === "200") {
        if (res.data.length > 0) {
          this.workInstructionDetails = res.data;
          this.workInstructionForm.controls["AssemblyWorkInstructionID"].setValue(
            this.workInstructionDetails[0].assemblyWorkInstructionID
          );
          this.workInstructionForm.controls["StockItemID"].setValue(
            this.workInstructionDetails[0].stockItemID
          );
          this.workInstructionForm.controls["BatchID"].setValue(
            this.workInstructionDetails[0].batchID
          );
          this.workInstructionForm.controls["BatchNo"].setValue(
            this.workInstructionDetails[0].batchNo
          );
          this.workInstructionForm.controls["serialNumber"].setValue(0);
          this.workInstructionForm.controls["AssemblerName"].setValue(
            this.workInstructionDetails[0].assemblerName
          );
          this.workInstructionForm.controls["AssemblerID"].setValue(
            this.workInstructionDetails[0].assemblerCode
          );

          const AssemblFormArray = <FormArray>(
            this.workInstructionForm.controls["assemblyWorkInstructionDetails"]
          );

          if (
            this.workInstructionDetails[0].assemblyWorkInstructionDetails
              .length > 0
          ) {
            for (
              var i = 0;
              i <
              this.workInstructionDetails[0].assemblyWorkInstructionDetails
                .length;
              i++
            ) {
              AssemblFormArray.push(
                this.fb.group({
                  instructionSRNo: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].instructionSRNo
                  ],
                  stockitemId: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].stockitemId
                  ],
                  qty: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].qty
                  ],
                  batchLength: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].batchLength
                  ],
                  batchStatus: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].batchStatus
                  ],
                  itemCode: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].itemCode
                  ],
                  itemDesc: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].itemDesc
                  ],
                  scanQty: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].scanQty
                  ],
                  instructiondescription: [
                    this.workInstructionDetails[0]
                      .assemblyWorkInstructionDetails[i].instructiondescription
                  ]
                })
              );
            }
          }

          const BatchFormArray = <FormArray>(
            this.workInstructionForm.controls["AssemblyBatchDetails"]
          );
          if (this.workInstructionDetails[0].assemblyBatchDetails.length > 0) {
            for (
              var i = 0;
              i < this.workInstructionDetails[0].assemblyBatchDetails.length;
              i++
            ) {
              BatchFormArray.push(
                this.fb.group({
                  batchID: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i]
                      .batchID
                  ],
                  batchNo: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i]
                      .batchNo
                  ],
                  stockItemID: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i]
                      .stockItemID
                  ],
                  qty: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i].qty
                  ],
                  itemCode: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i].itemCode
                  ]
                })
              );
            }
          }
        }
      }
    });
  }

  addGrnBarcode(barcodeSeries) {
    const itemBarCodeVal = this.itemBarCode.nativeElement.value;
    const itemCode = (this.ItemBarCodeLength = this.workInstructionDetails[0].assemblyWorkInstructionDetails[
      this.currentIndex
    ].batchLength);

    if (itemBarCodeVal !== null || itemBarCodeVal !== "") {
      this.transactionService
        .validateBatch(itemCode, barcodeSeries, 2)
        .subscribe(res => {
          const BatchFormArray = <FormArray>(
            this.workInstructionForm.controls["AssemblyBatchDetails"]
          );
          if (res.status === "200") {
            BatchFormArray.push(
              this.fb.group({
                batchID: [res.data[0].batchID],
                batchNo: [res.data[0].batchNo],
                stockItemID: [res.data[0].stockItemID],
                qty: [res.data[0].qty],
                itemCode: [res.data[0].itemCode]
              })
            );
            this.displayGrnBarcodeDialog = false;
            const itemcode = BatchFormArray.controls[this.currentIndex].get(
              "stockItemID"
            ).value;
            const detailsFormArray = <FormArray>(
              this.workInstructionForm.controls[
                "assemblyWorkInstructionDetails"
              ]
            );
            for (let i = 0; i < detailsFormArray.length; i++) {
              if (
                detailsFormArray.controls[i].get("stockItemID").value ===
                itemcode
              ) {
                const getQty = detailsFormArray.controls[i].get("qty").value;
                detailsFormArray.controls[i].get("qty").setValue(getQty + 1);
              }
            }
          } else {
            alert(res.message);
            this.itemBarCode.nativeElement.value = "";
          }
        });
    }
  }

  clearErrorBox() {
    this.plValidationMsg = "";
    this.BarcodeSuccessMsg = "";
  }

  showGrnBarcodeDialog(index) {
    // if (this.workInstructionDetails[0].assemblyWorkInstructionDetails[index].batchStatus && this.workInstructionDetails[0].assemblyWorkInstructionDetails[index].qty > this.workInstructionDetails[0].assemblyWorkInstructionDetails[index].scanQty) {
    if (
      this.workInstructionDetails[0].assemblyWorkInstructionDetails[index]
        .batchStatus
    ) {
      this.currentIndex = index;
      this.displayGrnBarcodeDialog = true;
      this.grnValidationMsg = "";
      this.BarcodeSuccessMsg = "";
      var stockItemId = 0;
      const controlArray = <FormArray>(
        this.workInstructionForm.get("assemblyWorkInstructionDetails")
      );
      stockItemId = controlArray.controls[index].get("stockItemID").value;
      this.ItemBarCodeLength = this.workInstructionDetails[0].assemblyWorkInstructionDetails[
        index
      ].batchLength;
      // this.ItemBarCodeLength = controlArray.controls[index].get("batchLength").value;
      this.itemBarCode.nativeElement.value = "";
    } else {
      alert("This Item is not applicable for Barcode Scan.");
      return false;
    }
  }

  callGRNBarcode() {
    this.grnValidationMsg = "";
    this.BarcodeSuccessMsg = "";
    const itemBarCodeVal = this.itemBarCode.nativeElement.value;
    if (itemBarCodeVal.length === this.ItemBarCodeLength) {
      this.addGrnBarcode(itemBarCodeVal);
    } else if (itemBarCodeVal.length > this.ItemBarCodeLength) {
      alert("Barcode length should be equal of " + this.ItemBarCodeLength);
    }
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
}
