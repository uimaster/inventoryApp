import { WorkInstructionService } from "./work-instruction.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-work-instruction",
  templateUrl: "./work-instruction.component.html",
  styleUrls: ["./work-instruction.component.scss"]
})
export class WorkInstructionComponent implements OnInit {
  public workInstructionList = [];
  constructor(private workInstructionService: WorkInstructionService, private router: Router) {}

  ngOnInit() {
    this.getWorkInstructionList();
  }

  getItemDetails(id){
    localStorage.setItem('AssemblyWorkInstructionID', id);
    this.router.navigate(['production/workInstructionDetails']);
  }

  getWorkInstructionList() {
    this.workInstructionService.getWorkInstructionList().subscribe(res => {
      if (res.status === "200") {
        if (res.data.length > 0) {
          this.workInstructionList = res.data;
        }
      }
    });
  }
}
