import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersListComponent } from "./components/user.list";
import { UsersComponent } from "./users.component";
import { CreateUsersComponent } from "./components/user.create.component";

export const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "",
        children: [
          { path: "", component: UsersListComponent },
          { path: "users", component: UsersListComponent },
          { path: "add/:id", component: CreateUsersComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRouteModule {}
