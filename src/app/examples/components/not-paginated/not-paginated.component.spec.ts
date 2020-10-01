import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPaginatedComponent } from './not-paginated.component';

describe('NotPaginatedComponent', () => {
  let component: NotPaginatedComponent;
  let fixture: ComponentFixture<NotPaginatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotPaginatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotPaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
