import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTableSorterRangeInputComponent } from './ng-table-sorter-range-input.component';

describe('NgTableSorterRangeInputComponent', () => {
  let component: NgTableSorterRangeInputComponent;
  let fixture: ComponentFixture<NgTableSorterRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTableSorterRangeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTableSorterRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
