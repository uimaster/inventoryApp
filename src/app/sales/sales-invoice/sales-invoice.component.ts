import { Component, OnInit } from "@angular/core";
import { TransactionServices } from "../../transactionsShared/transaction.service";
import { Router } from "@angular/router";
import { BASEURL } from "../../../utils/app.urls";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesService } from "../sales.service";
import { UsersService } from '../../users/service/user.service';

@Component({
  selector: "app-sales-invoice",
  templateUrl: "./sales-invoice.component.html",
  styleUrls: ["./sales-invoice.component.scss"]
})
export class SalesInvoiceComponent implements OnInit {
  public invoiceList = [];
  public displayShippingModal = false;
  public shippingForm: FormGroup;
  public shippingDetailList = [];
  public shippingLedgerList = [];
  public LRDate = new Date();
  public billDate = new Date();
  public formData = [];
  public enabledCtrls = false;
  public tableCheck = true;
  public userRightMenuData = {};
  constructor(
    private transComService: TransactionServices,
    private router: Router,
    private fb: FormBuilder,
    private saleService: SalesService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    // this.getSalesOrderList();
    localStorage.setItem("transItemDetails", "true");
    localStorage.setItem("transLedgerDetails", "true");
    localStorage.setItem("transPOTerms", "false");
    localStorage.setItem("transBoxDetails", "false");
    localStorage.setItem("transBatchDetails", "false");
    localStorage.setItem("transGRNTerms", "false");
    localStorage.setItem("transInvoiceTerms", "true");
    localStorage.setItem("transWorkCompletionDetails", "false");
    localStorage.setItem("showCurrency", "false");
    localStorage.setItem("showLedger", "true");
    localStorage.setItem("showSupplier", "false");
    localStorage.setItem("transactionTypeId", "12");
    localStorage.setItem("FormHeader", "Sales Invoice Edit/Create Form");
    localStorage.setItem("transationLinkRefInput", "true");
    localStorage.setItem("showLocation", "false");
    localStorage.setItem("showTransactionSeries", "true");
    localStorage.setItem("showPO", "true");

    this.createShipppingForm();
    this.getShippingLedgers();
    // this.veiwShipDetails();

    this.getUserMenuDetails()
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

  getSalesOrderList(dates) {
    this.transComService.getTransactionList("12", dates).subscribe(res => {
      if (res && res.status === "200") {
        this.invoiceList = res.data;
      }
    });
  }

  addSalesInvoice() {
    let backUrl = this.router.url;
    localStorage.setItem("rollBackUrl", backUrl);

    this.router.navigate(["/sales/addEditsales"]);
    localStorage.setItem("transactionID", "0");
  }

  editSalesInvoice(id) {
    let backUrl = this.router.url;
    localStorage.setItem("rollBackUrl", backUrl);

    localStorage.setItem("transactionID", id);
    this.router.navigate(["/sales/addEditsales"]);
  }

  generateReport(id) {
    this.transComService.generateReport(id).subscribe(res => {
      if (res.status === "200") {
        const fileName = res.data[0].downloadFileName;
        const downloadUrl =
          BASEURL +
          "ReportDownload/DownloadReportPDF?ReportFileName=" +
          fileName;
        window.location.href = downloadUrl;
      } else if (res.status === "500") {
        alert("Download Report Failed !");
      }
    });
  }

  createShipppingForm() {
    this.shippingForm = this.fb.group({
      transactionID: [0],
      ledgerID: [, Validators.required],
      transporterLRNO: ["", Validators.required],
      transporterLRDate: ["", Validators.required],
      transactioneWayBillNo: [""],
      transactioneWayBillDate: [""],
      distanceKMS: ["", Validators.required],
      vehicleNo: ["", Validators.required]
    });
  }

  veiwShipDetails(transactionID) {
    this.saleService.getShippingDetails(transactionID).subscribe(res => {
      if (res && res.status === "200") {
        this.shippingDetailList = res.data;
        if (this.shippingDetailList.length > 0) {
          this.shippingForm.controls["transactionID"].setValue(
            this.shippingDetailList[0].transactionID
          );
          if (this.shippingDetailList[0].ledgerID != 0) {
            this.shippingForm.controls["ledgerID"].setValue(
              this.shippingDetailList[0].ledgerID
            );
          }

          this.shippingForm.controls["transporterLRNO"].setValue(
            this.shippingDetailList[0].transporterLRNO
          );
          this.shippingForm.controls["transactioneWayBillNo"].setValue(
            this.shippingDetailList[0].transactioneWayBillNo
          );
          this.shippingForm.controls["transporterLRDate"].setValue(
            new Date(this.shippingDetailList[0].transporterLRDate)
          );
          if (this.shippingDetailList[0].transactioneWayBillDate !== null && this.shippingDetailList[0].transactioneWayBillDate !== '') {
            this.shippingForm.controls["transactioneWayBillDate"].setValue(
              new Date(this.shippingDetailList[0].transactioneWayBillDate)
            );
          } else {
            this.shippingForm.controls["transactioneWayBillDate"].setValue(
              new Date()
            );
          }

          this.shippingForm.controls["distanceKMS"].setValue(
            this.shippingDetailList[0].distanceKMS
          );
          this.shippingForm.controls["vehicleNo"].setValue(
            this.shippingDetailList[0].vehicleNo
          );
        }
        // this.formData.push(this.shippingForm.value);
      }
    });
    this.displayShippingModal = true;
    this.enabledCtrls = false;
  }

  updateShipDetails() {
    this.shippingForm.controls["transactionID"].setValue(0);
    this.shippingForm.controls["ledgerID"].setValue(0);
    this.shippingForm.controls["transporterLRNO"].setValue("");
    this.shippingForm.controls["transactioneWayBillNo"].setValue("");
    this.shippingForm.controls["transporterLRDate"].setValue("");
    this.shippingForm.controls["transactioneWayBillDate"].setValue("");
    this.shippingForm.controls["distanceKMS"].setValue("");
    this.shippingForm.controls["vehicleNo"].setValue("");

    this.displayShippingModal = true;
    this.enabledCtrls = true;
  }

  updateShippingData() {
    if (this.shippingForm.valid) {
      for (var i = 0; i < this.formData.length; i++) {
        this.formData[i].ledgerID = this.shippingForm.controls[
          "ledgerID"
        ].value;
        this.formData[i].transporterLRNO = this.shippingForm.controls[
          "transporterLRNO"
        ].value;
        this.formData[i].transactioneWayBillNo = this.shippingForm.controls[
          "transactioneWayBillNo"
        ].value;
        this.formData[i].transporterLRDate = this.shippingForm.controls[
          "transporterLRDate"
        ].value;
        this.formData[i].transactioneWayBillDate = this.shippingForm.controls[
          "transactioneWayBillDate"
        ].value;
        this.formData[i].distanceKMS = this.shippingForm.controls[
          "distanceKMS"
        ].value;
        this.formData[i].vehicleNo = this.shippingForm.controls[
          "vehicleNo"
        ].value;
      }
      this.saleService.updateShippingDetails(this.formData).subscribe(res => {
        alert(res.message);
      });
    } else {
      alert("All fields are required, Please try again.");
      return false;
    }

    this.displayShippingModal = false;
    this.enabledCtrls = false;
  }

  getCheckList(event, id) {
    if (event) {
      this.shippingForm.controls["transactionID"].setValue(id);
      this.formData.push(this.shippingForm.value);
    } else {
      for (var i = this.formData.length; i--; ) {
        if (this.formData[i].transactionID === id) {
          this.formData.splice(i, 1);
        }
      }
    }
  }

  getShippingLedgers() {
    this.saleService.getShippingLedgers().subscribe(res => {
      if (res && res.status === "200") {
        let data = res.data;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            this.shippingLedgerList.push({
              label: data[key].ledgerName,
              value: data[key].ledger_ID
            });
          }
        }
      }
    });
  }
}
