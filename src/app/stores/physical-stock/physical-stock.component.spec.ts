import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalStockComponent } from './physical-stock.component';

describe('PhysicalStockComponent', () => {
  let component: PhysicalStockComponent;
  let fixture: ComponentFixture<PhysicalStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
