import { Component, OnInit } from "@angular/core";
import { UsersService } from "../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

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
    this.getUserDetails(this.userId);
    this.createUser();
  }

  getUserDetails(id) {
    this.userService.getUserDetails(id).subscribe(res => {
      if (res && res.status === "200") {
        this.userDetails = res.data;
        this.rightList = res.data[0].userRights;

        console.log('fff', this.userDetails);
        console.log('fff', this.rightList);
        if (this.userDetails.length > 0) {
          this.userForm.controls['name'].setValue(this.userDetails[0].name);
          this.userForm.controls['activeStatus'].setValue(this.userDetails[0].activeStatus);
          this.userForm.controls['userID'].setValue(this.userDetails[0].userID);
          this.userForm.controls['userTypeID'].setValue(this.userDetails[0].userTypeID);
          this.userForm.controls['userPassword'].setValue(this.userDetails[0].userPassword);
          this.userForm.controls['company_ID'].setValue(this.userDetails[0].company_ID);
          // this.userForm.controls['expiryDate'].setValue(this.convertToDateFormat(this.userDetails[0].expiryDate));

          if (this.rightList.length > 0) {
            const formArray = <FormArray>this.userForm.get('userRights');
            for ( let i = 0; i < this.rightList.length; i++) {
              // formArray.push(
              //   this.fb.group({
              //     userRightID: [this.rightList[i].userRightID],
              //     userRightMenuName: [this.rightList[i].userRightID],
              //     userRightCode: [this.rightList[i].userRightID],
              //     menuStatus: [this.rightList[i].userRightID],
              //     userRightTabModelList: this.fb.array({
              //       userRightID: [this.rightList[i].userRightTabModelList[i].userRightID],
              //       userRightParentID: [this.rightList[i].userRightTabModelList[i].userRightParentID],
              //       userRightTabName: [this.rightList[i].userRightTabModelList[i].userRightTabName],
              //       tabStatus: [this.rightList[i].userRightTabModelList[i].tabStatus],
              //       actionStatus: [this.rightList[i].userRightTabModelList[i].actionStatus],
              //       userRightCode: [this.rightList[i].userRightTabModelList[i].userRightCode],
              //       userRightActionModelList: this.fb.array({
              //         createStatus: [0],
              //         deleteStatus: [0],
              //         modifyStatus: [0],
              //         viewStatus: [0],
              //       })
              //     }),
              //   })
              // );
            }
          }




        }
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
      activeStatus: [''],
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
      menuStatus: [0],
      userRightTabModelList: this.fb.array([this.createUserRightTabList()]),
    });
  }

  createUserRightTabList() {
    return this.fb.group({
      userRightID: [0],
      userRightParentID: [0],
      userRightTabName: [''],
      tabStatus: [0],
      actionStatus: [0],
      userRightCode: [''],
      userRightActionModelList: this.fb.array([this.createRightControls()])
    });
  }

  createRightControls() {
    return this.fb.group({
      createStatus: [0],
      deleteStatus: [0],
      modifyStatus: [0],
      viewStatus: [0],
    });
  }

  // get createStatus() {
  //   return this.userForm.get(['userRights'], 0, ['userRightTabModelList'], 0, ['userRightActionModelList'], 0, ['createStatus']);
  // }

  saveUser(data) {
    console.log(data);
  }

  convertToDateFormat(Datestr) {
    debugger;
    // if (Datestr !== '') {
    //   var datedata = Datestr.split('-');
    //   var formatedDateString =
    //     datedata[0] + '-' + datedata[1] + '-' + datedata[2];
    //   return formatedDateString;
    // }

    let dDate = new Date(Datestr);
    let year = dDate.getFullYear();
    var month: any = dDate.getMonth() + 1;
    if(month < 10) {
      month = '0' + month;
    }
    var day: any = dDate.getDate();
    if(day < 10) {
      day = '0' + day;
    }
    let fDate = day + '-' + month + '-' + year;
    return fDate;
  }
}
