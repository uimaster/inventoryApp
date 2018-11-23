import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-order-verification',
  templateUrl: './sales-order-verification.component.html',
  styleUrls: ['./sales-order-verification.component.scss']
})
export class SalesOrderVerificationComponent implements OnInit {
  verificationList = [];
  authorizaionCheckedList = [];
  constructor(private salesService: SalesService) { }

  ngOnInit() {
   this.getSalesOrderList();
  }

  getSalesOrderList() {
    this.salesService.getSalesOrderVerification().subscribe( res => {
      if (res && res.status === '200') {
        this.verificationList = res.data;
      }
    });
  }

  authoriseOrder() {
    this.salesService.authoriseSalesOrder(this.authorizaionCheckedList).subscribe( res => {
      alert(res.message);
    });
  }

  getAuthCheckList(id) {
    this.authorizaionCheckedList.push({'transactionID': id});
    console.log(this.authorizaionCheckedList);
  }

}
