import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../../../public_api';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
    selector: 'nb-batch-actions',
    templateUrl: './batch-actions.component.html',
    styleUrls: ['./batch-actions.component.scss']
})
export class BatchActionsComponent implements OnInit {

    items: any[];
    headers: (NbTableSorterHeader | string)[] = [
        'id',
        'username',
        'email',
        'name'
    ];
    searchKeys: string[] = ['id', 'username', 'email', 'name'];

    batchActions = [
        {
            title: 'export',
            handler: (items) => console.log('export', items)
        }
    ];

    constructor(
        private _mockedUsersSvc: MockedUsersService
    ) { }

    ngOnInit() {
        this.items = this._mockedUsersSvc.items;
    }
}
