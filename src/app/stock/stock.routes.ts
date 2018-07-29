import { Routes, RouterModule } from '@angular/router';

import { StockItemComponent } from './component/stock-item.component';

export const routes: Routes = [{ path: 'stocks', component: StockItemComponent}];

export const StockRouter = RouterModule.forChild(routes);
