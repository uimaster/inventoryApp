import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRejectNoteComponent } from './stock-reject-note.component';

describe('StockRejectNoteComponent', () => {
  let component: StockRejectNoteComponent;
  let fixture: ComponentFixture<StockRejectNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockRejectNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRejectNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
