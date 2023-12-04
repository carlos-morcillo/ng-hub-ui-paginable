import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { TypeaheadOptionDirective } from './directives/typeahead-option.directive';
import { FormsModule } from '@angular/forms';
import { TypeaheadFooterDirective } from './directives/typeahead-footer.directive';
import { TypeaheadHeaderDirective } from './directives/typeahead-header.directive';
import { TypeaheadNoItemsDirective } from './directives/typeahead-no-items.directive';
import { TypeaheadPlaceholderDirective } from './directives/typeahead-placeholder.directive';
import { TranslatePipe } from '../../translate.pipe';

@NgModule({
	declarations: [
		TypeaheadComponent,
		TypeaheadOptionDirective,
		TypeaheadFooterDirective,
		TypeaheadHeaderDirective,
		TypeaheadNoItemsDirective,
		TypeaheadPlaceholderDirective
	],
	imports: [CommonModule, FormsModule, TranslatePipe],
	exports: [
		TypeaheadComponent,
		TypeaheadOptionDirective,
		TypeaheadFooterDirective,
		TypeaheadHeaderDirective,
		TypeaheadNoItemsDirective,
		TypeaheadPlaceholderDirective
	]
})
export class TypeaheadModule {}
