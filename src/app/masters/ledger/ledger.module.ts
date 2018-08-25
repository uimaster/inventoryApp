import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LedgerListComponent} from './component/ledger-list.component';
import {LedgerService} from './services/ledger.service';
import {LedgerComponent} from './component/ledger.component';
import {SharedLedgerService} from './services/shared-ledger.service';
import {ReactiveFormsModule} from '@angular/forms';
import { PrimeNGModule } from '../../app.primeNg.module';
@NgModule({
    declarations: [ LedgerListComponent , LedgerComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      PrimeNGModule
    ],
    providers: [ LedgerService, SharedLedgerService ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LedgerModule {}

