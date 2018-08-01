import { Routes, RouterModule } from '@angular/router';

import { StockItemComponent } from './component/stock-item.component';
import {StockDetailComponent} from './component/stock-detail.component';

export const routes: Routes = [{ path: 'stocks', component: StockItemComponent,
  children: [{
    path: ':id',
    component: StockDetailComponent
  }]
}];

export const StockRouter = RouterModule.forChild(routes);
