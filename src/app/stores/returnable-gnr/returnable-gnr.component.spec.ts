import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnableGnrComponent } from './returnable-gnr.component';

describe('GnrComponent', () => {
  let component: ReturnableGnrComponent;
  let fixture: ComponentFixture<ReturnableGnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnableGnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnableGnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
