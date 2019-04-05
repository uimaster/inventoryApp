import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {AssemblyInstructionService} from '../services/assembly-instruction.service';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-assembly-instruction',
    templateUrl: './assembly-instruction.component.html',
    styleUrls: ['./assembly-instruction.component.scss']
})
export class AssemblyInstructionComponent implements OnInit, OnDestroy {

    public aiList;
    public aiID;
    public allBomTypes = [];
    public allBomLevels = [];
    public allBomComTypes = [];
    public allStockItems = [];
    public allParameterTypes = [];
    public aiDataSubscription: Subscription;
    showError = false;
    showSuccess = false;
    companyId = localStorage.getItem('companyID');
    userId = localStorage.getItem('userID');
    public allStockItemsInner = [];

    constructor(
      private assemblyInstructionService: AssemblyInstructionService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router,
      private datePipe: DatePipe
    ) { }
    public ai;
    public cForm;
    date1 = new Date();
    filteredItems = [];
    filteredItemsInner = [];
    showLoader = false;
    itemName: string;

    ngOnInit() {
      this.showLoader = true;
      this.aiForm();
      // setTimeout(() => {
        this._route.params.subscribe((params) => {
          this.aiID = params.id;
          // this.getBomData(this.aiID);
        });
      // }, 4000);

      this.getStockItems();
      this.getStockItemsInner();
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

    getAiData(aiID) {
        // this.showLoader = true;
        this.aiDataSubscription = this.assemblyInstructionService.getDetails(this.aiID).subscribe(res => {
            this.ai = res.data[0];
            if (this.aiID && this.ai) {
               var parts = this.ai['asemblyInstructionDate'].split("-");
               let asemblyInstructionDate = new Date(parts[0], parts[1] - 1, parts[2]);
                this.cForm.controls['asemblyInstructionDate'].setValue(asemblyInstructionDate);
                this.cForm.controls['assemblyInstructionNO'].setValue(this.ai['assemblyInstructionNO']);
                this.cForm.controls['assemblyInstructionId'].setValue(this.ai['assemblyInstructionId']);
                this.cForm.controls['stockitemID'].setValue(this.ai['stockitemID']);
                this.cForm.controls['itemDesc'].setValue(this.ai['itemDesc']);
                this.cForm.controls['itemCode'].setValue(this.ai['itemCode']);
                this.cForm.controls['instructionName'].setValue(this.ai['instructionName']);
                if (this.ai['assemblyInstructionDetails'].length > 0) {
                    this.cForm.setControl('assemblyInstructionDetails', this._formBuilder.array((this.ai['assemblyInstructionDetails'] || []).map((x) => this._formBuilder.group(x))));
                }
            }
        });
    }

    aiForm() {
      this.cForm = this._formBuilder.group({
        assemblyInstructionId: [0],
        assemblyInstructionNO:[''],
        asemblyInstructionDate: [''],
        stockitemID: [0],
        itemDesc:[''],
        itemCode:[''],
        instructionName:[''],
        companyID: [JSON.parse(this.companyId)],
        assemblyInstructionDetails:  this._formBuilder.array([this.createAiDetail()]),
      });
    }

    get asemblyInstructionDate() { return this.cForm.get('asemblyInstructionDate'); }
    get assemblyInstructionId() { return this.cForm.get('assemblyInstructionId'); }
    get assemblyInstructionNO() { return this.cForm.get('assemblyInstructionNO'); }
    get instructionName() { return this.cForm.get('instructionName'); }
    get itemCode() { return this.cForm.get('itemCode'); }
  
    createAiDetail() {
        return this._formBuilder.group({
            instructionSRNo: [0],
            instructiondescription: [''],
            itemDesc: [''],
            itemCode: [''],
            stockItemID:[0],
            qty:[0]
        });
    }

    addItems() {
      const listArray = <FormArray>this.cForm.get('assemblyInstructionDetails');
      listArray.push(
        this._formBuilder.group({
            instructionSRNo: [0],
            instructiondescription: [''],
            itemDesc: [''],
            itemCode: [''],
            stockItemID:[0],
            qty:[0]
        })
      );
    }

    removeItems(index) {
      const listArray = <FormArray>this.cForm.get('assemblyInstructionDetails');
      listArray.removeAt(index);
    }

    ngOnDestroy() {
        if(this.aiDataSubscription)
        this.aiDataSubscription.unsubscribe();
    }


    saveAI (form: any) {
        form.asemblyInstructionDate = this.datePipe.transform(form.asemblyInstructionDate, 'yyyy-MM-dd');
        this.assemblyInstructionService.updateAI(form).subscribe(res => {
            if (res.status === '200') {
                this.showSuccess = true;
                setTimeout(() => {
                  this.router.navigate(['/production/AssemblyInstruction/list']);
                }, 3000);
            } else {
              this.showError = true;
            }
        });
    }

    getStockItems() {
      this.assemblyInstructionService.getAllStocks(2).subscribe( res => {
        if (res && res.status === '200') {
          // this.itemMasterList = res.data;
          let data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
                //this.allStockItems.push({label: data[key].itemCode + ', ' + data[key].itemName, value: data[key].stockItemID});
                //this.allStockItems.push({label: data[key].stockItemDesc, value: data[key].stockItemID});
                this.allStockItems.push({label: data[key].itemCode, value: data[key].stockItemID, desc:data[key].stockItemDesc});
            }
          }
        }
        this.getAiData(this.aiID);
        this.showLoader = false;
      });
    }

    getStockItemsInner() {
      this.assemblyInstructionService.getAllStocks(1).subscribe( res => {
        if (res && res.status === '200') {
          let data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
                this.allStockItemsInner.push({
                  label: data[key].itemCode, 
                  value: data[key].stockItemID, 
                  desc:data[key].stockItemDesc.split("|").slice(1).join("|").trim()});
            }
          }
        }
        this.getAiData(this.aiID);
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

    filterItemsInner(event) {
        this.filteredItemsInner = [];
        for (let i = 0; i < this.allStockItemsInner.length; i++) {
            let itemName = this.allStockItemsInner[i].label;
            if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredItemsInner.push(itemName);
            }
        }
    }

    getSelectedVal(event,elem) {
      for ( var i = 0; i < this.allStockItems.length; i++) {
        if (this.allStockItems[i].label === event) {
          this.cForm.get(elem).setValue(this.allStockItems[i].value);
          //this.cForm.get('itemDesc').setValue(this.allStockItems[i].desc);

          this.assemblyInstructionService.getFGItemBOMList(this.allStockItems[i].value).subscribe( res => {
            let data = res.data;
            //console.log(data);
            const controlArray = <FormArray> this.cForm.get('assemblyInstructionDetails');
            controlArray.removeAt(0);    
            for ( var i = 0; i <  data.length; i++) {
                controlArray.push(this._formBuilder.group({
                    instructionSRNo: [i+1],
                    instructiondescription: [''],
                    itemDesc: [data[i].itemName],
                    itemCode: [data[i].itemCode],
                    stockItemID:[data[i].stockItemID],
                    qty:[data[i].qty]
                }));
            }
            if(data.length <= 0){
              this.cForm.setControl('assemblyInstructionDetails',this._formBuilder.array([this.createAiDetail()]));
            }
            // this.cForm.setControl('assemblyInstructionDetails', this._formBuilder.array((data || []).map((x) => this._formBuilder.group(x))));
          });
        }
      }
    }

    getSelectedValInner(event, elem,index) {
        for ( var i = 0; i < this.allStockItemsInner.length; i++) {
          if (this.allStockItemsInner[i].label === event) {
            this.cForm.get(elem).controls[index].get('stockItemID').setValue(this.allStockItemsInner[i].value);
            this.cForm.get(elem).controls[index].get('itemDesc').setValue(this.allStockItemsInner[i].desc);
          }
        }
    }
}
