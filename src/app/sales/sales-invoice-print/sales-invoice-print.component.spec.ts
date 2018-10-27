import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoicePrintComponent } from './sales-invoice-print.component';

describe('SalesInvoicePrintComponent', () => {
  let component: SalesInvoicePrintComponent;
  let fixture: ComponentFixture<SalesInvoicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
