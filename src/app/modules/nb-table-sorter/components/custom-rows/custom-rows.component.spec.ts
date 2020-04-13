import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRowsComponent } from './custom-rows.component';

describe('CustomRowsComponent', () => {
  let component: CustomRowsComponent;
  let fixture: ComponentFixture<CustomRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
