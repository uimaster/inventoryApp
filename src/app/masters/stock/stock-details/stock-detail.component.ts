import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-detail-item',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  ngOnInit() {
    console.log('hi stock detils');
  }
}
