import { Routes, RouterModule } from '@angular/router';
import {UnitListComponent} from './component/unit-list.component';

export const routes: Routes = [{ path: 'unit', component: UnitListComponent
}];

export const UnitRouter = RouterModule.forChild(routes);
