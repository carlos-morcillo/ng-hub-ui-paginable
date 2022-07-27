import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutablesRowsComponent } from './routables-rows.component';

describe('RoutablesRowsComponent', () => {
  let component: RoutablesRowsComponent;
  let fixture: ComponentFixture<RoutablesRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutablesRowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutablesRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
