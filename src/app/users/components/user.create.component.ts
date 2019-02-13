import { Component, OnInit } from "@angular/core";
import { UsersService } from "../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-create-users",
  templateUrl: "./user.create.component.html",
  styleUrls: ["./user.create.component.scss"]
})
export class CreateUsersComponent implements OnInit {
  public userDetails = [];
  public tabList = [];
  public rightList = [];
  public userId = 0;
  public userForm: FormGroup;
  public expiryDateModel: Date = new Date();
  // public createStatus = false;
  // public deleteStatus = false;
  // public modifyStatus = false;
  // public viewStatus = false;
  constructor(
    private userService: UsersService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.userId = params.id;
    });
    // this.getUserDetails(this.userId);
    // this.createUser();
  }

  getUserDetails(id) {
    this.userService.getUserDetails(id).subscribe(res => {
      if (res && res.status === "200") {
        this.userDetails = res.data;
        this.rightList = res.data[0].userRights;
      }
    });
  }

  get name() {
    return this.userForm.get('name');
  }
  get expiryDate() {
    return this.userForm.get('expiryDate');
  }
  get activeStatus() {
    return this.userForm.get('activeStatus');
  }

  createUser() {
    this.userForm = this.fb.group({
      name: [''],
      expiryDate: [''],
      activeStatus: [false],
      userID: [0],
      userTypeID: [0],
      userName: [''],
      userPassword: [''],
      company_ID: [0],
      userRights: this.fb.array([this.createUserRights()]),
    });
  }

  createUserRights() {
    return this.fb.group({
      userRightID: [0],
      userRightMenuName: [''],
      userRightCode: [''],
      menuStatus: [false],
      userRightTabModelList: this.fb.array([this.createUserRightTabList()]),
    });
  }

  createUserRightTabList() {
    return this.fb.group({
      userRightID: [0],
      userRightParentID: [0],
      userRightTabName: [''],
      tabStatus: [false],
      actionStatus: [false],
      userRightCode: [''],
      userRightActionModelList: this.fb.array([this.createRightControls()])
    });
  }

  createRightControls() {
    return this.fb.group({
      createStatus: [false],
      deleteStatus: [false],
      modifyStatus: [false],
      viewStatus: [false],
    });
  }

  // get createStatus() {
  //   return this.userForm.get(['userRights'], 0, ['userRightTabModelList'], 0, ['userRightActionModelList'], 0, ['createStatus']);
  // }

  saveUser(data) {
    console.log(data);
  }
}
