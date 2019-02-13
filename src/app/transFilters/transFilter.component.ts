import { Component, OnInit, OnDestroy, HostListener, Output, EventEmitter } from '@angular/core';
import { TransactionServices } from '../transactionsShared/transaction.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-filters',
  templateUrl: './transFilter.component.html',
  styleUrls: ['./transFilter.component.scss']
})

export class FiltersComponent implements OnInit {
  public dateValue1 = new Date();
  public dateValue2 = new Date();
  public today = new Date();
  public fromDate = '';
  public toDate = '';
  public currentUrl = '';
  @Output() filterDates = new EventEmitter();

  constructor(private transactionService: TransactionServices, private router: Router, private location: Location) {
    this.currentUrl = window.location.href;
  }

  ngOnInit() {
    this.setFilterDates();
  }

  convertDate(data) {
    var month;
    var day;
    const date = new Date(data);
    let year = date.getFullYear();
    month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let newDate = day + '/' + month + '/' + year;
    return newDate;
  }

  getFromDate(event) {
    if (event !== '') {
      this.fromDate = this.convertDate(event);
    }
  }

  getToDate(event) {
    if (event !== '') {
      this.toDate = this.convertDate(event);
    }
  }

  setFilterDates() {
    if (this.fromDate === '') {
      this.fromDate = this.convertDate(this.today);
    }
    if (this.toDate === '') {
      this.toDate = this.convertDate(this.today);
    }
    this.filterDates.emit([this.fromDate, this.toDate]);
  }

}
