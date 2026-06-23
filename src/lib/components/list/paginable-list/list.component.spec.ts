import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { HubTranslationService } from 'ng-hub-ui-utils';

import { SelectionTypes } from '../../../enums/selection-types';
import { ListComponent } from './list.component';

interface TestListItem {
	id: number;
	label: string;
}

class MockHubTranslationService {
	private readonly translationSource = new Subject<any>();
	readonly translationObserver = this.translationSource.asObservable();

	getTranslation(key: string) {
		const translations: Record<string, string> = {
			SEARCH: 'search',
			NO_RESULTS_FOUND: 'No results found',
			ROWS_PER_PAGE: 'Rows per page',
			SHOWING_X_OF_Y_ROWS: 'Showing {{amount}} of {{total}} rows'
		};
		return translations[key] || key;
	}

	setTranslations() {}
	initialize() {}
}

describe('ListComponent', () => {
	let component: ListComponent<TestListItem>;
	let fixture: ComponentFixture<ListComponent<TestListItem>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ListComponent],
			providers: [
				{
					provide: HubTranslationService,
					useClass: MockHubTranslationService
				}
			]
		});

		fixture = TestBed.createComponent(ListComponent<TestListItem>);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('items', [
			{ id: 1, label: 'First item' },
			{ id: 2, label: 'Second item' }
		]);
		fixture.detectChanges();
	});

	it('should create the list component', () => {
		expect(component).toBeTruthy();
	});

	it('should render the loading state when loading is set', () => {
		fixture.componentRef.setInput('loading', true);
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelector('.hub-list__loading')).toBeTruthy();
		expect(fixture.nativeElement.querySelectorAll('.hub-list__item-content').length).toBe(0);
	});

	it('should render the error state when error is set', () => {
		fixture.componentRef.setInput('error', new Error('boom'));
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelector('.hub-list__error')).toBeTruthy();
		expect(fixture.nativeElement.querySelectorAll('.hub-list__item-content').length).toBe(0);
	});

	it('should render the no-results state when there are no items', () => {
		fixture.componentRef.setInput('items', []);
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelector('.hub-list__no-results')).toBeTruthy();
	});

	it('should default selectable to null', () => {
		expect(component.selectable()).toBeNull();
		expect(component.multipleSelectable()).toBe(false);
	});

	it('should normalize boolean selectable values to single selection', () => {
		fixture.componentRef.setInput('selectable', true);
		fixture.detectChanges();

		expect(component.selectable()).toBe(SelectionTypes.Single);
		expect(component.multipleSelectable()).toBe(false);
	});

	it('should support multiple selection through SelectionTypes', () => {
		fixture.componentRef.setInput('selectable', SelectionTypes.Multiple);
		fixture.detectChanges();

		expect(component.selectable()).toBe(SelectionTypes.Multiple);
		expect(component.multipleSelectable()).toBe(true);
		expect(fixture.nativeElement.querySelectorAll('.hub-list__checkbox').length).toBe(2);
	});

	it('should render the initial per-page value in the selector', async () => {
		fixture.componentRef.setInput('paginate', true);
		fixture.detectChanges();
		// Allow the NgModel value accessor to apply the selected option.
		await fixture.whenStable();
		fixture.detectChanges();

		const select = fixture.nativeElement.querySelector('.hub-paginator__select') as HTMLSelectElement;
		expect(select).toBeTruthy();
		expect(select.selectedOptions[0]?.textContent?.trim()).toBe('10');
	});

	it('should apply rtl host class when options.rtl is enabled', () => {
		fixture.componentRef.setInput('options', {
			cursor: 'default',
			hoverableRows: false,
			striped: null,
			variant: null,
			searchable: false,
			collapsed: true,
			rtl: true
		});
		fixture.detectChanges();

		expect(fixture.nativeElement.classList.contains('hub-list--rtl')).toBe(true);
	});

	it('should render search button before input when rtl is enabled', () => {
		fixture.componentRef.setInput('options', {
			display: 'list',
			cursor: 'default',
			hoverableRows: false,
			striped: null,
			variant: null,
			searchable: true,
			collapsed: true,
			rtl: true
		});
		fixture.detectChanges();

		const searchElement = fixture.nativeElement.querySelector('.hub-list__search') as HTMLElement;
		expect(searchElement).toBeTruthy();
		expect(searchElement.firstElementChild?.classList.contains('hub-list__search-btn')).toBe(true);
	});

	it('should enable cards layout when options.display is cards', () => {
		fixture.componentRef.setInput('options', {
			display: 'cards',
			cursor: 'default',
			hoverableRows: false,
			striped: null,
			variant: null,
			searchable: false,
			collapsed: true,
			rtl: false
		});
		fixture.detectChanges();

		const rootList = fixture.nativeElement.querySelector('.hub-list__items--root') as HTMLElement;
		expect(rootList.classList.contains('hub-list__items--cards')).toBe(true);
	});
});
