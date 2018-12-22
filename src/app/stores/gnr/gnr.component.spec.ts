import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GnrComponent } from './gnr.component';

describe('GnrComponent', () => {
  let component: GnrComponent;
  let fixture: ComponentFixture<GnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
