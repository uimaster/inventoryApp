import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Profile',
        icon: 'fa fa-fw fa-user',
      },
      {
        label: 'Membership',
        icon: 'fa fa-fw fa-id-card',
      },
      {
        label: 'Settings',
        icon: 'fa fa-fw fa-cog',
      },
      {
        label: 'Refer a Friend',
        icon: 'fa fa-fw fa-gift'
      },
      {
        label: 'Refer a Client',
        icon: 'fa fa-fw fa-briefcase'
      },
      {
        label: 'Get Support',
        icon: 'fa fa-fw fa-question-circle'
      },
      {
        label: 'Logout',
        icon: 'fa fa-fw fa-sign-out',
      }
    ];

  }

}
