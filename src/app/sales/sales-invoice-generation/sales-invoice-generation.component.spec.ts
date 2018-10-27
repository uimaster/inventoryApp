import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceGenerationComponent } from './sales-invoice-generation.component';

describe('SalesInvoiceGenerationComponent', () => {
  let component: SalesInvoiceGenerationComponent;
  let fixture: ComponentFixture<SalesInvoiceGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoiceGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
