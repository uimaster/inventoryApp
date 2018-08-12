import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UnitResponse} from '../models/unit.model';
import {UnitService} from '../services/unit.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {

  public unitList;
  constructor( private unitService: UnitService, private router : Router) { }

  ngOnInit() {
    this.getUnitList();
  }

  getUnitList() {
    this.unitService.getAllUnits().subscribe((res: UnitResponse) => {
      if (res && res.status == '200')  {
        this.unitList = res.data;
        //console.log(this.unitList);

      }
    });
  }


  setUnit(unitId){

    // this.sharedledgerservice.setLedger(ledger);
    this.router.navigate(['/units/unit', unitId]);

  }


}
