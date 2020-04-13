import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationUpComponent } from './pagination-up.component';

describe('PaginationUpComponent', () => {
  let component: PaginationUpComponent;
  let fixture: ComponentFixture<PaginationUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
