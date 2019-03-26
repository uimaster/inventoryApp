import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users/service/user.service';
import { OverlayPanel } from 'primeng/primeng';
import { NotificationService } from './navbar.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public userDetails: any[] = [];

  constructor(private router: Router, private userService: UsersService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.getUserDetails();
    this.getNotification();
  }

  getUserDetails() {
    const userId = localStorage.getItem("userID");
    this.userService.getUserDetails(userId).subscribe(res => {
      if (res.status === "200") {
        if (res && res.data[0].userRights.length > 0) {
          this.userDetails = res.data[0].userRights;
        }
      }
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
  showNotification(event, overlaypanel: OverlayPanel) {
    overlaypanel.toggle(event);
  }

  getNotification() {
    this.notificationService.getNotification().subscribe( res => {
      console.log(res);
    })
  }

}
