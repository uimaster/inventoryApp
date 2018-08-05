import { Routes, RouterModule } from '@angular/router';
import {LedgerListComponent} from "./component/ledger-list.component";

export const routes: Routes = [{ path: 'ledgers', component: LedgerListComponent
}];

export const LedgerRouter = RouterModule.forChild(routes);
