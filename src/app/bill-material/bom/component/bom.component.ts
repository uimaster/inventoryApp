import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {BomService} from '../services/bom.service';
import {BomResponse} from '../models/bom.model';
import { DatePipe } from '@angular/common';
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
    public bomDataSubscription: Subscription;
    showError = false;
    showSuccess = false;
    companyId = localStorage.getItem('companyID');
    userId = localStorage.getItem('userID');
    constructor(
      private bomService: BomService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router,
      private datePipe: DatePipe
    ) { }
    public bom;
    public cForm;
    date1 = new Date();
    ngOnInit() {
      this.bomForm();
      setTimeout(() => {
        this._route.params.subscribe((params) => {
          this.bomID = params.id;
          this.getBomData(this.bomID);
        });
      }, 4000);

      this.getStockItems();
      this.getBomTypes();
      this.getBomLevels();
      this.getBomComponentTypes();
    }

    convertToDateFormat(Datestr) {
        //debugger;
        if (Datestr != '') {
          // Datestr='03/08/2016'
          var datedata = Datestr.split('-');
          var formatedDateString =
            new Date(datedata[0] + '-' + datedata[1] + '-' + datedata[2]);
            console.log(formatedDateString);
          return formatedDateString;
        }
    }
      
    getBomData(bomId) {
        this.bomDataSubscription = this.bomService.getBomData(this.bomID).subscribe((res: BomResponse) => {
            this.bom = res.data[0];
            console.log(this.bom);
            if (this.bomID && this.bom) {
               var parts = this.bom['bomDate'].split("-");
               let bomDate = new Date(parts[2], parts[1] - 1, parts[0]);
            
                this.cForm.controls['bomDate'].setValue(bomDate);
                this.cForm.controls['stockItemID'].setValue(this.bom['stockItemID']);
                //this.cForm.controls['itemCode'].setValue(this.bom['itemCode']);
                this.cForm.controls['botid'].setValue(this.bom['botid']);
                this.cForm.controls['bomid'].setValue(this.bom['bomid']);
                //this.cForm.controls['itemName'].setValue(this.bom['itemName']);
                const controlArray = <FormArray> this.cForm.get('bomDetail');
                controlArray.controls[0].get('stockItemID').setValue(this.bom['bomDetail'][0].stockItemID);
                controlArray.controls[0].get('qty').setValue(this.bom['bomDetail'][0].qty);
                controlArray.controls[0].get('bmlid').setValue(this.bom['bomDetail'][0].bmlid);
                controlArray.controls[0].get('bomcomtypeid').setValue(this.bom['bomDetail'][0].bomcomtypeid);
            }
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
          //itemName: ['', Validators.required],
          botid: ['', Validators.required],
          bomDetail:  this._formBuilder.array([this.createbomDetail()]),
      });
    }

    get bomDate() { return this.cForm.get('bomDate'); }
    //get itemCode() { return this.cForm.get('itemCode'); }
    get botid() { return this.cForm.get('botid'); }
    //get itemName() { return this.cForm.get('itemName'); }
    
    get stockItemID() { return this.cForm.get(['bomDetail'], 0, ['stockItemID']); }
    get qty() { return this.cForm.get(['bomDetail'], 0, ['qty']); }
    get bmlid() { return this.cForm.get(['bomDetail'], 0, ['bmlid']); }
    get bomcomtypeid() { return this.cForm.get(['bomDetail'], 0, ['bomcomtypeid']); }


    createbomDetail() {
        return this._formBuilder.group({
            stockItemID: [0],
            qty: [''],
            bmlid: [0],
            bomcomtypeid: [0],
        });
    }

    addItems() {
      const stockItemArray = <FormArray>this.cForm.get('bomDetail');
      stockItemArray.push(
        this._formBuilder.group({
            stockItemID: ['0'],
            qty: [''],
            bmlid: [0],
            bomcomtypeid: [0],
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
        form.bomDate = this.datePipe.transform(form.bomDate, 'dd-mm-yyyy'); 
        this.bomService.updateBom(form).subscribe((res: BomResponse) => {
            if (res.status === '200') {
                this.showSuccess = true;
                setTimeout(() => {
                  this.router.navigate(['/bill-material/list']);
                }, 3000);
            } else {
              this.showError = true;
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


    getStockItems() {
      this.bomService.getAllStocks().subscribe( res => {
        if (res && res.status === '200') {
          // this.itemMasterList = res.data;
          let data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
                this.allStockItems.push({label: data[key].itemCode + ', ' + data[key].itemName, value: data[key].stockItemID});
            }
          }
        }

      });
    }

}
