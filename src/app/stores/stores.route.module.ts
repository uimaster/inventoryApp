import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { GnrComponent } from './gnr/gnr.component';
import { JobWorkComponent } from './job-work/job-work.component';
import { StockRequestComponent } from './stock-request/stock-request.component';
import { StockNoteComponent } from './stock-note/stock-note.component';
import { StockRejectNoteComponent } from './stock-reject-note/stock-reject-note.component';
import { DelieveryChallanComponent } from './delievery-challan/delievery-challan.component';
import { ReturnableChallanComponent } from './returnable-challan/returnable-challan.component';
import { PhysicalStockComponent } from './physical-stock/physical-stock.component';
import { CreateEditStoreComponent } from './create/create.component';
import { ReturnableGnrComponent } from './returnable-gnr/returnable-gnr.component';

export const routes: Routes = [
  { path: '',  component: StoreComponent,
    children: [
      {
        path: '', children: [
          { path: 'grn', component: GnrComponent },
          { path: 'addEditStore', component: CreateEditStoreComponent },
          { path: 'jobwork', component: JobWorkComponent },
          { path: 'stockRequest', component: StockRequestComponent },
          { path: 'stockNote', component: StockNoteComponent },
          { path: 'stockRejectNote', component: StockRejectNoteComponent },
          { path: 'delieveryChallan', component: DelieveryChallanComponent },
          { path: 'rerurnableChallan', component: ReturnableChallanComponent },
          { path: 'physicalStock', component: PhysicalStockComponent },
          { path: 'returnable-grn', component: ReturnableGnrComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class StoresRouteModule { }
