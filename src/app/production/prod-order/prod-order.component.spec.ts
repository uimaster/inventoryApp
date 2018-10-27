import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdOrderComponent } from './prod-order.component';

describe('ProdOrderComponent', () => {
  let component: ProdOrderComponent;
  let fixture: ComponentFixture<ProdOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
