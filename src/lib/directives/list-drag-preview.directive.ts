import { Directive, TemplateRef } from '@angular/core';

/**
 * Defines a custom drag preview (ghost) template for `hub-list` reordering.
 *
 * The preview is the visual that follows the pointer while dragging. With native HTML5
 * drag-and-drop it is rendered off-screen and passed to `dataTransfer.setDragImage`; with
 * the Pointer Events touch fallback it is cloned into a floating element. When no preview
 * template is provided, the browser default (native) or a clone of the row (touch) is used.
 * The template receives the dragged item via the `item` context property.
 *
 * @example
 * ```html
 * <ng-template hubListDragPreview let-item="item">
 *   <div class="my-ghost">{{ item?.name }}</div>
 * </ng-template>
 * ```
 */
@Directive({
	selector: '[hubListDragPreview], [listDragPreview]',
	standalone: true
})
export class HubListDragPreviewDirective {
	constructor(public template: TemplateRef<any>) {}
}
