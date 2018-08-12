import { UnitComponent } from './unit/component/unit.component';
import { SharedLedgerService } from './ledger/services/shared-ledger.service';
import { LedgerService } from './ledger/services/ledger.service';
import { LedgerComponent } from './ledger/component/ledger.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LedgerModule } from './ledger/ledger.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MastersComponent } from './masters.component';
import { MastersRouteModule } from './masters.route.module';
import { SharedModule } from '../shared/shared.module';
import { StockModule } from './stock/stock.module';
import { StockGroupModule } from './stock-group/stock-group.module';
import { UnitModule } from './unit/unit.module';
import { LedgerListComponent } from './ledger/component/ledger-list.component';
import { StockDetailComponent } from './stock/stock-details/stock-detail.component';
import { StockItemComponent } from './stock/component/stock-item.component';
import { StockGroupComponent } from './stock-group/component/stock-group.component';
import { StockGroupListComponent } from './stock-group/component/stock-group-list.component';
import { UnitListComponent } from './unit/component/unit-list.component';
import { StockService } from './stock/services/stock.service';
import { StockGroupService } from './stock-group/services/stock-group.service';
import { UnitService } from './unit/services/unit.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // LedgerModule,
    MastersRouteModule,
    SharedModule,
    // StockModule,
    // StockGroupModule,
    // UnitModule
  ],
  declarations: [MastersComponent, LedgerComponent, LedgerListComponent, StockDetailComponent, StockItemComponent,
    StockGroupComponent, StockGroupListComponent, UnitComponent, UnitListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ LedgerService, SharedLedgerService, StockService, StockGroupService, UnitService]
})
export class MastersModule {}
