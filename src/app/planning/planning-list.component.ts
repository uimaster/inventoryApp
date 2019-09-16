import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { Subscription } from "rxjs";
import { PlanningService } from "./services/planning.service";
import { DatePipe } from "@angular/common";
import { UsersService } from '../users/service/user.service';
@Component({
  selector: "app-planning-list",
  templateUrl: "./planning-list.component.html",
  styleUrls: ["./planning.component.scss"]
})
export class PlanningListComponent implements OnInit, OnDestroy {
  public type: any;
  public planningList: any;
  public listData: any;
  public showLoader = false;
  public disablFmBtn = false;
  public disablRmBtn = false;
  public planningListDataSubscription: Subscription;
  public userRightMenuData = {};

  constructor(
    private _planningService: PlanningService,
    private router: Router,
    private _route: ActivatedRoute,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.showLoader = true;
    this._route.params.subscribe(params => {
      this.type = params.type;
      if (this.type === "fg") {
        this.getList("getFGList");
      } else if (this.type === "rmq") {
        this.getList("getRMQList");
      }
    });
    this.getUserMenuDetails();
  }

  getUserMenuDetails() {
    let userID = localStorage.getItem('userID');
    let userRightMenuID = localStorage.getItem('userRightMenuID');
    this.userService.getUserMenuDetails(userID, userRightMenuID).subscribe( val => {
      if (val.status === '200') {
        this.userRightMenuData = val.data[0].userRightTabModelList;
      }
    });
  }

  generatePo(planId) {
    this._planningService.generatePo(planId).subscribe((res: any) => {
      if (res.status === "200") {
        this.disablFmBtn = true;
      } else {
        this.disablFmBtn = false;
      }
    });
  }
  generateRm(Rqmid) {
    this._planningService.generateRm(Rqmid).subscribe((res: any) => {
      if (res.status === "200") {
        this.disablRmBtn = true;
      } else {
        this.disablRmBtn = false;
      }
    });
  }

  getList(fName) {
    // this.showLoader = true;
    this.planningList = [];
    this.listData = [];

    var date = new Date();
    var fromDate = "";
    var toDate = "";
    if (localStorage.getItem("fromDate") !== "") {
      fromDate = JSON.parse(localStorage.getItem("fromDate"));
    } else {
      fromDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth(), 1),
        "dd/MM/yyyy"
      );
    }
    if (localStorage.getItem("toDate") !== "") {
      toDate = JSON.parse(localStorage.getItem("toDate"));
    } else {
      toDate = this.datePipe.transform(
        new Date(date.getFullYear(), date.getMonth() + 1, 0),
        "dd/MM/yyyy"
      );
    }

    this.planningListDataSubscription = this._planningService[fName](
      fromDate,
      toDate
    ).subscribe(
      result => {
        // this.showLoader = false;
        if (result && result.status === "200") {
          this.planningList = result.data;
          this.listData = result.data;
        }
        this.showLoader = false;
      },
      error => {
        // this.showLoader = false;
      }
    );
  }

  set(type, planID) {
    this.router.navigate(["/planning/" + type, planID]);
  }

  add(type) {
    this.router.navigate(["/planning/add/" + type]);
  }

  ngOnDestroy() {
    if (this.planningListDataSubscription)
      this.planningListDataSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.planningList = this.listData.filter(row => {
      for (var key in row) {
        if (row.hasOwnProperty(key)) {
          if (
            row[key]
              .toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          ) {
            return true;
          }
          // console.log(key + " -> " + row[key]);
        }
      }
    });
  }
}
