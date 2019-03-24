import { Component, OnInit } from "@angular/core";
import { UsersService } from "../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

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
  public expiryDateModel: Date = new Date();
  public userTabDetails: any[];
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
    this.activeRoute.params.subscribe(params => {
      this.userId = params.id;
    });
    this.getUserDetails(this.userId);
    this.createUser();
  }

  getUserTabDetails(userId, rightId) {
    this.userTabDetails = [];
    this.userService.getUserTabDetails(userId, rightId).subscribe(res => {
      if (res.status === "200") {
        if (res && res.data !== undefined && res.data !== null) {
          this.userTabDetails = res.data;
        }
      }
      console.log(res);
    });
  }

  getUserDetails(id) {
    this.userService.getUserDetails(id).subscribe(res => {
      if (res && res.status === "200") {
        this.userDetails = res.data;
        this.rightList = res.data[0].userRights;
        if (this.userDetails.length > 0) {
          this.userForm.controls["name"].setValue(this.userDetails[0].name);
          this.userForm.controls["activeStatus"].setValue(
            this.userDetails[0].activeStatus
          );
          this.userForm.controls["userID"].setValue(this.userDetails[0].userID);
          this.userForm.controls["userTypeID"].setValue(
            this.userDetails[0].userTypeID
          );
          this.userForm.controls["userPassword"].setValue(
            this.userDetails[0].userPassword
          );
          this.userForm.controls["company_ID"].setValue(
            this.userDetails[0].company_ID
          );
          // this.userForm.controls['expiryDate'].setValue(this.convertToDateFormat(this.userDetails[0].expiryDate));

          if (this.rightList.length > 0) {
            const formArray = <FormArray>this.userForm.get("userRights");
            const tabFormArray = <FormArray>this.userForm.get("userRights[0].UserRightTabModelList");
            console.log('sdfsdf', tabFormArray.value);
            // if (formArray.length > 0) {
            //   formArray.removeAt(0);
            // }
            // for (let i = 0; i < this.rightList.length; i++) {
            //   this.getUserTabDetails( this.userId, this.rightList[i].userRightID);

            //   formArray.push(
            //     this.fb.group({
            //       userRightID: [this.rightList[i].userRightID],
            //       userRightMenuName: [this.rightList[i].userRightMenuName],
            //       userRightCode: [this.rightList[i].userRightCode],
            //       menuStatus: [this.rightList[i].menuStatus]
            //     })
            //   );

            //   tabFormArray.push(
            //     this.fb.group({
            //       userRightID: [this.userTabDetails[0].userRightID],
            //       TabStatus: [this.userTabDetails[0].TabStatus],
            //     })
            //   );
            // }
          }
        }
      }
    });
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

  createUser() {
    this.userForm = this.fb.group({
      name: [""],
      expiryDate: [""],
      activeStatus: [""],
      userID: [0],
      userTypeID: [0],
      userName: [""],
      userPassword: [""],
      company_ID: [0],
      userRights: this.fb.array([this.createUserRights()])
    });
  }

  createUserRights() {
    return this.fb.group({
      userRightID: [0],
      userRightMenuName: [""],
      userRightCode: [""],
      menuStatus: [""],
      UserRightTabModelList: this.fb.array([this.createTabList()])
    });
  }

  createTabList() {
    return this.fb.group({
      userRightID: [0],
      TabStatus: [""],
      UserRightActionModelList: this.fb.array([this.createTabActionList()])
    });
  }

  createTabActionList() {
    return this.fb.group({
      CreateStatus: [""],
      ModifyStatus: [""],
      ViewStatus: [""],
      DeleteStatus: [""]
    });
  }

  saveUser(data) {
    console.log(data);
  }

  convertToDateFormat(Datestr) {
    // if (Datestr !== '') {
    //   var datedata = Datestr.split('-');
    //   var formatedDateString =
    //     datedata[0] + '-' + datedata[1] + '-' + datedata[2];
    //   return formatedDateString;
    // }

    let dDate = new Date(Datestr);
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
}
