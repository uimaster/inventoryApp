import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembleInstructionComponent } from './assemble-instruction.component';

describe('AssembleInstructionComponent', () => {
  let component: AssembleInstructionComponent;
  let fixture: ComponentFixture<AssembleInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssembleInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssembleInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
