import { Component, OnInit } from "@angular/core";
import { UsersService } from "../service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-users-list",
  templateUrl: "./user.list.html",
  styleUrls: ["./user.list.scss"]
})
export class UsersListComponent implements OnInit {
  userList = [];
  showLoader = false;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.getUserList();
  }
  getUserList() {
    this.showLoader = true;
    this.userService.getUserList().subscribe(res => {
      this.showLoader = false;
      if (res && res.status === "200") {
        this.userList = res.data;
      }
    });
  }

  updateUser(id) {
    // alert('User Details is under progress.');
    this.router.navigate(["users/add/", id]);
  }
}