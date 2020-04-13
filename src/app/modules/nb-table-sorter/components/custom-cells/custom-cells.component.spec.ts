import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellsComponent } from './custom-cells.component';

describe('CustomCellsComponent', () => {
  let component: CustomCellsComponent;
  let fixture: ComponentFixture<CustomCellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
