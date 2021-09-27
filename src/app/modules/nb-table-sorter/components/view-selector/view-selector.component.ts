import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { snakeCase } from 'lodash';
import { NbTableSorterHeader } from '../../interfaces/nb-table-sorter-header';
import { View } from '../../interfaces/view';
import { ModalService } from '../../service/modal.service';
import { ViewsService } from '../../service/views.service';
import { TableSorterComponent } from '../nb-table-sorter/table-sorter.component';

@Component({
	selector: 'view-selector',
	templateUrl: './view-selector.component.html',
	styleUrls: ['./view-selector.component.scss']
})
export class ViewSelectorComponent implements OnInit {

	@Output() change = new EventEmitter<View>();

	private _viewKey: string = null;
	get viewKey(): string {
		return this._viewKey;
	}
	set viewKey(v: string) {
		this._viewKey = v;
		this.switchView(this._viewKey);
	}

	get tableId(): string {
		return this.parent.id;
	}

	@ViewChild('viewSaverFormTpt', { read: ViewContainerRef }) viewSaverFormTpt: ViewContainerRef;

	form: FormGroup = this._fb.group({
		name: [null, Validators.required],
		conditions: this._fb.array([])
	});

	get conditionsFA(): FormArray {
		return this.form.get('conditions') as FormArray;
	}

	variables = {
		date: [{
			value: "{{ today }}",
			text: "TODAY",
		}, {
			value: "{{ yesterday }}",
			text: "YESTERDAY",
		}],
		daterange: [{
			value: "{{ today }}",
			text: "TODAY",
		}, {
			value: "{{ yesterday }}",
			text: "YESTERDAY",
		}, {
			value: "{{ current_week }}",
			text: "CURRENT_WEEK",
		}, {
			value: "{{ last_week }}",
			text: "LAST_WEEK",
		}, {
			value: "{{ current_month }}",
			text: "CURRENT_MONTH",
		}, {
			value: "{{ last_month }}",
			text: "LAST_MONTH",
		}, {
			value: "{{ current_year }}",
			text: "CURRENT_YEAR",
		}, {
			value: "{{ last_year }}",
			text: "LAST_YEAR",
		}]
	};

	viewSaveButtons: any[] = [
		{
			title: 'close',
			class: 'btn-outline-light',
			handler: () => this._modalSvc.close('filter-save-form')
		}, {
			title: 'save',
			class: 'btn-primary',
			handler: async () => {
				const view: View = this.form.value;

				if (!view.name) {
					alert(this._translateSvc.instant('MUST_PROVIDE_A_VIEW_NAME'));
					return;
				}
				if (!view.conditions.filter(o => o.value).length) {
					alert(this._translateSvc.instant('MUST_PROVIDE_VIEW_CONDITIONS'));
					return;
				}

				view.key = snakeCase(view.name);
				this._viewsSvc.push(this.tableId, view);
				this.parent.viewEdited.emit(this.form.value);

				// this.views = [...this.views];
				this._modalSvc.close('filter-save-form');
				this.switchView(view.key);
				this.value = view;
			}
		}
	];

	@Input() saveViewFn: () => Promise<boolean>;

	value: View;

	filterableHeaders: NbTableSorterHeader[];

	get views() {
		return this.parent.views;
	}

	constructor(
		private _fb: FormBuilder,
		private _translateSvc: TranslateService,
		private _viewsSvc: ViewsService,
		private _modalSvc: ModalService,
		private _componentFactoryResolver: ComponentFactoryResolver,
		public parent: TableSorterComponent,
	) { }

	ngOnInit(): void { }

	async switchView(key: string) {
		const view = this.views.find(o => o.key === key);
		if (view) {
			const value = view.conditions.reduce((acc, o) => ({ ...acc, [o.key]: o.value }), {});
			this.parent.filterFG.get('specificSearch').patchValue(value);
			this.change.emit(view);
		}
	}

	editView(view?: Partial<View>) {
		this._createForm();
		if (view) {
			const conditions = Array.isArray(view.conditions) ? view.conditions : this._conditionsObjectToArray(view.conditions);
			this.form.patchValue({ ...view, conditions });
		}
		this._modalSvc.open('filter-save-form');
	}

	deleteView(view: View) {
		this._viewsSvc.delete(this.tableId, view.key);
		this.parent.viewDeleted.emit(view);
		// this.views = [...this.views];
	}

	_createForm() {
		const headers: NbTableSorterHeader[] | string[] = this.parent.headers ?? []
		this.filterableHeaders = (headers as NbTableSorterHeader[]).filter(h => typeof h === 'object' && h.filter);

		const conditionsFA = this._fb.array([]);
		conditionsFA.clear();
		this.filterableHeaders.forEach(h => {
			const conditionFG = this._fb.group({
				key: this._fb.control(h.filter.key || h.property),
				operation: this._fb.control('equal'),
				value: this._fb.control(null)
			});
			conditionsFA.push(conditionFG);
		});

		this.form.removeControl('conditions')
		this.form.addControl('conditions', conditionsFA);

		if (this.parent.viewSaverForm) {
			const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.parent.viewSaverForm);
			this.viewSaverFormTpt.clear();
			this.viewSaverFormTpt.createComponent(componentFactory);
		}
	}

	private _conditionsObjectToArray(conditions: Object) {
		return Object.keys(conditions).map(k => ({
			key: k, operation: ((conditions[k]?.toString() ?? '').indexOf('{{') === 0 ? 'variable' : 'equal'), value: conditions[k]
		}));
	}
}
