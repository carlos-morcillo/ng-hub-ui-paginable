import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationInfoComponent } from './pagination-info.component';

describe('PaginationInfoComponent', () => {
  let component: PaginationInfoComponent;
  let fixture: ComponentFixture<PaginationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
