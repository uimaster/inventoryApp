import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from './../purchase.service';
import { TransactionServices } from '../../transactionsShared/transaction.service';
import { UsersService } from '../../users/service/user.service';

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
  public userRightMenuData = {};
  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private trasactionService: TransactionServices,
    private userService: UsersService
    ) {
    // this.createForm();
  }

  ngOnInit() {
    localStorage.setItem('t_searchText','');
    // this.getPOAuthList();
    this.createUnauthoriseForm();
    this.getUserMenuDetails();
  }

  getUserMenuDetails() {
    let userID = localStorage.getItem('userID');
    let userRightMenuID = localStorage.getItem('userRightMenuID');
    this.userService.getUserMenuDetails(userID, userRightMenuID).subscribe( val => {
      if (val.status === '200') {
        this.userRightMenuData = val.data[0].userRightTabModelList;
      }
    });
  }

  showDialog(data) {
    this.display = true;
    this.unauthenticationData = data;
  }

  DoAutherize() {
    this.authrizeForm = this.fb.group(this.formData);
    this.purchaseService.pOAuthrize([this.authrizeForm.value]).subscribe ( res => {
      if (res && res.status === 200) {
        alert(res.message);
        this.getPOAuthList([]);
      } else {
        alert(res.message);
        this.getPOAuthList([]);
      }
    });
  }

  createFormData(data, event) {
    if (event === true) {
      // this.formData.push({
      //   transactionID: data.transactionID,
      //   TransactionAuthStatusID: 4,
      //   AuthRemarks: '',
      //   UserID: 1
      // });

      const checkedData = { transactionID: data.transactionID, TransactionAuthStatusID: 4, AuthRemarks: '', UserID: 1};

      this.formData = checkedData;
    }
  }

  getPOAuthList(dates) {
    this.purchaseService.getPOAuthList(dates).subscribe( res => {
      if (res) {
        if (res.status === '200') {
          this.POAuthList = res.data;
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
      TransactionAuthStatusID: new FormControl(1),
      AuthRemarks: new FormControl('', Validators.required),
      UserID: new FormControl(1)
    });
  }

  DoUnAutherize() {
    this.unauthenticationForm.controls['transactionID'].setValue(this.unauthenticationData.transactionID);
    this.purchaseService.pOAuthrize(JSON.stringify([this.unauthenticationForm.value])).subscribe ( res => {
      if (res && res.status === 200) {
        alert(res.message);
        this.getPOAuthList([]);
        this.unauthenticationForm.controls['AuthRemarks'].setValue('');
      } else {
        alert(res.message);
        this.getPOAuthList([]);
      }
    });
  }
}
