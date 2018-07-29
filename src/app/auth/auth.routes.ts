import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login.component';

export const authRoutes: Routes = [{ path: 'login', component: LoginComponent }];

export const AuthRouter =  RouterModule.forChild(authRoutes);
