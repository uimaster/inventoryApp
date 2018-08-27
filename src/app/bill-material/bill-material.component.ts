import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters',
  templateUrl: './bill-material.component.html',
  styleUrls: ['./bill-material.component.scss']
})
export class BillMaterialComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
}
