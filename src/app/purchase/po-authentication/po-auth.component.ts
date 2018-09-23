import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from './../purchase.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './po-auth.component.html'
})
export class POAuthListComponent implements OnInit {

  POAuthList = [];
  selectedValues: string[] = [];
  constructor( private purchaseService: PurchaseService, private router: Router) { }

  ngOnInit() {
    this.getPOAuthList();
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

  DoAutherize() {
    console.log('sdf');
  }
  DoUnAutherize() {
    console.log('sdf');
  }
}
