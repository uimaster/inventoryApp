import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditStoreComponent } from './create.component';

describe('CreateEditStoreComponent', () => {
  let component: CreateEditStoreComponent;
  let fixture: ComponentFixture<CreateEditStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
