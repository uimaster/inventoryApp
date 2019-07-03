import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

import { UsersService } from "../service/user.service";

@Component({
  selector: "app-create-users",
  templateUrl: "./user.create.component.html",
  styleUrls: ["./user.create.component.scss"]
})
export class CreateUsersComponent implements OnInit, AfterViewInit {
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
  public dyData;
  constructor(
    private userService: UsersService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.activeRoute.params.subscribe(params => {
        this.userId = params.id;
        this.getUserDetails(this.userId);
        this.changeDetector.detectChanges();
      });
    }, 500);
  }

  ngOnInit() {
    this.createUserForm();
    this.showRightsAccordion = false;
    this.statusList = [
      { label: "Active", value: 1 },
      { label: "Inactive", value: 0 }
    ];
    this.selectedStatus = this.statusList[0].value;
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
      userPassword: [""],
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
        // this.getUserDetails();
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
        this.dyData = res.data[0].userRights;
        console.log(this.dyData);
        if (res.data[0].userRights.length > 0) {
          this.showRightsAccordion = true;
          let data = res.data[0].userRights;
          this.userForm.controls["name"].setValue(res.data[0].name);
          // this.userForm.controls['expiryDate'].setValue(res.data[0].expiryDate);
          this.userForm.controls["activeStatus"].setValue(
            res.data[0].activeStatus
          );
          this.userForm.controls["userID"].setValue(res.data[0].userID);
          this.userForm.controls["userTypeID"].setValue(res.data[0].userTypeID);
          this.userForm.controls["userName"].setValue(res.data[0].userName);
          this.userForm.controls["userPassword"].setValue(
            res.data[0].userPassword
          );
          this.userForm.controls["company_ID"].setValue(res.data[0].company_ID);

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
}
