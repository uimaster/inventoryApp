import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanningService } from '../services/planning.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-planning-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FiltersComponent implements OnInit, OnDestroy {
  public dateValue1 = new Date();
  public dateValue2 = new Date();
  public fromDate = '';
  public toDate = '';
  public currentUrl = '';
  constructor(private planningService: PlanningService, private router: Router, private location: Location) {
    this.currentUrl = window.location.href;
  }

  ngOnDestroy() {
    if (window.location.href !== this.currentUrl) {
      localStorage.setItem('fromDate', '');
      localStorage.setItem('toDate', '');
    }
  }

  ngOnInit() {
    if (localStorage.getItem('fromDate') !== '') {
      this.dateValue1 = JSON.parse(localStorage.getItem('fromDate'));
    }

    if (localStorage.getItem('toDate') !== '') {
      this.dateValue2 = JSON.parse(localStorage.getItem('toDate'));
    }
  }

  convertDate(data) {
    const date = new Date(data);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let newDate = day + '/' + month + '/' + year;
    return newDate;
  }

  getFromDate(event) {
    const date = this.convertDate(event);
    localStorage.setItem('fromDate', JSON.stringify(date));
  }

  getToDate(event) {
    const date = this.convertDate(event);
    localStorage.setItem('toDate', JSON.stringify(date));
  }

  getTransactionList() {

    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; };

    let currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

}
