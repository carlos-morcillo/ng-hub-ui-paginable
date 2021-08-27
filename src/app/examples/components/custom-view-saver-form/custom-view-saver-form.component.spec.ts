import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomViewSaverFormComponent } from './custom-view-saver-form.component';

describe('CustomViewSaverFormComponent', () => {
  let component: CustomViewSaverFormComponent;
  let fixture: ComponentFixture<CustomViewSaverFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomViewSaverFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomViewSaverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
