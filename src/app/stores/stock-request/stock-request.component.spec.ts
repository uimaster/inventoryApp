import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRequestComponent } from './stock-request.component';

describe('StockRequestComponent', () => {
  let component: StockRequestComponent;
  let fixture: ComponentFixture<StockRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
