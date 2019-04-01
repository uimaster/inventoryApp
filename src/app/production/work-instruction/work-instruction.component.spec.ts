import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkInstructionComponent } from './work-instruction.component';

describe('WorkInstructionComponent', () => {
  let component: WorkInstructionComponent;
  let fixture: ComponentFixture<WorkInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
