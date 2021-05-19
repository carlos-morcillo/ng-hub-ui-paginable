import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverableRowsComponent } from './hoverable-rows.component';

describe('HoverableRowsComponent', () => {
  let component: HoverableRowsComponent;
  let fixture: ComponentFixture<HoverableRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoverableRowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverableRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
