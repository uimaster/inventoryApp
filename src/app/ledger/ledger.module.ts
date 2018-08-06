import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LedgerListComponent} from "./component/ledger-list.component";
import {LedgerRouter} from "./ledger.routes";
import {LedgerService} from "./services/ledger.service";
import {LedgerComponent} from "./component/ledger.component";
import {SharedLedgerService} from "./services/shared-ledger.service";

@NgModule({
    declarations: [ LedgerListComponent , LedgerComponent],
    imports: [
        LedgerRouter,
        CommonModule
    ],
    providers: [ LedgerService, SharedLedgerService ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LedgerModule{}

