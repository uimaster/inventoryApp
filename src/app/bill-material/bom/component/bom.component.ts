import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {BomService} from '../services/bom.service';
import {BomResponse} from '../models/bom.model';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { NotificationsService } from '../../../notifications/notifications.service';

@Component({
    selector: 'app-bom',
    templateUrl: './bom.component.html',
    styleUrls: ['./bom.component.scss']
})
export class BomComponent implements OnInit, OnDestroy {

    public bomList;
    public bomID;
    public allBomTypes = [];
    public allBomLevels = [];
    public allBomComTypes = [];
    public allStockItems = [];
    public allParameterTypes = [];
    public bomDataSubscription: Subscription;
    public displayItemDescDialog = [];
    // showError = false;
    // showSuccess = false;
    companyId = localStorage.getItem('companyID');
    userId = localStorage.getItem('userID');
    constructor(
      private bomService: BomService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router,
      private datePipe: DatePipe,
      private notificationsService: NotificationsService
    ) { }
    public bom;
    public cForm;
    date1 = new Date();
    filteredItems = [];
    showLoader = false;
    itemName: string;

    ngOnInit() {
      this.showLoader = true;
      this.bomForm();
      // setTimeout(() => {
        this._route.params.subscribe((params) => {
          this.bomID = params.id;
          // this.getBomData(this.bomID);
        });
      // }, 4000);

      this.getStockItems();
      this.getBomTypes();
      this.getBomLevels();
      this.getBomComponentTypes();
      this.getParameterTypes();
    }

    convertToDateFormat(Datestr) {
        if (Datestr != '') {
          // Datestr='03/08/2016'
          var datedata = Datestr.split('-');
          var formatedDateString =
            new Date(datedata[0] + '-' + datedata[1] + '-' + datedata[2]);
          return formatedDateString;
        }
    }

    getBomData(bomId) {
        // this.showLoader = true;
        this.bomDataSubscription = this.bomService.getBomData(this.bomID).subscribe((res: BomResponse) => {
            this.bom = res.data[0];
            if (this.bomID && this.bom) {
               var parts = this.bom['bomDate'].split("-");
               let bomDate = new Date(parts[0], parts[1] - 1, parts[2]);

                this.cForm.controls['bomDate'].setValue(bomDate);
                this.cForm.controls['stockItemID'].setValue(this.bom['stockItemID']);
                //this.cForm.controls['itemCode'].setValue(this.bom['itemCode']);
                this.cForm.controls['botid'].setValue(this.bom['botid']);
                this.cForm.controls['bomid'].setValue(this.bom['bomid']);
                this.cForm.controls['itemName'].setValue(this.bom['itemName']);
                if (this.bom['bomDetail'].length > 0) {
                    // const controlArray = <FormArray> this.cForm.get('priceListItems');
                    // controlArray.removeAt(0);
                    // this.priceList['priceListItems'].forEach(row => controlArray.push(this._formBuilder.group(row)));
                    this.cForm.setControl('bomDetail', this._formBuilder.array((this.bom['bomDetail'] || []).map((x) => this._formBuilder.group(x))));
                }
                // const controlArray = <FormArray> this.cForm.get('bomDetail');
                // controlArray.controls[0].get('stockItemID').setValue(this.bom['bomDetail'][0].stockItemID);
                // controlArray.controls[0].get('qty').setValue(this.bom['bomDetail'][0].qty);
                // controlArray.controls[0].get('bmlid').setValue(this.bom['bomDetail'][0].bmlid);
                // controlArray.controls[0].get('bomcomtypeid').setValue(this.bom['bomDetail'][0].bomcomtypeid);
            }
            //this.showLoader = false;
        });
    }

    bomForm() {
      this.cForm = this._formBuilder.group({
          bomid: [0],
          bomDate: ['', [Validators.required]],
          uSerID: [JSON.parse(this.userId)],
          companyID: [JSON.parse(this.companyId)],
          stockItemID: [0, Validators.required],
          //itemCode: ['', Validators.required],
          itemName: [''],
          botid: ['', Validators.required],
          bomDetail:  this._formBuilder.array([this.createbomDetail()]),
      });
    }

    get bomDate() { return this.cForm.get('bomDate'); }
    //get itemCode() { return this.cForm.get('itemCode'); }
    get botid() { return this.cForm.get('botid'); }
    //get itemName() { return this.cForm.get('itemName'); }

    // get stockItemID() { return this.cForm.get(['bomDetail'], 0, ['stockItemID']); }
    // get qty() { return this.cForm.get(['bomDetail'], 0, ['qty']); }
    // get bmlid() { return this.cForm.get(['bomDetail'], 0, ['bmlid']); }
    // get bomcomtypeid() { return this.cForm.get(['bomDetail'], 0, ['bomcomtypeid']); }
    // get parameterid() { return this.cForm.get(['bomDetail'], 0, ['parameterid']); }


    createbomDetail() {
        return this._formBuilder.group({
          bomsrno: [{value: 0, disabled: true}],
          stockItemID: [0],
          qty: [''],
          bmlid: [0],
          bomcomtypeid: [0],
          parameterid:[0],
          itemName:[''],
          parameterval:['']
        });
    }

    addItems() {
      const stockItemArray = <FormArray>this.cForm.get('bomDetail');
      stockItemArray.push(
        this._formBuilder.group({
          bomsrno: [{value: 0, disabled: true}],
          stockItemID: ['0'],
          qty: [''],
          bmlid: [0],
          bomcomtypeid: [0],
          parameterid:[0],
          itemName:[''],
          parameterval:['']
        })
      );
    }

    removeItems(index) {
      const stockItemArray = <FormArray>this.cForm.get('bomDetail');
      stockItemArray.removeAt(index);
    }

    ngOnDestroy() {
        if(this.bomDataSubscription)
        this.bomDataSubscription.unsubscribe();
    }


    saveBom (form: any) {
        form.bomDate = this.datePipe.transform(form.bomDate, 'yyyy-MM-dd');
        this.bomService.updateBom(form).subscribe((res: BomResponse) => {
            if (res.status === '200') {
                //this.showSuccess = true;
                this.notificationsService.notify('success','Success','You have Updated/created successfully.');
                setTimeout(() => {
                  this.router.navigate(['/bill-material/list']);
                }, 3000);
            } else {
              //this.showError = true;
              this.notificationsService.notify('error','Error','Updatation/creation failed.')
            }
        });
    }

    getBomTypes() {
      this.bomService.getBomTypes().subscribe( res => {
        if (res && res.status === '200') {
          // this.ledgerList = res.data;
          let data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
                this.allBomTypes.push({label: data[key].bomtype, value: data[key].botid});
            }
          }
        }
      });
    }

    getBomLevels() {
        this.bomService.getBomLevels().subscribe( res => {
            if (res && res.status === '200') {
            // this.ledgerList = res.data;
            let data = res.data;
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    this.allBomLevels.push({label: data[key].bmlevel, value: data[key].bmlid});
                }
            }
            }
        });
    }

    getBomComponentTypes() {
        this.bomService.getBomComponentTypes().subscribe( res => {
            if (res && res.status === '200') {
            // this.ledgerList = res.data;
            let data = res.data;
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    this.allBomComTypes.push({label: data[key].bomcomponenttype, value: data[key].bomcomptypeid});
                }
            }
            }
        });
    }

    getParameterTypes() {
        this.bomService.getParameterTypes().subscribe( res => {
            if (res && res.status === '200') {
            // this.ledgerList = res.data;
            let data = res.data;
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    this.allParameterTypes.push({label: data[key].paramtertype, value: data[key].parametertypeid});
                }
            }
            }
        });
    }


    getStockItems() {
      this.bomService.getAllStocks().subscribe( res => {
        if (res && res.status === '200') {
          // this.itemMasterList = res.data;
          let data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
                //this.allStockItems.push({label: data[key].itemCode + ', ' + data[key].itemName, value: data[key].stockItemID});
                this.allStockItems.push({label: data[key].stockItemDesc, value: data[key].stockItemID});
            }
          }
        }
        this.getBomData(this.bomID);
        this.showLoader = false;
      });
    }

    filterItems(event) {
        this.filteredItems = [];
        for (let i = 0; i < this.allStockItems.length; i++) {
            let itemName = this.allStockItems[i].label;
            if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredItems.push(itemName);
            }
        }
    }

    getSelectedVal(event,elem) {
      for ( var i = 0; i < this.allStockItems.length; i++) {
        if (this.allStockItems[i].label === event) {
          this.cForm.get(elem).setValue(this.allStockItems[i].value);
        }
      }
    }

    getSelectedValInner(event, elem,index) {
        for ( var i = 0; i < this.allStockItems.length; i++) {
          if (this.allStockItems[i].label === event) {
            this.cForm.get(elem).controls[index].get('stockItemID').setValue(this.allStockItems[i].value);
          }
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    formatDate(dateStr){
        if(dateStr){
            let myDate = dateStr.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
            return this.datePipe.transform(myDate, 'dd/MM/yyyy', 'es-ES');
        }        
    }

    exportAsXLSX():void {
       // // console.log(this.reportsList);
       // for (let index = 0; index < this.bom['bomDetail'].length; index++) {
       //     const element = this.bom['bomDetail'][index];
       //     element.bomDate = this.convertToDateFormat(element.bomDate);
       // }
       this.exportAsExcelFile(this.bom['bomDetail'], this.capitalizeFirstLetter('Bill Of Material'));
    }

    public exportAsExcelFile(json: any[], excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    showDialog(index){
      this.displayItemDescDialog[index] = true;
    }
    closeDialog(index){
      this.displayItemDescDialog[index] = false;
    }
}
