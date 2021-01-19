import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchActionsComponent } from './batch-actions.component';

describe('BatchActionsComponent', () => {
  let component: BatchActionsComponent;
  let fixture: ComponentFixture<BatchActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
