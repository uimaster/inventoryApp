import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  getStockItem() {
    this.router.navigate(['stockItems']);
  }


}
