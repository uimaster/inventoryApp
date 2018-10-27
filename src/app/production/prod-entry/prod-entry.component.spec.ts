import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdEntryComponent } from './prod-entry.component';

describe('ProdEntryComponent', () => {
  let component: ProdEntryComponent;
  let fixture: ComponentFixture<ProdEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
