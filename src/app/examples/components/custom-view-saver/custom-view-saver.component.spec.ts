import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomViewSaverComponent } from './custom-view-saver.component';

describe('CustomViewSaverComponent', () => {
  let component: CustomViewSaverComponent;
  let fixture: ComponentFixture<CustomViewSaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomViewSaverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomViewSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
