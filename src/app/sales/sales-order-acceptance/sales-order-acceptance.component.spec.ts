import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderAcceptanceComponent } from './sales-order-acceptance.component';

describe('SalesOrderAcceptanceComponent', () => {
  let component: SalesOrderAcceptanceComponent;
  let fixture: ComponentFixture<SalesOrderAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
