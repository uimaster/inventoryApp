import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { UsersService } from '../../users/service/user.service';

@Component({
  selector: 'app-sales-order-verification',
  templateUrl: './sales-order-verification.component.html',
  styleUrls: ['./sales-order-verification.component.scss']
})
export class SalesOrderVerificationComponent implements OnInit {
  verificationList = [];
  authorizaionCheckedList = [];
  public userRightMenuData = {};
  constructor(private salesService: SalesService, private userService: UsersService) { }

  ngOnInit() {
   this.getSalesOrderList();
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
      this.getSalesOrderList();
    });
  }

  getAuthCheckList(id) {
    this.authorizaionCheckedList.push({'transactionID': id});
  }

}
