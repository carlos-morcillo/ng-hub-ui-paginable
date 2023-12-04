import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginableTableRangeInputComponent } from './paginable-table-range-input.component';

describe('NgTableSorterRangeInputComponent', () => {
  let component: PaginableTableRangeInputComponent;
  let fixture: ComponentFixture<PaginableTableRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginableTableRangeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginableTableRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
