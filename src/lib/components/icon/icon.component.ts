/**
 * @file icon.component.ts
 * @description Angular component for rendering icons with support for different icon libraries.
 */

import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Icon } from '../../interfaces/paginable-table-header';
import { containsFontAwesomeClass } from '../../utils/icons';

/**
 * Defines the supported icon types.
 * @typedef {'font-awesome' | 'material' | 'bootstrap'} IconType
 */
export type IconType = 'font-awesome' | 'material' | 'bootstrap';

/**
 * @component HubIconComponent
 * @selector ng-hub-ui-icon
 * @description A versatile icon component that supports multiple icon libraries.
 *
 * @example
 * <ng-hub-ui-icon [config]="iconConfig"></ng-hub-ui-icon>
 */
@Component({
	selector: 'ng-hub-ui-icon',
	standalone: true,
	imports: [NgIf, NgClass],
	templateUrl: './icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HubIconComponent implements Icon {
	/**
	 * @input config
	 * @description Sets the icon configuration. Can be a string or an Icon object.
	 * @type {string | Icon}
	 */
	@Input({ required: true })
	set config(value: string | Icon) {
		if (!value) {
			value = '';
		}
		if (typeof value === 'string') {
			this.value = value;
		} else {
			this.type = value.type ?? null;
			this.variant = value.variant ?? '';
			this.value = value.value ?? null;
		}
	}

	/**
	 * @input type
	 * @description The type of icon (font-awesome, material, or bootstrap).
	 * @type {IconType}
	 */
	type: IconType;

	/**
	 * @input value
	 * @description The icon value or class name.
	 * @type {string}
	 */
	value: string;

	/**
	 * @input variant
	 * @description The variant of the icon (if applicable).
	 * @type {string}
	 */
	variant: string;

	/**
	 * @getter classlist
	 * @description Computes the CSS classes for the icon based on its type and value.
	 * @returns {string | null} The computed CSS class string or null if no value is set.
	 */
	get classlist(): string | null {
		if (!this.value) {
			return null;
		}

		if (!this.type) {
			return this.value;
		}

		const classlist: Array<string> = [];
		if (['font-awesome', 'bootstrap'].includes(this.type)) {
			if (Array.isArray(this.value)) {
				classlist.push(...this.value);
			} else {
				classlist.push(...this.value.split(' '));
			}
		}

		switch (this.type) {
			case 'font-awesome':
				if (!containsFontAwesomeClass(classlist.join(' '))) {
					classlist.push('fa');
				}
				break;
			case 'bootstrap':
				if (!containsFontAwesomeClass(classlist.join(' '))) {
					classlist.push('bs');
				}
				break;
			case 'material':
				classlist.push('material-symbols-outlined');
				break;
		}

		return classlist.join(' ');
	}

	/**
	 * @getter content
	 * @description Gets the content for material icons.
	 * @returns {string | null} The icon content for material icons, or null for other types.
	 */
	get content(): string | null {
		return ['material'].includes(this.type) ? this.value : null;
	}
}
