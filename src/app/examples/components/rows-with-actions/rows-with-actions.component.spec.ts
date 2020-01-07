import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowsWithActionsComponent } from './rows-with-actions.component';

describe('RowsWithActionsComponent', () => {
  let component: RowsWithActionsComponent;
  let fixture: ComponentFixture<RowsWithActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowsWithActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowsWithActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
