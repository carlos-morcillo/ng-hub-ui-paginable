import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginableListComponent } from './paginable-list.component';

describe('PaginableListComponent', () => {
  let component: PaginableListComponent;
  let fixture: ComponentFixture<PaginableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
