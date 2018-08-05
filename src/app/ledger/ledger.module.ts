import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedgerListComponent } from './component/ledger-list.component';
import { LedgerRouteModule } from './ledger.route.module';
import { LedgerService } from './services/ledger.service';

@NgModule({
    declarations: [ LedgerListComponent ],
    imports: [
      LedgerRouteModule,
      CommonModule
    ],
    providers: [ LedgerService ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LedgerModule {}

