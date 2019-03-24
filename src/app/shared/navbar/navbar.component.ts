import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users/service/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public userList: any[] = [];

  constructor(private router: Router, private usersService: UsersService) { }
  ngOnInit() {
    this.getUserDetails();
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUserDetails() {
    const userId = JSON.parse(localStorage.getItem('userID'));
    this.usersService.getUserDetails(userId).subscribe(res => {
      if (res.status === '200') {
        if (res && res.data !== null && res.data !== undefined) {
          this.userList = res.data[0].userRights;
        }
      }
    });
  }

}
