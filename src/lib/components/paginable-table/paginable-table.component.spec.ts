import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginableTableComponent } from './paginable-table.component';


describe('TableSorterComponent', () => {
	let component: PaginableTableComponent;
	let fixture: ComponentFixture<PaginableTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PaginableTableComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaginableTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
