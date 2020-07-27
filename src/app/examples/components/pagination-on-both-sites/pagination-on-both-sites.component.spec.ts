import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationOnBothSitesComponent } from './pagination-on-both-sites.component';

describe('PaginationOnBothSitesComponent', () => {
  let component: PaginationOnBothSitesComponent;
  let fixture: ComponentFixture<PaginationOnBothSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationOnBothSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationOnBothSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
