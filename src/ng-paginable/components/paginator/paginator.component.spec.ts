import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbTableSorterPaginatorComponent } from './nb-table-sorter-paginator.component';

describe('NbTableSorterPaginatorComponent', () => {
  let component: NbTableSorterPaginatorComponent;
  let fixture: ComponentFixture<NbTableSorterPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbTableSorterPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbTableSorterPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
