import { WorkInstructionService } from "./work-instruction.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from '../../users/service/user.service';

@Component({
  selector: "app-work-instruction",
  templateUrl: "./work-instruction.component.html",
  styleUrls: ["./work-instruction.component.scss"]
})
export class WorkInstructionComponent implements OnInit {
  public workInstructionList = [];
  public userRightMenuData = {};
  constructor(private workInstructionService: WorkInstructionService, private router: Router, private userService: UsersService) {}

  ngOnInit() {
    // this.getWorkInstructionList();
    this.getUserMenuDetails();
  }

  getItemDetails(id){
    localStorage.setItem('AssemblyWorkInstructionID', id);
    this.router.navigate(['production/workInstructionDetails']);
    
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

  getWorkInstructionList(dates) {
    this.workInstructionService.getWorkInstructionList(dates).subscribe(res => {
      if (res.status === "200") {
        if (res.data.length > 0) {
          this.workInstructionList = res.data;
        }
      }
    });
  }
}
