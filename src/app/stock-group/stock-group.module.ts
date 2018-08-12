import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockGroupListComponent} from './component/stock-group-list.component';
import {StockGroupService} from './services/stock-group.service';
import {StockGroupRouteModule} from './stock-group.route.module';
import {ReactiveFormsModule} from "@angular/forms";
import {StockGroupComponent} from "./component/stock-group.component";
@NgModule({
    declarations: [ StockGroupListComponent, StockGroupComponent ],
    imports: [
        StockGroupRouteModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [ StockGroupService ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StockGroupModule {}

