import { Routes, RouterModule } from '@angular/router';
import {LedgerListComponent} from "./component/ledger-list.component";
import {LedgerComponent} from "./component/ledger.component";

export const routes: Routes = [
    { path: 'ledgers', component: LedgerListComponent
    },
    { path: 'ledger/:id', component: LedgerComponent
    }
];

export const LedgerRouter = RouterModule.forChild(routes);
