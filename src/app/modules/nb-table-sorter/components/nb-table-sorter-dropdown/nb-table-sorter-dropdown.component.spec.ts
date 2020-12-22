import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbTableSorterDropdownComponent } from './nb-table-sorter-dropdown.component';

describe('NbTableSorterDropdownComponent', () => {
  let component: NbTableSorterDropdownComponent;
  let fixture: ComponentFixture<NbTableSorterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbTableSorterDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbTableSorterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
