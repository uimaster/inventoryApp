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
  @ViewChild("barCode") barCode: ElementRef;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionServices,
    private workInstructionService: WorkInstructionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    setTimeout(() => {
      this.getWorkInstructionDetails();
    }, 100);
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
      AssemblyWorkInstructionDetails: this.fb.array([]),
      AssemblyBatchDetails: this.fb.array([])
    });
  }

  instructionDetailsForm() {
    return this.fb.group({ InstructionSRNo: [], StockitemId: [], Qty: [] });
  }

  instructionBatchDetailsForm() {
    return this.fb.group({
      batchid: [0],
      batchno: [""],
      stockItemID: [0],
      qty: [0]
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
    const BatchFormArray = <FormArray>(
      this.workInstructionForm.controls["AssemblyBatchDetails"]
    );
    BatchFormArray.removeAt(index);
  }

  getWorkInstructionDetails() {
    this.workInstructionService.getWorkInstructionDetails().subscribe(res => {
      if (res.status === "200") {
        if (res.data.length > 0) {
          this.workInstructionDetails = res.data;
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
                  batchid: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i]
                      .batchID
                  ],
                  batchno: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i]
                      .batchNo
                  ],
                  stockItemID: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i]
                      .stockItemID
                  ],
                  qty: [
                    this.workInstructionDetails[0].assemblyBatchDetails[i].qty
                  ]
                })
              );
            }
          }
        }
      }
    });
  }

  getOpenBarcodeModal() {
    this.displayworksModal = true;
    this.barCode.nativeElement.value = "";
    this.plValidationMsg = "";
  }

  getStartScan() {
    // setTimeout(() => {
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
    const barchArray = <FormArray>(
      this.workInstructionForm.controls["AssemblyBatchDetails"]
    );
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
        this.getBatchValidateForSerial(splitBarcode, splitBatchCode, 1);
      } else {
        alert("Please enter correct data.");
      }
    }
  }

  getBatchValidateForSerial(itemcode, batchcode, type) {
    const AssemblFormArray = <FormArray>(
      this.workInstructionForm.controls["AssemblyWorkInstructionDetails"]
    );
    const BatchFormArray = <FormArray>(
      this.workInstructionForm.controls["AssemblyBatchDetails"]
    );
    this.transactionService
      .validateBatch(itemcode, batchcode, type)
      .subscribe(res => {
        if (res.status === "200") {
          // AssemblFormArray.push(this.fb.group({
          //     InstructionSRNo: [currentRowData.instructionSRNo],
          //     StockitemId: [currentRowData.stockItemID],
          //     Qty: [currentRowData.qty]
          // }));
          BatchFormArray.push(
            this.fb.group({
              batchid: [res.data[0].batchid],
              batchno: [res.data[0].batchno],
              stockItemID: [res.data[0].stockItemID],
              qty: [JSON.parse(res.data[0].qty)]
            })
          );
        } else {
          alert(res.message);
        }
      });
  }
}
