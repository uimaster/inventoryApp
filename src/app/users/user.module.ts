import { PrimeNGModule } from './../app.primeNg.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersListComponent } from './components/user.list';
import { CreateUsersComponent } from "./components/user.create.component";
import { UsersService } from "./service/user.service";
import { UsersRouteModule } from './users.route.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, UsersRouteModule, PrimeNGModule, SharedModule, ReactiveFormsModule, FormsModule],
  declarations: [UsersListComponent, CreateUsersComponent, UsersComponent],
  providers: [UsersService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {}
