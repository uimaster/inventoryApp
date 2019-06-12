import { Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionServices } from './../../../transactionsShared/transaction.service';
import { Component, OnInit } from "@angular/core";
import { WorkInstructionService } from '../work-instruction.service';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  public workInstructionDetails = [];
  public workInstructionForm: FormGroup;
  constructor(private fb : FormBuilder, private transactionService : TransactionServices, private workInstructionService : WorkInstructionService, private router : Router) {}

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
        BatchNo: [
            , Validators.required
        ],
        BatchID: [0],
        serialNumber: [],
        StockItemID: [],
        AssemblerID: [0],
        AssemblerName: [
            '', Validators.required
        ],
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

  getWorkInstructionDetails() {
    this.workInstructionService.getWorkInstructionDetails().subscribe(res => {
      if (res.status === "200") {
        if (res.data.length > 0) {
          this.workInstructionDetails = res.data;
          this.workInstructionForm.controls["StockItemID"].setValue(this.workInstructionDetails[0].stockItemID);
          this.workInstructionForm.controls["BatchID"].setValue(this.workInstructionDetails[0].batchID);
          this.workInstructionForm.controls["BatchNo"].setValue(this.workInstructionDetails[0].batchNo);
          this.workInstructionForm.controls["serialNumber"].setValue(0);
          this.workInstructionForm.controls['AssemblerName'].setValue(this.workInstructionDetails[0].assemblerName);
          this.workInstructionForm.controls['AssemblerID'].setValue(this.workInstructionDetails[0].assemblerCode);

          const BatchFormArray = <FormArray>(this.workInstructionForm.controls["AssemblyBatchDetails"]);
          if (this.workInstructionDetails[0].assemblyBatchDetails.length > 0) {
            for (var i = 0; i < this.workInstructionDetails[0].assemblyBatchDetails.length; i++) {
              BatchFormArray.push(this.fb.group({
                batchid: [this.workInstructionDetails[0].assemblyBatchDetails[i].batchID],
                batchno: [this.workInstructionDetails[0].assemblyBatchDetails[i].batchNo],
                stockItemID: [this.workInstructionDetails[0].assemblyBatchDetails[i].stockItemID],
                qty: [this.workInstructionDetails[0].assemblyBatchDetails[i].qty]
            }));
            }
          }
        }
      }
    });
  }
}
