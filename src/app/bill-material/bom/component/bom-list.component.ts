import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BomService} from '../services/bom.service';
import {BomResponse} from '../models/bom.model';

@Component({
    selector: 'app-bom-list',
    templateUrl: './bom-list.component.html',
    styleUrls: ['./bom-list.component.scss']
})
export class BomListComponent implements OnInit, OnDestroy {
    public bomList: any;
    public listData: any;
    public loadingList:boolean = false;
    public bomListDataSubscription: Subscription;
    constructor(private bomService: BomService, private router: Router) { }

    ngOnInit() {
        this.getBomList();
    }

    getBomList() {
        this.loadingList = true;
        this.bomListDataSubscription = this.bomService.getAllBoms().subscribe((res: BomResponse) => {
            this.loadingList = false;
            if (res && res.status === '200')  {
                this.bomList = res.data;
                this.listData = res.data;
                // console.log(this.unitList);
            }
        });
    }


    setBom(bomId){
        this.router.navigate(['/bill-material/bom', bomId]);
    }

    addBom(){
        this.router.navigate(['/bill-material/add-bom']);
    }
    ngOnDestroy() {
        this.bomListDataSubscription.unsubscribe();
    }


    applyFilter(filterValue: string){
        this.bomList = this.listData.filter(
            row => {
                for (var key in row) {
                    if (row.hasOwnProperty(key)) {
                        if(row[key].toString().toLowerCase().includes(filterValue.toLowerCase())){
                            return true;
                        }
                       // console.log(key + " -> " + row[key]);
                    }
                }
            }    
        );
    }

}
