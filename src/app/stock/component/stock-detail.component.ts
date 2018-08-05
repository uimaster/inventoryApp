import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { StockService } from '../services/stock.service';
import { StockResponse } from '../models/stock.model';


@Component({
  selector: 'app-stock-detail-item',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  ngOnInit() {
    debugger;
    console.log('hi stock detils');
  }
}
