import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './services/token.interceptor';
import { LoginComponent } from './component/login.component';
import { LoginRouteModule } from './auth.route.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRouteModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
