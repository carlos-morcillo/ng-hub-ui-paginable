import { Directive, TemplateRef } from '@angular/core';

/**
 * Defines a custom placeholder template for `hub-list` drag-and-drop reordering.
 *
 * The placeholder is rendered at the prospective drop position while an item is being
 * dragged. When no placeholder template is provided, the list renders a default dashed
 * drop slot. The template receives the dragged item via the `item` context property.
 *
 * @example
 * ```html
 * <ng-template hubListDragPlaceholder let-item="item">
 *   <div class="my-placeholder">Drop "{{ item?.name }}" here</div>
 * </ng-template>
 * ```
 */
@Directive({
	selector: '[hubListDragPlaceholder], [listDragPlaceholder]',
	standalone: true
})
export class HubListDragPlaceholderDirective {
	constructor(public template: TemplateRef<any>) {}
}
