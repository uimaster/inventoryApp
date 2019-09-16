import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UnitResponse} from '../models/unit.model';
import {UnitService} from '../services/unit.service';
import {Router} from "@angular/router";
import { UsersService } from '../../../users/service/user.service';


@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {

  public unitList;
  public userRightMenuData = {};
  constructor( private unitService: UnitService, private router : Router, private userService: UsersService) { }

  ngOnInit() {
    this.getUnitList();
    this.getUserMenuDetails();
  }

  getUnitList() {
    this.unitService.getAllUnits().subscribe((res: UnitResponse) => {
      if (res && res.status == '200')  {
        this.unitList = res.data;
        //console.log(this.unitList);

      }
    });
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

  addUnit(){
    this.router.navigate(['/masters/add-unit']);
  }


  setUnit(unitId){

    // this.sharedledgerservice.setLedger(ledger);
    this.router.navigate(['/masters/unit', unitId]);

  }


}
