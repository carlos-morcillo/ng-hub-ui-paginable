import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNoDataMessageComponent } from './custom-no-data-message.component';

describe('CustomNoDataMessageComponent', () => {
  let component: CustomNoDataMessageComponent;
  let fixture: ComponentFixture<CustomNoDataMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomNoDataMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomNoDataMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
