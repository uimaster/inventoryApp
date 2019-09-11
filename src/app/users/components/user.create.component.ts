import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

import { UsersService } from "../service/user.service";
import { NotificationsService } from "../../notifications/notifications.service";

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
  public dyData;
  showLoader = false;
  date1 = new Date();

  constructor(
    private userService: UsersService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private notificationsService: NotificationsService
  ) {
    this.activeRoute.params.subscribe(params => {
      this.userId = params.id;
      // console.log('poarams',params);
      // return false;
      // this.createUserForm();
      this.showRightsAccordion = false;
      this.statusList = [
        { label: "Active", value: 1 },
        { label: "Inactive", value: 0 }
      ];
      this.selectedStatus = this.statusList[0].value;
      // if(this.userId > 0)
      this.getUserDetails(this.userId);
      // this.changeDetector.detectChanges();
    });
  }

  // ngAfterViewInit() {
  // setTimeout(() => {
  //   this.activeRoute.params.subscribe(params => {
  //     this.userId = params.id;
  //     //console.log('poarams',params);
  //     //return false;
  //     this.getUserDetails(this.userId);
  //     this.changeDetector.detectChanges();
  //   });
  // }, 500);
  // }

  ngOnInit() {
    this.createUserForm();
    // this.showRightsAccordion = false;
    // this.statusList = [
    //   { label: "Active", value: 1 },
    //   { label: "Inactive", value: 0 }
    // ];
    // this.selectedStatus = this.statusList[0].value;
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
    // data.userRights.userID = data.userID;
    let nData = data;
    nData.userRights.forEach(row => {
      // console.log(row);
      row.userID = data.userID;
      row.userRightMenuID = row.userRightID;
      row.userRightMenuCode = row.userRightCode;
      row.userRightMenuStatus = row.menuStatus;
      row.userRightTabModelList.forEach(row1 => {
        row1.userRightTabID = row1.userRightID;
        row1.userRightTabParentID = row1.userRightParentID;
        row1.userRightTabStatus = row1.tabStatus;
        row1.userRightTabCode = row1.userRightCode;
        row1.createStatus = row1.userRightActionModelList[0].createStatus;
        row1.modifyStatus = row1.userRightActionModelList[0].modifyStatus;
        row1.viewStatus = row1.userRightActionModelList[0].viewStatus;
        row1.deleteStatus = row1.userRightActionModelList[0].deleteStatus;
      });
    });
    // console.log(nData);
    // console.log(data);
    // return false;
    // for (var i = 0; i < nData.userRights.length; i++) {
    //   this.userService.createUserRights(nData.userRights[i]).subscribe(res1 => {
    //     console.log('res1',res1);
    //   });
    // }
    // return false;
    // console.log(nData);
    // console.log(data);
    //return false;
    this.showLoader = true;
    this.userService.createUser(data).subscribe(res => {
      if (res.status === "200") {
        //localStorage.setItem("createdUserId", res.data[0].userID);
        for (var i = 0; i < nData.userRights.length; i++) {
          this.showLoader = true;
          this.userService
            .createUserRights(nData.userRights[i])
            .subscribe(res1 => {
              // console.log('res1',res1);
              this.showLoader = false;
              if (res1.status === "200") {
              } else {
                this.notificationsService.notify(
                  "error",
                  "Error",
                  "Updatation/creation failed."
                );
              }

              //   this.notificationsService.notify('success','Success','User rights Updated/created successfully.');
              // else
              //   this.notificationsService.notify('error','Error','Updatation/creation failed.');
            });
        }

        this.notificationsService.notify(
          "success",
          "Success",
          "User Updated/created successfully."
        );
        setTimeout(() => {
          this.router.navigate(["/users"]);
        }, 3000);
        // alert("User Created Successfully, Please update below listed rights.");
        // this.getUserDetails();
      } else {
        this.notificationsService.notify(
          "error",
          "Error",
          "Updatation/creation failed."
        );
      }
      this.showLoader = false;
    });
  }

  getUserDetails(userId) {
    this.showLoader = true;
    this.userService.getUserDetails(userId).subscribe(res => {
      if (res.status === "200") {
        this.showLoader = false;
        this.dyData = res.data[0].userRights;
        if (res.data[0].userRights.length > 0) {
          this.showRightsAccordion = true;
          let data = res.data[0].userRights;
          this.userForm.controls["name"].setValue(res.data[0].name);
          if (this.userId > 0) {
            this.userForm.controls["expiryDate"].setValue(
              new Date(res.data[0].expiryDate)
            );
          } else {
            var parts = res.data[0].expiryDate.split("/");
            let expiryDate = new Date(parts[2], parts[1] - 1, parts[0]);
            this.userForm.controls["expiryDate"].setValue(expiryDate);
          }

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
    this.showLoader = true;
    this.userService
      .getUserMenuDetails(this.userId, userMenuId)
      .subscribe(res => {
        if (res.status === "200") {
          this.showLoader = false;
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
          //this.changeDetector.detectChanges();
        }
      });
  }

  convertToDateFormat(Datestr) {
    let dDate = new Date(
      Datestr.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    );
    let year = dDate.getFullYear();
    var month: any = dDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day: any = dDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let fDate = day + "-" + month + "-" + year;
    return fDate;
  }

  convertDateyymmdd(cDate) {
    if (cDate != "") {
      var datedata = cDate.split("-");
      var formatedDateString =
        datedata[2] + "-" + datedata[1] + "-" + datedata[0];
      //console.log(formatedDateString);
      return formatedDateString;
    }
  }
}
