import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {StockGroupService} from '../services/stock-group.service';
import {StockGroupResponse} from '../models/stock-group.model';


@Component({
    selector: 'app-unit-list',
    templateUrl: './stock-group-list.component.html',
    styleUrls: ['./stock-group-list.component.scss']
})
export class StockGroupListComponent implements OnInit {

    public stockGroupList;
    constructor( private stockGroupService: StockGroupService ) { }

    ngOnInit() {
        this.getStockGroupList();
    }

    getStockGroupList() {
        this.stockGroupService.getAllStockGroups().subscribe((res: StockGroupResponse) => {
            if (res && res.status === '200')  {
                this.stockGroupList = res.data;
                // console.log(this.unitList);

            }
        });
    }

    
    

}
