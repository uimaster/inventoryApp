import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillMaterialComponent } from './bill-material.component';

describe('BillMaterialComponent', () => {
  let component: BillMaterialComponent;
  let fixture: ComponentFixture<BillMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
