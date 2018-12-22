import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FGInwardComponent } from './fginward.component';

describe('FGInwardComponent', () => {
  let component: FGInwardComponent;
  let fixture: ComponentFixture<FGInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FGInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FGInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
