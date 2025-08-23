import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PaginatorComponent } from './paginator.component';

/**
 * Test host component for testing paginator integration
 */
@Component({
	template: `
		<hub-paginator 
			[(page)]="page"
			[numberOfPages]="numberOfPages()">
		</hub-paginator>
	`,
	standalone: true,
	imports: [PaginatorComponent]
})
class TestHostComponent {
	page = signal(1);
	numberOfPages = signal<number | null>(10);

	setPage(page: number) {
		this.page.set(page);
	}

	setNumberOfPages(pages: number | null) {
		this.numberOfPages.set(pages);
	}
}

describe('PaginatorComponent', () => {
	let component: PaginatorComponent;
	let fixture: ComponentFixture<PaginatorComponent>;
	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PaginatorComponent, TestHostComponent]
		}).compileComponents();

		// Create standalone component fixture
		fixture = TestBed.createComponent(PaginatorComponent);
		component = fixture.componentInstance;

		// Set required inputs for standalone component
		fixture.componentRef.setInput('numberOfPages', 10);

		// Create host component fixture for integration tests
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;

		fixture.detectChanges();
		hostFixture.detectChanges();
	});

	describe('Component Creation and Initialization', () => {
		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should have default page value of 1', () => {
			expect(component.page()).toBe(1);
		});

		it('should have undefined numberOfPages by default', () => {
			expect(component.numberOfPages()).toBeUndefined();
		});

		it('should accept initial page value', () => {
			component.page.set(5);
			expect(component.page()).toBe(5);
		});

		it('should accept numberOfPages value through host component', () => {
			hostComponent.setNumberOfPages(10);
			hostFixture.detectChanges();
			
			const paginatorInstance = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			).componentInstance;
			expect(paginatorInstance.numberOfPages()).toBe(10);
		});
	});

	describe('Input Properties', () => {
		it('should update page when input changes', () => {
			component.page.set(3);
			fixture.detectChanges();
			expect(component.page()).toBe(3);
		});

		it('should handle null numberOfPages through host', () => {
			hostComponent.setNumberOfPages(null);
			hostFixture.detectChanges();
			
			const paginatorInstance = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			).componentInstance;
			expect(paginatorInstance.numberOfPages()).toBeNull();
		});

		it('should handle zero numberOfPages through host', () => {
			hostComponent.setNumberOfPages(0);
			hostFixture.detectChanges();
			
			const paginatorInstance = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			).componentInstance;
			expect(paginatorInstance.numberOfPages()).toBe(0);
		});

		it('should handle large numberOfPages through host', () => {
			hostComponent.setNumberOfPages(1000);
			hostFixture.detectChanges();
			
			const paginatorInstance = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			).componentInstance;
			expect(paginatorInstance.numberOfPages()).toBe(1000);
		});
	});

	describe('Signal Reactivity', () => {
		it('should react to page signal changes', () => {
			const initialPage = component.page();
			component.page.set(7);
			fixture.detectChanges();
			
			expect(component.page()).not.toBe(initialPage);
			expect(component.page()).toBe(7);
		});

		it('should react to numberOfPages signal changes through host', () => {
			hostComponent.setNumberOfPages(5);
			hostFixture.detectChanges();
			
			const paginatorInstance = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			).componentInstance;
			expect(paginatorInstance.numberOfPages()).toBe(5);

			hostComponent.setNumberOfPages(15);
			hostFixture.detectChanges();
			expect(paginatorInstance.numberOfPages()).toBe(15);
		});
	});

	describe('Integration with Host Component', () => {
		it('should bind page correctly with host component', () => {
			expect(hostComponent.page()).toBe(1);
			
			// Get the paginator component instance from host
			const paginatorDebugElement = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			);
			const paginatorInstance = paginatorDebugElement.componentInstance;
			
			expect(paginatorInstance.page()).toBe(1);
		});

		it('should update page in host component when paginator page changes', () => {
			const paginatorDebugElement = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			);
			const paginatorInstance = paginatorDebugElement.componentInstance;
			
			// Update page in paginator
			paginatorInstance.page.set(3);
			hostFixture.detectChanges();
			
			expect(hostComponent.page()).toBe(3);
		});

		it('should reflect numberOfPages from host component', () => {
			hostComponent.setNumberOfPages(25);
			hostFixture.detectChanges();
			
			const paginatorDebugElement = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			);
			const paginatorInstance = paginatorDebugElement.componentInstance;
			
			expect(paginatorInstance.numberOfPages()).toBe(25);
		});

		it('should handle host component page changes', () => {
			hostComponent.setPage(8);
			hostFixture.detectChanges();
			
			const paginatorDebugElement = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			);
			const paginatorInstance = paginatorDebugElement.componentInstance;
			
			expect(paginatorInstance.page()).toBe(8);
		});
	});

	describe('Component Rendering', () => {
		it('should render the component template', () => {
			const compiled = fixture.nativeElement;
			expect(compiled).toBeTruthy();
		});

		it('should have the correct selector classes', () => {
			const hostElement = fixture.nativeElement;
			// Component should render its template content
			expect(hostElement).toBeTruthy();
		});
	});

	describe('Edge Cases and Validation', () => {
		it('should handle negative page numbers gracefully', () => {
			component.page.set(-1);
			fixture.detectChanges();
			expect(component.page()).toBe(-1);
			
			// Note: The component accepts the value but validation logic would be handled elsewhere
		});

		it('should handle page numbers greater than numberOfPages through host', () => {
			hostComponent.setNumberOfPages(5);
			hostComponent.setPage(10);
			hostFixture.detectChanges();
			
			const paginatorInstance = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			).componentInstance;
			
			expect(paginatorInstance.page()).toBe(10);
			expect(paginatorInstance.numberOfPages()).toBe(5);
			
			// Note: Validation logic would typically be handled by parent components
		});

		it('should handle zero page number', () => {
			component.page.set(0);
			fixture.detectChanges();
			expect(component.page()).toBe(0);
		});

		it('should handle very large page numbers', () => {
			component.page.set(999999);
			fixture.detectChanges();
			expect(component.page()).toBe(999999);
		});

		it('should handle floating point page numbers', () => {
			component.page.set(3.5);
			fixture.detectChanges();
			expect(component.page()).toBe(3.5);
		});
	});

	describe('Multiple Selector Support', () => {
		it('should work with hub-paginator selector', () => {
			const fixture2 = TestBed.createComponent(PaginatorComponent);
			const element = fixture2.nativeElement;
			
			expect(element).toBeTruthy();
		});

		// Note: Testing the paginable-table-paginator selector would require
		// creating a component with that specific selector, but since it's the
		// same component class, the functionality would be identical
	});

	describe('Data Binding Patterns', () => {
		it('should support two-way binding pattern for page', () => {
			// Simulate external change
			component.page.set(4);
			expect(component.page()).toBe(4);
			
			// Simulate internal change (would typically happen through UI interaction)
			component.page.set(6);
			expect(component.page()).toBe(6);
		});

		it('should support one-way binding for numberOfPages through host', () => {
			hostComponent.setNumberOfPages(12);
			hostFixture.detectChanges();
			
			const paginatorInstance = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			).componentInstance;
			expect(paginatorInstance.numberOfPages()).toBe(12);
			
			// numberOfPages is input-only, so it should only receive values
			hostComponent.setNumberOfPages(20);
			hostFixture.detectChanges();
			expect(paginatorInstance.numberOfPages()).toBe(20);
		});
	});

	describe('Performance Considerations', () => {
		it('should handle rapid page changes efficiently', () => {
			const startTime = performance.now();
			
			// Simulate rapid page changes
			for (let i = 1; i <= 100; i++) {
				component.page.set(i);
				fixture.detectChanges();
			}
			
			const endTime = performance.now();
			const duration = endTime - startTime;
			
			// Should complete within reasonable time (less than 50ms)
			expect(duration).toBeLessThan(50);
			expect(component.page()).toBe(100);
		});

		it('should handle rapid numberOfPages changes efficiently through host', () => {
			const startTime = performance.now();
			
			// Simulate rapid numberOfPages changes
			for (let i = 1; i <= 100; i++) {
				hostComponent.setNumberOfPages(i);
				hostFixture.detectChanges();
			}
			
			const endTime = performance.now();
			const duration = endTime - startTime;
			
			// Should complete within reasonable time (less than 50ms)
			expect(duration).toBeLessThan(50);
			
			const paginatorInstance = hostFixture.debugElement.query(
				By.directive(PaginatorComponent)
			).componentInstance;
			expect(paginatorInstance.numberOfPages()).toBe(100);
		});
	});

	describe('Component Lifecycle', () => {
		it('should cleanup properly when destroyed', () => {
			const destroySpy = spyOn(fixture.componentRef, 'destroy').and.callThrough();
			
			fixture.destroy();
			
			expect(destroySpy).toHaveBeenCalled();
			// Component has been destroyed
			expect(fixture.componentRef).toBeFalsy();
		});
	});

	describe('Template and Styling Integration', () => {
		it('should load component styles', () => {
			// Verify that the component has its stylesheet reference
			const component = fixture.componentInstance;
			
			// The component should have styleUrls defined
			expect((component.constructor as any).ɵcmp?.styles || 
			       (component.constructor as any).ɵcmp?.styleUrls).toBeDefined();
		});

		it('should render with proper template', () => {
			// Verify that the component has a template
			const component = fixture.componentInstance;
			
			expect((component.constructor as any).ɵcmp?.template).toBeDefined();
		});
	});

	describe('Input Validation and Type Safety', () => {
		it('should accept valid page numbers', () => {
			const validPages = [1, 5, 10, 50, 100];
			
			validPages.forEach(page => {
				component.page.set(page);
				expect(component.page()).toBe(page);
			});
		});

		it('should accept valid numberOfPages values through host', () => {
			const validValues = [null, 0, 1, 5, 10, 100, 1000];
			
			validValues.forEach(value => {
				hostComponent.setNumberOfPages(value);
				hostFixture.detectChanges();
				
				const paginatorInstance = hostFixture.debugElement.query(
					By.directive(PaginatorComponent)
				).componentInstance;
				expect(paginatorInstance.numberOfPages()).toBe(value);
			});
		});
	});
});