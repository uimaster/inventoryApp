import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LedgerListComponent} from "./component/ledger-list.component";
import {LedgerRouter} from "./ledger.routes";
import {LedgerService} from "./services/ledger.service";

@NgModule({
    declarations: [ LedgerListComponent ],
    imports: [
        LedgerRouter,
        CommonModule
    ],
    providers: [ LedgerService ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LedgerModule{}

