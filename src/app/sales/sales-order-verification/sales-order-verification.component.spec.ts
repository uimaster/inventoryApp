import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderVerificationComponent } from './sales-order-verification.component';

describe('SalesOrderVerificationComponent', () => {
  let component: SalesOrderVerificationComponent;
  let fixture: ComponentFixture<SalesOrderVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
