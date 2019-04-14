import { Component, OnInit } from "@angular/core";
import { WorkInstructionService } from '../work-instruction.service';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  public workInstructionDetails = [];
  constructor(private workInstructionService: WorkInstructionService) {}

  ngOnInit() {
    this.getWorkInstructionDetails();
  }

  getWorkInstructionDetails() {
    this.workInstructionService.getWorkInstructionDetails().subscribe(res => {
      if (res.status === "200") {
        if (res.data.length > 0) {
          this.workInstructionDetails = res.data;
        }
      }
    });
  }
}
