import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { map, Observable, of, timer } from 'rxjs';
import { PaginableTableHeader, PaginableTablePagination } from '../../../../ng-paginable';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-reactive-form',
	templateUrl: './reactive-form.component.html',
	styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

	pagination$: Observable<PaginableTablePagination>;
	headers: (PaginableTableHeader | string)[] = [
		'id',
		'username',
		'email',
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	selectedItems: any[];

	form: UntypedFormGroup = this._fb.group({
		userIds: [[1, 2, 3]]
	});

	constructor(
		private _fb: UntypedFormBuilder,
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.fetch();
	}

	async fetch(event: any = {}) {
		event.searchKeys = this.searchKeys;
		this.pagination$ = timer(2048).pipe(map(_ => this._mockedUsersSvc.get(event)));
	}
}
