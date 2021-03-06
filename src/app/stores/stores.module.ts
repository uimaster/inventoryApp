import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { SharedModule } from './../shared/shared.module';
import { StoresRouteModule } from './stores.route.module';
import { CreateEditStoreComponent } from './create/create.component';
import { GnrComponent } from './gnr/gnr.component';
import { JobWorkComponent } from './job-work/job-work.component';
import { StockRequestComponent } from './stock-request/stock-request.component';
import { StockNoteComponent } from './stock-note/stock-note.component';
import { StockRejectNoteComponent } from './stock-reject-note/stock-reject-note.component';
import { DelieveryChallanComponent } from './delievery-challan/delievery-challan.component';
import { ReturnableChallanComponent } from './returnable-challan/returnable-challan.component';
import { PhysicalStockComponent } from './physical-stock/physical-stock.component';
import { TransactionSerivices } from '../transactionsShared/transaction.service';
import { TransactionCommonModule } from '../transactionsShared/transaction.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoresRouteModule,
    TransactionCommonModule
  ],
  declarations: [
    StoreComponent,
    CreateEditStoreComponent,
    GnrComponent,
    JobWorkComponent,
    StockRequestComponent,
    StockNoteComponent,
    StockRejectNoteComponent,
    DelieveryChallanComponent,
    ReturnableChallanComponent,
    PhysicalStockComponent
  ],
  providers : [ TransactionSerivices ]
})
export class StoresModule { }
