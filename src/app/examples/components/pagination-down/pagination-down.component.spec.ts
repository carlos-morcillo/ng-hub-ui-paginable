import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationDownComponent } from './pagination-down.component';

describe('PaginationDownComponent', () => {
  let component: PaginationDownComponent;
  let fixture: ComponentFixture<PaginationDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
