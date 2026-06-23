import { Type } from '@angular/core';

/**
 * Runtime context handed to a state component's input factory when a default
 * component is rendered for the loading / error / no-results states.
 */
export interface PaginableStateContext {
	/** Number of columns the state cell spans (table only; undefined for list). */
	colspan?: number;
	/** Error captured while loading data. Only populated for the error state. */
	error?: unknown;
	/** Active filter values, when relevant (no-results state). */
	filters?: Record<string, unknown>;
}

/**
 * Lazy loader that resolves to a component class, enabling code-split default
 * state components (e.g. `() => import('./table-loading').then((m) => m.TableLoadingComponent)`).
 */
export type PaginableStateComponentLoader = () => Promise<Type<unknown>>;

/**
 * Full descriptor for a component-based default state. Lets callers attach an
 * input factory that maps the runtime context to the component's `@Input` values.
 */
export interface PaginableStateComponent {
	/** Component class, or a lazy loader resolving to one. */
	component: Type<unknown> | PaginableStateComponentLoader;
	/** Maps the runtime context to the component's `@Input` values. */
	inputs?: (ctx: PaginableStateContext) => Record<string, unknown>;
}

/**
 * Accepted shapes when registering a default state: a bare component class, a
 * lazy loader, or a full descriptor with an input factory.
 */
export type PaginableStateDefault = Type<unknown> | PaginableStateComponentLoader | PaginableStateComponent;

/**
 * A default state whose component class has already been resolved, ready to be
 * rendered through `NgComponentOutlet`.
 */
export interface ResolvedStateDefault {
	/** The resolved component class. */
	component: Type<unknown>;
	/** Maps the runtime context to the component's `@Input` values. */
	inputs?: (ctx: PaginableStateContext) => Record<string, unknown>;
}
