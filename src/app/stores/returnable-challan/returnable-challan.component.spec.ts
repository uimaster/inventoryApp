import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnableChallanComponent } from './returnable-challan.component';

describe('ReturnableChallanComponent', () => {
  let component: ReturnableChallanComponent;
  let fixture: ComponentFixture<ReturnableChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnableChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnableChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
