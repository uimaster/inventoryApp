import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-invoice-generation',
  templateUrl: './sales-invoice-generation.component.html',
  styleUrls: ['./sales-invoice-generation.component.scss']
})
export class SalesInvoiceGenerationComponent implements OnInit {

  generationList = [];
  authorizaionCheckedList = [];
  constructor(private salesService: SalesService) { }

  ngOnInit() {
   this.getGenerationList();
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
