import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionTypes } from '../../../enums/selection-types';
import { ListComponent } from './list.component';

interface TestListItem {
	id: number;
	label: string;
}

describe('ListComponent', () => {
	let component: ListComponent<TestListItem>;
	let fixture: ComponentFixture<ListComponent<TestListItem>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ListComponent]
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

	it('should default selectable to null', () => {
		expect(component.selectable()).toBeNull();
		expect(component.multipleSelectable()).toBeFalse();
	});

	it('should normalize boolean selectable values to single selection', () => {
		fixture.componentRef.setInput('selectable', true);
		fixture.detectChanges();

		expect(component.selectable()).toBe(SelectionTypes.Single);
		expect(component.multipleSelectable()).toBeFalse();
	});

	it('should support multiple selection through SelectionTypes', () => {
		fixture.componentRef.setInput('selectable', SelectionTypes.Multiple);
		fixture.detectChanges();

		expect(component.selectable()).toBe(SelectionTypes.Multiple);
		expect(component.multipleSelectable()).toBeTrue();
		expect(fixture.nativeElement.querySelectorAll('.hub-list__checkbox').length).toBe(2);
	});
});
