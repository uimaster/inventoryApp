import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AssemblyInstructionService} from '../services/assembly-instruction.service';

@Component({
    selector: 'app-assembly-instruction-list',
    templateUrl: './assembly-instruction-list.component.html',
    styleUrls: ['./assembly-instruction-list.component.scss']
})
export class AssemblyInstructionListComponent implements OnInit, OnDestroy {
    public aiList: any;
    public listData: any;
    public showLoader:boolean = false;
    public aiListDataSubscription: Subscription;
    constructor(private assemblyInstructionService: AssemblyInstructionService, private router: Router) { }

    ngOnInit() {
        this.getBomList();
    }

    getBomList() {
        this.showLoader = true;
        this.aiListDataSubscription = this.assemblyInstructionService.getAssemblyInstructionList().subscribe(res => {
            this.showLoader = false;
            if (res && res.status === '200')  {
                this.aiList = res.data;
                this.listData = res.data;
                 console.log(this.aiList);
            }
        });
    }


    setBom(bomId){
        this.router.navigate(['production/AssemblyInstruction/edit', bomId]);
    }

    addAI(){
        this.router.navigate(['production/AssemblyInstruction/add']);
    }
    ngOnDestroy() {
        this.aiListDataSubscription.unsubscribe();
    }


    applyFilter(filterValue: string){
        this.aiList = this.listData.filter(
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
