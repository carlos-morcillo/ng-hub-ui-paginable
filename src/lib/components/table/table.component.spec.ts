import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { PaginableTableHeader } from '../../interfaces/paginable-table-header';
import { TableRow } from '../../interfaces/table-row';
import { PaginableTranslationService } from 'ng-hub-ui-utils';
import { PaginableService } from '../../services/paginable.service';
import { PaginableConfigService } from '../../services/paginate-config.service';
import { TableComponent } from './table.component';

// Mock services
class MockPaginableTranslationService {
	private translationSource = new Subject<any>();
	translationObserver = this.translationSource.asObservable();

	getTranslation(key: string) {
		const translations: Record<string, string> = {
			LOADING: 'loading',
			SEARCH: 'search',
			NO_RESULTS_FOUND: 'No results found',
			SHOWING_X_OF_Y_ROWS: 'Showing {{amount}} of {{total}} rows'
		};
		return translations[key] || key;
	}

	setTranslations() {}
	initialize() {}
}

class MockPaginableService {
	config = {
		language: 'en',
		mapping: {}
	};

	get mapping() {
		return this.config.mapping;
	}

	initialize() {}
}

describe('TableComponent', () => {
	let component: TableComponent;
	let fixture: ComponentFixture<TableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TableComponent, BrowserAnimationsModule],
			providers: [
				{
					provide: PaginableTranslationService,
					useClass: MockPaginableTranslationService
				},
				{
					provide: PaginableService,
					useClass: MockPaginableService
				},
				{
					provide: PaginableConfigService,
					useValue: {
						language: 'en',
						mapping: {}
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(TableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('Component Creation and Basic Functionality', () => {
		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should have default values', () => {
			expect(component.value).toEqual([]);
			expect(component.allRowsSelected).toBe(false);
			expect(component.disabled).toBe(false);
			expect(component.filterLoading).toBe(false);
		});

		it('should generate unique id', () => {
			const id = component.id();
			expect(id).toBeTruthy();
			expect(typeof id).toBe('string');
			expect(id.length).toBe(16);
		});
	});

	describe('Headers Configuration', () => {
		it('should handle string headers', () => {
			component.headers.set(['name', 'email', 'age']);
			const fixedHeaders = component.fixedHeaders();

			expect(fixedHeaders.length).toBe(3);
			expect(fixedHeaders[0]).toEqual({
				title: 'name',
				property: 'name'
			});
		});

		it('should handle object headers', () => {
			const headers: PaginableTableHeader[] = [
				{ title: 'Name', property: 'name', sortable: true },
				{ title: 'Email', property: 'email', sortable: false }
			];
			component.headers.set(headers);
			const fixedHeaders = component.fixedHeaders();

			expect(fixedHeaders).toEqual(headers);
		});

		it('should configure button-only headers correctly', () => {
			const headers: PaginableTableHeader[] = [
				{
					property: '',
					buttons: [{ label: 'Edit', handler: () => {} }]
				}
			];
			component.headers.set(headers);
			const fixedHeaders = component.fixedHeaders();

			expect(fixedHeaders[0].onlyButtons).toBe(true);
			expect(fixedHeaders[0].align).toBe('end');
			expect(fixedHeaders[0].wrapping).toBe('nowrap');
		});

		it('should count headers correctly', () => {
			component.headers.set(['name', 'email']);
			expect(component.headersCount()).toBe(2);
		});
	});

	describe('Data Handling and Transformation', () => {
		it('should transform array data into table rows', () => {
			const testData = [
				{ id: 1, name: 'John' },
				{ id: 2, name: 'Jane' }
			];
			const transformedRows = testData.map((item) =>
				component.transformIntoRow(item)
			);

			expect(transformedRows.length).toBe(2);
			expect(transformedRows[0].data).toEqual({ id: 1, name: 'John' });
			expect(transformedRows[0].selected).toBe(false);
			expect(transformedRows[0].collapsed).toBe(true);
		});

		it('should handle empty data', () => {
			const emptyData: any[] = [];
			const transformedRows = emptyData.map((item) =>
				component.transformIntoRow(item)
			);
			expect(transformedRows).toEqual([]);
		});
	});

	describe('Pagination Logic', () => {
		it('should calculate number of pages correctly', () => {
			component.perPage.set(10);
			component.totalItems.set(25);
			expect(component.numberOfPages()).toBe(3);
		});

		it('should return null when pagination data is missing', () => {
			component.perPage.set(null);
			component.totalItems.set(25);
			expect(component.numberOfPages()).toBeNull();
		});
	});

	describe('Filtering System', () => {
		it('should identify headers with filters', () => {
			const headers: PaginableTableHeader[] = [
				{ title: 'Name', property: 'name', filter: { type: 'text' } },
				{
					title: 'Age',
					property: 'age',
					filter: { type: 'number-range' }
				},
				{ title: 'Email', property: 'email' }
			];
			component.headers.set(headers);

			const headerFilters = component.headerFilters();
			expect(headerFilters.length).toBe(2);
		});

		it('should detect inline column filters', () => {
			const headers: PaginableTableHeader[] = [
				{ title: 'Name', property: 'name', filter: { type: 'text' } }
			];
			component.headers.set(headers);

			expect(component.hasColumnFilters()).toBe(true);
		});

		it('should not detect menu-only filters as inline', () => {
			const headers: PaginableTableHeader[] = [
				{
					title: 'Name',
					property: 'name',
					filter: { type: 'text', mode: 'menu' }
				}
			];
			component.headers.set(headers);

			expect(component.hasColumnFilters()).toBe(false);
		});

		it('should clear filters', () => {
			// First add controls to the FormGroup using FormControl constructor
			component.filtersFG.addControl('name', new FormControl(''));
			component.filtersFG.addControl('age', new FormControl(''));

			component.filtersFG.patchValue({ name: 'John', age: 25 });
			expect(component.filtersFG.value.name).toBe('John');
			expect(component.filtersFG.value.age).toBe(25);

			component.clearFilters();
			// After reset(), form controls return to null (default Angular behavior)
			expect(component.filtersFG.value.name).toBeNull();
			expect(component.filtersFG.value.age).toBeNull();
		});
	});

	describe('Sorting Functionality', () => {
		it('should sort by column', () => {
			const header: PaginableTableHeader = {
				title: 'Name',
				property: 'name',
				sortable: true
			};

			component.sort(header);
			expect(component.ordination()?.property).toBe('name');
			expect(component.ordination()?.direction).toBe('ASC');
		});

		it('should toggle sort direction', () => {
			const header: PaginableTableHeader = {
				title: 'Name',
				property: 'name',
				sortable: true
			};

			component.ordination.set({ property: 'name', direction: 'ASC' });
			component.sort(header);
			expect(component.ordination()?.direction).toBe('DESC');

			component.sort(header);
			expect(component.ordination()?.direction).toBe('ASC');
		});

		it('should not sort non-sortable columns', () => {
			const header: PaginableTableHeader = {
				title: 'Name',
				property: 'name',
				sortable: false
			};

			const initialOrdination = component.ordination();
			component.sort(header);
			expect(component.ordination()).toBe(initialOrdination);
		});

		it('should return correct sort icon class', () => {
			const header: PaginableTableHeader = {
				title: 'Name',
				property: 'name',
				sortable: true
			};

			// No sort applied
			expect(component.getOrdenationClass(header)).toBe('hub-table__icon--sort');

			// ASC sort
			component.ordination.set({ property: 'name', direction: 'ASC' });
			expect(component.getOrdenationClass(header)).toBe('hub-table__icon--sort-up');

			// DESC sort
			component.ordination.set({ property: 'name', direction: 'DESC' });
			expect(component.getOrdenationClass(header)).toBe('hub-table__icon--sort-down');
		});
	});

	describe('Template System', () => {
		it('should retrieve header template', () => {
			const header: PaginableTableHeader = {
				title: 'Name',
				property: 'name'
			};
			const template = component.getHeaderTemplate(header);

			// In basic test setup, no templates are configured
			expect(template).toBeNull();
		});

		it('should retrieve cell template', () => {
			const header: PaginableTableHeader = {
				title: 'Name',
				property: 'name'
			};
			const template = component.getCellTemplate(header);

			expect(template).toBeNull();
		});

		it('should retrieve filter template', () => {
			const header: PaginableTableHeader = {
				title: 'Name',
				property: 'name'
			};
			const template = component.getFilterTemplate(header);

			expect(template).toBeNull();
		});
	});

	describe('Event Handling', () => {
		it('should handle row click events', () => {
			const mockEvent = new MouseEvent('click');
			const row: TableRow = {
				data: { id: 1, name: 'John' },
				selected: false,
				collapsed: true
			};

			// Test that onItemClick doesn't throw when no clickFn is set
			expect(() => component.onItemClick(mockEvent, row)).not.toThrow();
		});

		it('should not handle clicks when no click function is set', () => {
			const mockEvent = new MouseEvent('click');
			const row: TableRow = {
				data: { id: 1, name: 'John' },
				selected: false,
				collapsed: true
			};

			// Should not throw error
			expect(() => component.onItemClick(mockEvent, row)).not.toThrow();
		});

		it('should handle action button clicks', () => {
			const mockHandler = jasmine.createSpy('handler');
			const mockEvent = new MouseEvent('click');
			const row: TableRow = {
				data: { id: 1, name: 'John' },
				selected: false,
				collapsed: true
			};

			spyOn(mockEvent, 'stopPropagation');

			component.handleAction(mockEvent, mockHandler, row);

			expect(mockEvent.stopPropagation).toHaveBeenCalled();
			expect(mockHandler).toHaveBeenCalledWith(row);
		});

		it('should handle batch actions', () => {
			const mockHandler = jasmine.createSpy('handler');
			const button = { label: 'Delete', handler: mockHandler };

			component.value = [{ id: 1 }, { id: 2 }];
			component.handleBatchAction(button);

			expect(mockHandler).toHaveBeenCalledWith(component.value);
		});
	});

	describe('Expandable Rows', () => {
		it('should toggle row expansion', () => {
			const row: TableRow = {
				data: { id: 1, name: 'John' },
				selected: false,
				collapsed: true
			};

			component.toggleExpandedRow(row);
			expect(row.collapsed).toBe(false);

			component.toggleExpandedRow(row);
			expect(row.collapsed).toBe(true);
		});
	});

	describe('ControlValueAccessor Implementation', () => {
		it('should write value', () => {
			const value = [{ id: 1, name: 'John' }];
			component.writeValue(value);

			expect(component.value).toEqual(value);
		});

		it('should write single value as array', () => {
			const value = { id: 1, name: 'John' };
			component.writeValue(value);

			expect(component.value).toEqual([value]);
		});

		it('should handle null value', () => {
			component.writeValue(null);
			expect(component.value).toEqual([]);
		});

		it('should register onChange callback', () => {
			const callback = jasmine.createSpy('onChange');
			component.registerOnChange(callback);

			expect(component.onChange).toBe(callback);
		});

		it('should register onTouched callback', () => {
			const callback = jasmine.createSpy('onTouched');
			component.registerOnTouched(callback);

			expect(component.onTouch).toBe(callback);
		});

		it('should set disabled state', () => {
			component.setDisabledState(true);
			expect(component.disabled).toBe(true);

			component.setDisabledState(false);
			expect(component.disabled).toBe(false);
		});
	});

	describe('Utility Methods', () => {
		it('should check if array contains primitive values', () => {
			const items = [1, 2, 3];
			expect(component['_contains'](items, 2)).toBe(true);
			expect(component['_contains'](items, 4)).toBe(false);
		});

		it('should check if array contains objects', () => {
			const items = [
				{ id: 1, name: 'John' },
				{ id: 2, name: 'Jane' }
			];
			const needle = { id: 1, name: 'John' };

			expect(component['_contains'](items, needle)).toBe(true);
			expect(component['_contains'](items, { id: 3, name: 'Bob' })).toBe(
				false
			);
		});
	});

	describe('Performance and Memory Management', () => {
		it('should handle large datasets without performance issues', () => {
			const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
				id: i,
				name: `User ${i}`,
				email: `user${i}@example.com`
			}));

			const startTime = performance.now();
			const transformedRows = largeDataset.map((item) =>
				component.transformIntoRow(item)
			);
			fixture.detectChanges();
			const endTime = performance.now();

			// Should complete within reasonable time (less than 100ms)
			expect(endTime - startTime).toBeLessThan(100);
			expect(transformedRows.length).toBe(1000);
		});

		it('should properly cleanup when destroyed', () => {
			expect(fixture.componentRef).toBeTruthy();

			// Verify component exists before destroy
			expect(component).toBeTruthy();

			const destroySpy = spyOn(fixture.componentRef, 'destroy').and.callThrough();

			fixture.destroy();

			// Verify destroy was called
			expect(destroySpy).toHaveBeenCalled();
		});
	});
});
