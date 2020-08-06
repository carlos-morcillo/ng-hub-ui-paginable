import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRowsPerPageComponent } from './custom-rows-per-page.component';

describe('CustomRowsPerPageComponent', () => {
  let component: CustomRowsPerPageComponent;
  let fixture: ComponentFixture<CustomRowsPerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRowsPerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRowsPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
