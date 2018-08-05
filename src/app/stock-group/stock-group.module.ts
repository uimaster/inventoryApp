import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockGroupListComponent} from "./component/stock-group-list.component";
import {StockGroupService} from "./services/stock-group.service";
import {StockGroupRouter} from "./stock-group.routes";
@NgModule({
    declarations: [ StockGroupListComponent ],
    imports: [
        StockGroupRouter,
        CommonModule
    ],
    providers: [ StockGroupService ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StockGroupModule{}

