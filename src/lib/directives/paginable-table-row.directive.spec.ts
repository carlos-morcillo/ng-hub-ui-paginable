import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginableTableRowDirective } from './paginable-table-row.directive';

/**
 * Test component for PaginableTableRowDirective
 */
@Component({
	template: `
		<ng-template paginableTableRow let-row>
			<div class="custom-row">{{ row.name }}</div>
		</ng-template>
	`,
	standalone: true,
	imports: [PaginableTableRowDirective]
})
class TestRowDirectiveComponent {
	@ViewChild(PaginableTableRowDirective, { static: true })
	directive!: PaginableTableRowDirective;
}

/**
 * Test suite for PaginableTableRowDirective
 * Tests custom row template directive functionality
 */
describe('PaginableTableRowDirective', () => {
	let component: TestRowDirectiveComponent;
	let fixture: ComponentFixture<TestRowDirectiveComponent>;
	let directive: PaginableTableRowDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestRowDirectiveComponent]
		});

		fixture = TestBed.createComponent(TestRowDirectiveComponent);
		component = fixture.componentInstance;
		directive = component.directive;
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should have a template reference', () => {
		expect(directive.template).toBeTruthy();
		expect(directive.template instanceof TemplateRef).toBe(true);
	});

	it('should be accessible via ViewChild', () => {
		expect(component.directive).toBe(directive);
	});

	it('should work with rowTpt selector', () => {
		@Component({
			template: `
				<ng-template rowTpt let-row>
					<div>{{ row.data }}</div>
				</ng-template>
			`,
			standalone: true,
			imports: [PaginableTableRowDirective]
		})
		class TestRowTptComponent {
			@ViewChild(PaginableTableRowDirective, { static: true })
			directive!: PaginableTableRowDirective;
		}

		const testFixture = TestBed.createComponent(TestRowTptComponent);
		testFixture.detectChanges();

		expect(testFixture.componentInstance.directive).toBeTruthy();
	});

	it('should provide template context', () => {
		expect(directive.template).toBeDefined();
	});
});
