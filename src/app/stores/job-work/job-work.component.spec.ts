import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkComponent } from './job-work.component';

describe('JobWorkComponent', () => {
  let component: JobWorkComponent;
  let fixture: ComponentFixture<JobWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
