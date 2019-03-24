import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users/service/user.service";
import { map } from "rxjs/operator/map";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012"
  ];
  public barChartType = "bar";
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" }
  ];

  public lineChartData: Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];
  public lineChartType = "line";
  public pieChartType = "pie";

  // Pie
  public pieChartLabels = ["Download Sales", "In-Store Sales", "Mail Sales"];
  public pieChartData = [300, 500, 100];

  public lineChartDataLine: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
    { data: [18, 48, 77, 9, 100, 27, 40], label: "Series C" }
  ];
  public lineChartLabelsLine: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // dark grey
      backgroundColor: "rgba(77,83,96,0.2)",
      borderColor: "rgba(77,83,96,1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    },
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend = true;

  constructor() {}

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === "line" ? "bar" : "line";
    this.pieChartType = this.pieChartType === "doughnut" ? "pie" : "doughnut";
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

  ngOnInit() {
  }

}
