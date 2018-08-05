import { Routes, RouterModule } from '@angular/router';
import {StockGroupListComponent} from "./component/stock-group-list.component";

export const routes: Routes = [{ path: 'stock-groups', component: StockGroupListComponent
}];

export const StockGroupRouter = RouterModule.forChild(routes);
