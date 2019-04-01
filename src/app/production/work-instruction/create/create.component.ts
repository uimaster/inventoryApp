import { WorkInstructionService } from "./../work-instruction.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { TransactionServices } from "../../../transactionsShared/transaction.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateWorkInstructionComponent implements OnInit {
  public workInstructionForm: FormGroup;
  public displayworksModal = false;
  @ViewChild("barCode") barCode: ElementRef;
  public plValidationMsg = "";
  public workInstructionItemList = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionServices,
    private workInstructionService: WorkInstructionService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.workInstructionForm = this.fb.group({
      serialNo: [""],
      finishgoodId: [""]
    });
  }

  getOpenBarcodeModal() {
    this.displayworksModal = true;
    this.barCode.nativeElement.value = "";
    this.plValidationMsg = "";
  }

  startScan() {
    var inputData = this.barCode.nativeElement.value;
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
        this.plValidationMsg = "Please enter correct data.";
      }
    }
    this.displayworksModal = false;
  }

  getBatchValidate(itemcode, batchcode, type) {
    this.transactionService
      .validateBatch(itemcode, batchcode, type)
      .subscribe(res => {
        if (res.status === "200") {
          this.getWorkInstructionDetailsForItem(res.data[0].stockItemID);
          this.workInstructionForm.controls['serialNo'].setValue(res.data[0].itemCode);
          this.workInstructionForm.controls['finishgoodId'].setValue(res.data[0].batchno);
        }
      });
  }

  getWorkInstructionDetailsForItem(itemcode) {
    this.workInstructionService
      .getWorkInstructionDetailsForItem(itemcode)
      .subscribe(res => {
        if (res.status === "200") {
          this.workInstructionItemList = res.data;
        }
      });
  }
}
