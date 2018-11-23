import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateProdComponent implements OnInit {

  FormHeader = 'Edit/Create Form';
  constructor() {
    this.FormHeader = localStorage.getItem('FormHeader');
  }

  ngOnInit() {
  }

}
