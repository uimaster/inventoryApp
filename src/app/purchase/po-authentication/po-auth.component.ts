import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from './../purchase.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './po-auth.component.html',
  styleUrls: ['./po-auth.component.scss']
})
export class POAuthListComponent implements OnInit {

  POAuthList = [];
  selectedItems: string[] = [];
  selectedItem: string[] = [];
  authrizeForm: FormGroup;
  formData: any;
  display = false;
  unauthenticationData: any;
  unauthenticationForm: any;
  constructor( private purchaseService: PurchaseService, private router: Router, private fb: FormBuilder, private http: HttpClient) {
    // this.createForm();
  }

  ngOnInit() {
    this.getPOAuthList();
    this.createUnauthoriseForm();
  }

  showDialog(data) {
    this.display = true;
    this.unauthenticationData = data;
  }

  DoAutherize() {
    this.authrizeForm = this.fb.group(this.formData);
    console.log(this.authrizeForm.value);
    this.purchaseService.pOAuthrize([this.authrizeForm.value]).subscribe ( res => {
      if (res && res.status === 200) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  }

  createFormData(data, event) {
    if (event === true) {
      // this.formData.push({
      //   transactionID: data.transactionID,
      //   TransactionAuthStatusID: data.transactionAuthStatusID,
      //   AuthRemarks: '',
      //   UserID: 1
      // });
      var checkedData = { transactionID: [data.transactionID], TransactionAuthStatusID: [data.transactionAuthStatusID],
        AuthRemarks: [''], UserID: [1]};
      this.formData = checkedData ;
    }
    console.log(this.formData);
  }

  getPOAuthList() {
    this.purchaseService.getPOAuthList().subscribe( res => {
      if (res) {
        if (res.status === '200') {
          this.POAuthList = res.data;
          console.log('purchaseList:', this.POAuthList);
        }
      }
    });

  }

  getPOSelect(event) {
    // this.selectedItems.push(trID, statusId);
    console.log(event);
  }

  createUnauthoriseForm () {
    this.unauthenticationForm = this.fb.group({
      transactionID: new FormControl(''),
      TransactionAuthStatusID: new FormControl(''),
      AuthRemarks: new FormControl(''),
      UserID: new FormControl(1)
    });
  }

  DoUnAutherize() {
    this.unauthenticationForm.control['transactionID'].setValue(this.unauthenticationData.transactionID);
    this.unauthenticationForm.control['TransactionAuthStatusID'].setValue(this.unauthenticationData.transactionAuthStatusID);

    this.purchaseService.pOAuthrize(JSON.stringify([this.unauthenticationForm.value])).subscribe ( res => {
      if (res && res.status === 200) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  }
}
