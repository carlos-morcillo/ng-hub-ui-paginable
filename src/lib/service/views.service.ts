import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { View } from '../interfaces/view';
import { PaginableService } from '../services/paginable.service';

@Injectable({
	providedIn: 'root'
})
export class ViewsService {
	private _viewListKey!: string;
	get viewListKey(): string {
		return (
			this._viewListKey ??
			this._configSvc.config.views?.key ??
			'paginable-table_view_'
		);
	}
	set viewListKey(v: string) {
		this._viewListKey = v;
	}

	viewsChange$: Subject<void> = new Subject<void>();
	viewsFn$!: () => Observable<View[]>;
	setViewsFn$!: (tableId: string, view: View) => Observable<View[]>;

	constructor(private _configSvc: PaginableService) {}

	async push(tableId: string, view: View) {
		const views = this.getViews(tableId);
		const index = views.findIndex((o) => o.key === view.key);
		if (index > -1) {
			index > -1 ? views.splice(index, 1, view) : views.push(view);
		}
		views.push(view);

		// saving views
		if (this.setViewsFn$) {
			this.setViewsFn$(tableId, view);
		} else {
			localStorage.setItem(
				this.viewListKey + tableId,
				JSON.stringify(views)
			);
		}

		this.viewsChange$.next();
	}

	async delete(tableId: string, key: string) {
		// const views = await (firstValueFrom(this.getViews(tableId)) as Promise<View[]>);
		// const index = views.findIndex(o => o.key === key);
		// if (index > -1) {
		// 	views.splice(index, 1);
		// 	localStorage.setItem(this.viewListKey + tableId, JSON.stringify(views));
		// 	this.viewsChange$.next();
		// }
	}

	getViews(tableId: string): View[] {
		throw new Error('not developed');

		// return JSON.parse(localStorage.getItem(this.viewListKey + tableId)) ?? [] as View[];
	}
}
