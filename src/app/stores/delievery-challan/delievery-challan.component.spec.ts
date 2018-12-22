import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelieveryChallanComponent } from './delievery-challan.component';

describe('DelieveryChallanComponent', () => {
  let component: DelieveryChallanComponent;
  let fixture: ComponentFixture<DelieveryChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelieveryChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelieveryChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
