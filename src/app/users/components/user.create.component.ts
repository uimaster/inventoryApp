import {Component, OnInit} from "@angular/core";
import {UsersService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";

@Component({selector: "app-create-users", templateUrl: "./user.create.component.html", styleUrls: ["./user.create.component.scss"]})
export class CreateUsersComponent implements OnInit {
    public userDetails = [];
    public rightList = [];
    public userId = 0;
    public userForm : FormGroup;
    public expiryDateModel : Date = new Date();
    public userTabDetails : any[];
    public userMasterData : any[] = [];
    checked : boolean;
    // public createStatus = false;
    // public deleteStatus = false;
    // public modifyStatus = false;
    // public viewStatus = false;
    constructor(private userService : UsersService, private activeRoute : ActivatedRoute, private fb : FormBuilder) {}

    ngOnInit() {
        this.getUserMaster();
        this.activeRoute.params.subscribe(params => {
            this.userId = params.id;
        });
        // this.getUserDetails(this.userId);
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

    /*getUserDetails(id) {
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
            debugger;
            const formArray = <FormArray>this.userForm.get("userRights");
            var tabFormArray;
            for (let i = 0; i < this.rightList.length; i++) {
              // this.getUserTabDetails(this.userId, this.rightList[i].userRightID);

              formArray.push(
                this.fb.group({
                  userRightID: [this.rightList[i].userRightID],
                  userRightMenuName: [this.rightList[i].userRightMenuName],
                  userRightCode: [this.rightList[i].userRightCode],
                  menuStatus: [this.rightList[i].menuStatus]
                })
              );
              tabFormArray = <FormArray>formArray.controls[i].get('UserRightTabModelList');

              this.userTabDetails = [];
              this.userService.getUserTabDetails(this.userId, this.rightList[i].userRightID).subscribe(val => {
                if (val.status === "200") {
                  this.userTabDetails = val.data;
                }
              });
              tabFormArray.push(
                this.fb.group({
                  userRightID: [this.userTabDetails[0].userRightID],
                  TabStatus: [this.userTabDetails[0].TabStatus],
                })
              );
            }

            // if (formArray.length > 0) {
            //   formArray.removeAt(0);
            // }
          }
        }
      }
    });
  }*/

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
            userRights: this.fb.array(
                [this.createUserRights()]
            )
        });
    }

    createUserRights() {
        return this.fb.group({
            userRightID: [0],
            menuStatus: [true],
            userRightCode: [''],
            userRightMenuName: [''],
            userRightTabModelList: this.fb.array(
                [this.createTabList()]
            )
        });
    }

    createTabList() {
        return this.fb.group({
            userRightID: [0],
            tabStatus: [true],
            actionStatus: [true],
            userRightCode: [''],
            userRightParentID: [''],
            userRightTabName: [''],
            userRightActionModelList: this.fb.array(
                [this.createTabActionList()]
            )
        });
    }

    createTabActionList() {
        return this.fb.group({createStatus: [true], modifyStatus: [true], viewStatus: [true], deleteStatus: [true]});
    }

    getUserMaster() {
        this.userService.getUserMaster().subscribe(res => {
            if (res.status === '200') {
                this.userMasterData = res.data;
                const firstArray = <FormArray>(this.userForm.get("userRights"));
                debugger;
                if (this.userMasterData !== undefined) {
                    this.userForm.controls["name"].setValue(this.userMasterData[0].name);
                    this.userForm.controls["activeStatus"].setValue(this.userMasterData[0].activeStatus);
                    this.userForm.controls["company_ID"].setValue(this.userMasterData[0].company_ID);
                    this.userForm.controls["expiryDate"].setValue(this.userMasterData[0].expiryDate);
                    this.userForm.controls["userID"].setValue(this.userMasterData[0].userID);
                    this.userForm.controls["userName"].setValue(this.userMasterData[0].userName);
                    this.userForm.controls["userPassword"].setValue(this.userMasterData[0].userPassword);
                    this.userForm.controls["userTypeID"].setValue(this.userMasterData[0].userTypeID);
                    // this.userForm.controls["userRights"].setValue(this.userMasterData[0].userRights);
                    // this.userForm.controls["userRights"].setValue(firstArray);

                    const userRights = this.userMasterData[0].userRights;
                    var thirdArray;
                    var secondArray;

                    if (userRights && userRights.length > 0) {

                        for (var i = 0; i < userRights.length; i++) {


                            firstArray.push(this.fb.group({
                                menuStatus: [userRights[i].menuStatus],
                                transactionID: [userRights[i].transactionID],
                                userRightCode: [userRights[i].userRightCode],
                                userRightID: [userRights[i].userRightID],
                                userRightMenuName: [userRights[i].userRightMenuName],
                                userRightTabModelList: [secondArray]
                            }));

                            const userRightTabModelList = this.userMasterData[0].userRights[i].userRightTabModelList;
                            secondArray = <FormArray>(firstArray.controls[i].get("userRightTabModelList"));
                            for (var j = 0; j < userRightTabModelList.length; j++) {
                                secondArray.push(this.fb.group({
                                    actionStatus: [userRightTabModelList[j].actionStatus],
                                    tabStatus: [userRightTabModelList[j].tabStatus],
                                    userRightCode: [userRightTabModelList[j].userRightCode],
                                    userRightID: [userRightTabModelList[j].userRightID],
                                    userRightParentID: [userRightTabModelList[j].userRightParentID],
                                    userRightTabName: [userRightTabModelList[j].userRightTabName],
                                    userRightActionModelList: [thirdArray]
                                }));

                                const userRightActionModelList = this.userMasterData[0].userRights[i].userRightTabModelList[j].userRightActionModelList;
                                thirdArray = <FormArray>(secondArray.controls[i].get("userRightActionModelList"));
                                for (var k = 0; k < userRightActionModelList.length; k++) {
                                    thirdArray.push(this.fb.group({
                                        createStatus: [userRightActionModelList[k].createStatus],
                                        deleteStatus: [userRightActionModelList[k].deleteStatus],
                                        modifyStatus: [userRightActionModelList[k].modifyStatus],
                                        viewStatus: [userRightActionModelList[k].viewStatus]
                                    }));
                                    console.log(firstArray);
                                }
                            }

                        }


                        // if (firstArray.length > 0) {
                        //     while (firstArray.length !== 0) {
                        //         firstArray.removeAt(0);
                        //     }
                        // }
                    }

                }
            }
        });
    }

    saveUser(data) {
        console.log(JSON.stringify(data));
    }

    convertToDateFormat(Datestr) {
        // if (Datestr !== '') {
        // var datedata = Datestr.split('-');
        // var formatedDateString =
        //     datedata[0] + '-' + datedata[1] + '-' + datedata[2];
        // return formatedDateString;
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
