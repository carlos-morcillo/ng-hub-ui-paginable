import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandingRowsComponent } from './expanding-rows.component';

describe('ExpandingRowsComponent', () => {
  let component: ExpandingRowsComponent;
  let fixture: ComponentFixture<ExpandingRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandingRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandingRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
