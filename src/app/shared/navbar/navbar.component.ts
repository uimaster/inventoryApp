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
        label: 'Dashboard',
        icon: 'fa fa-fw fa-user',
        url: '/dashboard'
      },
      {
        label: 'Stocks',
        icon: 'fa fa-fw fa-id-card',
        url: '/stocks'
      },
      {
        label: 'Unit',
        icon: 'fa fa-fw fa-cog',
        url: '/unit'
      },
      {
        label: 'Stock Group',
        icon: 'fa fa-fw fa-gift',
        url: '/stock-group'
      },
      {
        label: 'Ledger List',
        icon: 'fa fa-fw fa-briefcase',
        url: '/ledger-list'
      },
      // {
      //   label: 'Get Support',
      //   icon: 'fa fa-fw fa-question-circle'
      // },
      {
        label: 'Logout',
        icon: 'fa fa-fw fa-sign-out',
        url: '/logout'
      }
    ];

  }

}
