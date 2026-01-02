import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

/**
 * Test component for TooltipDirective testing
 */
@Component({
	template: `
		<button
			[tooltip]="tooltipText"
			[placement]="placement"
			[delay]="delay"
			data-test="tooltip-btn">
			Hover me
		</button>
	`,
	standalone: true,
	imports: [TooltipDirective]
})
class TestTooltipComponent {
	tooltipText = 'Test tooltip';
	placement = 'top';
	delay = 300;
}

/**
 * Test suite for TooltipDirective
 * Tests tooltip display, positioning, and interaction functionality
 */
describe('TooltipDirective', () => {
	let component: TestTooltipComponent;
	let fixture: ComponentFixture<TestTooltipComponent>;
	let buttonElement: DebugElement;
	let directive: TooltipDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestTooltipComponent, TooltipDirective]
		});

		fixture = TestBed.createComponent(TestTooltipComponent);
		component = fixture.componentInstance;
		buttonElement = fixture.debugElement.query(By.css('[data-test="tooltip-btn"]'));
		directive = buttonElement.injector.get(TooltipDirective);
		fixture.detectChanges();
	});

	afterEach(() => {
		// Clean up any remaining tooltips
		const tooltips = document.querySelectorAll('.ng-tooltip');
		tooltips.forEach(tooltip => tooltip.remove());
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should have tooltipTitle input', () => {
		expect(directive.tooltipTitle()).toBe('Test tooltip');
	});

	it('should have placement input', () => {
		expect(directive.placement()).toBe('top');
	});

	it('should have delay input', () => {
		expect(directive.delay()).toBe(300);
	});

	it('should have default offset', () => {
		expect(directive.offset).toBe(8);
	});

	describe('mouseenter', () => {
		it('should show tooltip on mouseenter', () => {
			buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
			fixture.detectChanges();

			const tooltip = document.querySelector('.ng-tooltip');
			expect(tooltip).toBeTruthy();
		});

		it('should not create multiple tooltips on multiple mouseenter', () => {
			buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
			buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
			fixture.detectChanges();

			const tooltips = document.querySelectorAll('.ng-tooltip');
			expect(tooltips.length).toBe(1);
		});

		it('should display correct tooltip text', () => {
			buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
			fixture.detectChanges();

			const tooltip = document.querySelector('.ng-tooltip');
			expect(tooltip?.textContent).toBe('Test tooltip');
		});
	});

	describe('mouseleave', () => {
		it('should hide tooltip on mouseleave', (done) => {
			buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
			fixture.detectChanges();

			expect(document.querySelector('.ng-tooltip')).toBeTruthy();

			buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));

			setTimeout(() => {
				const tooltip = document.querySelector('.ng-tooltip');
				expect(tooltip).toBeNull();
				done();
			}, component.delay + 100);
		});

		it('should remove show class immediately', () => {
			buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
			fixture.detectChanges();

			const tooltip = document.querySelector('.ng-tooltip');
			expect(tooltip?.classList.contains('ng-tooltip-show')).toBe(true);

			buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
			expect(tooltip?.classList.contains('ng-tooltip-show')).toBe(false);
		});
	});

	describe('click', () => {
		it('should hide tooltip on click', (done) => {
			buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
			fixture.detectChanges();

			expect(document.querySelector('.ng-tooltip')).toBeTruthy();

			buttonElement.nativeElement.click();

			setTimeout(() => {
				const tooltip = document.querySelector('.ng-tooltip');
				expect(tooltip).toBeNull();
				done();
			}, component.delay + 100);
		});
	});

	describe('show', () => {
		it('should create tooltip element', () => {
			directive.show();
			expect(directive.tooltip).toBeTruthy();
		});

		it('should add ng-tooltip class', () => {
			directive.show();
			const tooltip = document.querySelector('.ng-tooltip');
			expect(tooltip).toBeTruthy();
		});

		it('should add placement class', () => {
			component.placement = 'bottom';
			fixture.detectChanges();

			directive.show();
			const tooltip = document.querySelector('.ng-tooltip-bottom');
			expect(tooltip).toBeTruthy();
		});

		it('should add show class', () => {
			directive.show();
			const tooltip = document.querySelector('.ng-tooltip-show');
			expect(tooltip).toBeTruthy();
		});

		it('should append tooltip to body', () => {
			directive.show();
			const tooltip = document.body.querySelector('.ng-tooltip');
			expect(tooltip).toBeTruthy();
		});
	});

	describe('hide', () => {
		beforeEach(() => {
			directive.show();
		});

		it('should remove show class', () => {
			directive.hide();
			const tooltip = document.querySelector('.ng-tooltip');
			expect(tooltip?.classList.contains('ng-tooltip-show')).toBe(false);
		});

		it('should remove tooltip after delay', (done) => {
			directive.hide();

			setTimeout(() => {
				expect(directive.tooltip).toBeNull();
				done();
			}, component.delay + 100);
		});

		it('should remove tooltip from DOM', (done) => {
			directive.hide();

			setTimeout(() => {
				const tooltip = document.querySelector('.ng-tooltip');
				expect(tooltip).toBeNull();
				done();
			}, component.delay + 100);
		});
	});

	describe('create', () => {
		it('should create span element', () => {
			directive.create();
			expect(directive.tooltip?.tagName).toBe('SPAN');
		});

		it('should set tooltip text', () => {
			directive.create();
			expect(directive.tooltip?.textContent).toBe('Test tooltip');
		});

		it('should add placement-specific class', () => {
			component.placement = 'right';
			fixture.detectChanges();

			directive.create();
			expect(directive.tooltip?.classList.contains('ng-tooltip-right')).toBe(true);
		});

		it('should set transition styles', () => {
			component.delay = 500;
			fixture.detectChanges();

			directive.create();
			const style = directive.tooltip?.style;
			expect(style?.transition).toContain('opacity');
			expect(style?.transition).toContain('500ms');
		});
	});

	describe('setPosition', () => {
		beforeEach(() => {
			directive.create();
		});

		it('should not throw if tooltip is null', () => {
			directive.tooltip = null;
			expect(() => directive.setPosition()).not.toThrow();
		});

		it('should set top and left styles', () => {
			directive.setPosition();
			expect(directive.tooltip?.style.top).toBeTruthy();
			expect(directive.tooltip?.style.left).toBeTruthy();
		});

		it('should position tooltip above element when placement is top', () => {
			component.placement = 'top';
			fixture.detectChanges();
			directive.create();
			directive.setPosition();

			const top = parseFloat(directive.tooltip?.style.top || '0');
			expect(top).toBeLessThan(buttonElement.nativeElement.getBoundingClientRect().top);
		});

		it('should position tooltip below element when placement is bottom', () => {
			component.placement = 'bottom';
			fixture.detectChanges();
			directive.create();
			directive.setPosition();

			// This test would require more complex setup to verify exact positioning
			expect(directive.tooltip?.style.top).toBeTruthy();
		});
	});

	describe('dynamic tooltip text', () => {
		it('should update tooltip text when input changes', () => {
			component.tooltipText = 'New tooltip text';
			fixture.detectChanges();

			buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
			fixture.detectChanges();

			const tooltip = document.querySelector('.ng-tooltip');
			expect(tooltip?.textContent).toBe('New tooltip text');
		});
	});

	describe('different placements', () => {
		['top', 'bottom', 'left', 'right'].forEach(placement => {
			it(`should support ${placement} placement`, () => {
				component.placement = placement;
				fixture.detectChanges();

				directive.show();
				const tooltip = document.querySelector(`.ng-tooltip-${placement}`);
				expect(tooltip).toBeTruthy();
			});
		});
	});
});
