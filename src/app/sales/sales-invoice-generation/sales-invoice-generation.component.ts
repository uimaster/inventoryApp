import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { UsersService } from '../../users/service/user.service';

@Component({
  selector: 'app-sales-invoice-generation',
  templateUrl: './sales-invoice-generation.component.html',
  styleUrls: ['./sales-invoice-generation.component.scss']
})
export class SalesInvoiceGenerationComponent implements OnInit {

  generationList = [];
  authorizaionCheckedList = [];
  public userRightMenuData = {};
  constructor(private salesService: SalesService, private userService: UsersService) { }

  ngOnInit() {
   this.getGenerationList();
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

  getGenerationList() {
    this.salesService.getSalesGeneration().subscribe( res => {
      if (res && res.status === '200') {
        this.generationList = res.data;
      }
    });
  }

  authoriseInvoice() {
    this.salesService.authoriseSalesInvoice(this.authorizaionCheckedList).subscribe( res => {
      alert(res.message);
    });
  }

  getAuthCheckList(id) {
    this.authorizaionCheckedList.push({'transactionID': id});
  }

}
