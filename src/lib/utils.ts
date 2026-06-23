import { Type } from '@angular/core';
import { PaginableStateComponentLoader, PaginableStateContext, PaginableStateDefault } from './interfaces/paginable-state';

/**
 * A `PaginableStateDefault` reduced to a single shape: exactly one of `component`
 * (an eagerly available class) or `loader` (a lazy resolver) is set, plus an
 * optional input factory.
 */
export interface NormalizedStateDefault {
	component?: Type<unknown>;
	loader?: PaginableStateComponentLoader;
	inputs?: (ctx: PaginableStateContext) => Record<string, unknown>;
}

/**
 * Tells an Angular component class apart from a lazy loader function. Component
 * classes carry the compiler-generated `ɵcmp` definition; a plain arrow function
 * loader does not. This avoids fragile `class` vs `function` heuristics.
 */
function isComponentType(value: unknown): value is Type<unknown> {
	return typeof value === 'function' && 'ɵcmp' in (value as object);
}

/**
 * Normalizes any accepted `PaginableStateDefault` shape into a single descriptor.
 * Keeps eager components and lazy loaders distinct so the resolution layer can
 * decide whether work is needed at startup.
 *
 * @param value The default state registration, or null/undefined when unset.
 * @returns The normalized descriptor, or null when nothing is registered.
 */
export function normalizeStateDefault(value: PaginableStateDefault | null | undefined): NormalizedStateDefault | null {
	if (!value) {
		return null;
	}

	if (isComponentType(value)) {
		return { component: value };
	}

	if (typeof value === 'function') {
		return { loader: value as PaginableStateComponentLoader };
	}

	const descriptor = value;
	const inner = normalizeStateDefault(descriptor.component);
	return inner ? { ...inner, inputs: descriptor.inputs } : null;
}
