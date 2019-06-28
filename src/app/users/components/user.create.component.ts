import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

import { UsersService } from "../service/user.service";

@Component({
  selector: "app-create-users",
  templateUrl: "./user.create.component.html",
  styleUrls: ["./user.create.component.scss"]
})
export class CreateUsersComponent implements OnInit {
  public userDetails = [];
  public rightList = [];
  public userId = 0;
  public userForm: FormGroup;
  public userTabDetails: any[];
  public userMasterData: any[] = [];
  public statusList = [];
  public selectedStatus: any;
  public checked: boolean;
  public createModel = false;
  public deleteModel = false;
  public editModel = false;
  public readModel = false;
  public showRightsAccordion: boolean;
  constructor(
    private userService: UsersService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.showRightsAccordion = false;
    this.statusList = [
      { label: "Active", value: 1 },
      { label: "Inactive", value: 0 }
    ];
    this.selectedStatus = this.statusList[0].value;
    // this.getUserMaster();
    this.createUserForm();

    this.activeRoute.params.subscribe(params => {
      this.userId = params.id;
    });
    if (this.userId > 0) {
      this.getUserDetails(this.userId);
    }
  }

  get name() {
    return this.userForm.get("name");
  }
  get expiryDate() {
    return this.userForm.get("expiryDate");
  }
  get activeStatus() {
    return this.userForm.get("activeStatus");
  }

  get menuStatus() {
    return this.userForm.get("menuStatus");
  }

  get TabStatus() {
    return this.userForm.get("TabStatus");
  }

  createUserForm() {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      expiryDate: ["", Validators.required],
      activeStatus: ["", Validators.required],
      userID: [0],
      userTypeID: [0],
      userName: [""],
      userPassword: ["", Validators.required],
      company_ID: [0],
      // userRights: []
      userRights: this.fb.array([this.createUserRights()])
    });
  }

  createUserRights() {
    return this.fb.group({
      userRightID: [0],
      menuStatus: [true],
      userRightCode: [""],
      userRightMenuName: [""],
      userRightTabModelList: this.fb.array([this.createTabList()])
    });
  }

  createTabList() {
    return this.fb.group({
      userRightID: [0],
      tabStatus: [true],
      actionStatus: [true],
      userRightCode: [""],
      userRightParentID: [""],
      userRightTabName: [""],
      userRightActionModelList: this.fb.array([this.createTabActionList()])
    });
  }

  createTabActionList() {
    return this.fb.group({
      createStatus: [true],
      modifyStatus: [true],
      viewStatus: [true],
      deleteStatus: [true]
    });
  }

  createUser(data) {
    this.userService.createUser(data).subscribe(res => {
      if (res.status === "200") {
        alert("User Created Successfully, Please update below listed rights.");
        localStorage.setItem("createdUserId", res.data[0].userID);
        this.getUserDetails();
      }
    });
  }

  getUserDetails(user?) {
    let userId = 0;
    if (user && user > 0) {
      userId = user;
    } else {
      userId = JSON.parse(localStorage.getItem("createdUserId"));
    }
    this.userService.getUserDetails(userId).subscribe(res => {
      if (res.status === "200") {
        if (res.data[0].userRights.length > 0) {
          this.showRightsAccordion = true;
          let data = res.data[0].userRights;
          const userRightsArray = <FormArray>this.userForm.get("userRights");

          for (var i = 0; i < res.data[0].userRights.length; i++) {
            userRightsArray.push(
              this.fb.group({
                userRightID: [data[i].userRightMenuID],
                menuStatus: [data[i].userRightMenuStatus || false],
                userRightCode: [data[i].userRightMenuCode],
                userRightMenuName: [data[i].userRightMenuName],
                userRightTabModelList: this.fb.array([
                  this.getUserMenuDetails(
                    res.data[0].userRights[i].userRightMenuID,
                    userRightsArray,
                    i
                  )
                ])
              })
            );
          }

          if (userRightsArray.length > 0) {
            userRightsArray.removeAt(0);
          }
        }
      }
    });
  }

  getUserMenuDetails(userMenuId, parentFormArray, index) {
    let userId = localStorage.getItem("createdUserId");
    this.userService.getUserMenuDetails(userId, userMenuId).subscribe(res => {
      if (res.status === "200") {
        let data = res.data[0].userRightTabModelList;
        const userRightsTabArray = parentFormArray.controls[index].get(
          "userRightTabModelList"
        );

        for (var i = 0; i < data.length; i++) {
          userRightsTabArray.push(
            this.fb.group({
              userRightID: [data[i].userRightTabID],
              tabStatus: [data[i].userRightTabStatus],
              actionStatus: [],
              userRightCode: [data[i].userRightTabCode],
              userRightParentID: [data[i].userRightTabParentID],
              userRightTabName: [data[i].userRightTabName],
              userRightActionModelList: this.fb.array([
                this.fb.group({
                  createStatus: [data[i].createStatus],
                  modifyStatus: [data[i].modifyStatus],
                  viewStatus: [data[i].viewStatus],
                  deleteStatus: [data[i].deleteStatus]
                })
              ])
            })
          );
        }

        if (userRightsTabArray.length > 0) {
          userRightsTabArray.removeAt(0);
        }
      }
    });
  }

  saveUser(formData) {
    console.log(JSON.stringify(formData));
  }
}
