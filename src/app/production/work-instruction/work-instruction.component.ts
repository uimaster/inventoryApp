import { WorkInstructionService } from "./work-instruction.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-work-instruction",
  templateUrl: "./work-instruction.component.html",
  styleUrls: ["./work-instruction.component.scss"]
})
export class WorkInstructionComponent implements OnInit {
  public workInstructionList = [];
  constructor(private workInstructionService: WorkInstructionService) {}

  ngOnInit() {
    this.getWorkInstructionList();
  }

  getWorkInstructionList() {
    this.workInstructionService.getWorkInstructionList().subscribe(res => {
      if (res.status === "200") {
        if (res.data.length > 0) {
          this.workInstructionList = res.data;
        }
      }
      console.log(this.workInstructionList);
    });
  }
}
