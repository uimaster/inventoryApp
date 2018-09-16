import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PurchaseService } from './../purchase.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.html',
  styleUrls: ['./purchase-order.scss']
})
export class PurchaseOrderComponent implements OnInit {

  purchaseList = [];
  constructor( private purchaseService: PurchaseService, private router: Router) { }

  ngOnInit() {
    this.getPurchaseList();
  }

  getPurchaseList() {
    this.purchaseService.getPurchaseList().subscribe ( res => {
      if (res) {
        if (res.status === '200') {
          this.purchaseList = res.data;
          console.log('purchaseList:', this.purchaseList);
        }
      }
    });
  }

  addPOrder() {
    this.router.navigate(['/purchase/addPOrder']);
    localStorage.setItem('transactionID', '0');
  }

  getPurchaseDetails(id) {
    localStorage.setItem('transactionID', id);
    this.router.navigate(['/purchase/addPOrder']);
  }

}
