import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNoteComponent } from './stock-note.component';

describe('StockNoteComponent', () => {
  let component: StockNoteComponent;
  let fixture: ComponentFixture<StockNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
