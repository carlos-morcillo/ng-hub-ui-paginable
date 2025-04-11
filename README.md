
# Paginable
This is an Angular module that provides a table component with sorting and filtering capabilities.
Out-of-the-box integration with Laravel responses and other frameworks and Boostrap layout.

## Versions

| Angular          | ng-hub-ui-table |
|------------------|:---------:|
| >=16.0.0 |   v1.x    |

---

Table of contents
=================

  * [Features](#features)
  * [Getting started](#getting-started)
  * [Change detection](#change-detection)
  * [Custom styles](#custom-styles)
  * [Validation state](#validation-state)
  * [Contributing](#contributing)
  * [Development](#development)
  * [Inspiration](#inspiration)

## Features
- [x] Customizable pagination object
- [x] server or local pagination option
- [x] Filtering and sorting
- [x] Customization of headers, cells, filters, error message and no items message through templates
- [x] Columns with action buttons
- [x] Individual and multiple row selection
- [x] Integration of selection with reactive forms
- [x] Batch action buttons and dropdowns
- [x] Column resizing
- [x] Global and column-specific search engine
- [x] Adapted to Bootstrap 5,
- [x] Responsive table
- [x] Pagination customization options
- [x] Accessibility
- [x] Expandable columns

## Getting started
### Installation
To install this component, run the following command in your project directory: 


```shell
npm install ng-paginable --save 
```
## Usage

To use this component, import it into your module: 


```typescript
import { NgPaginableModule } from 'ng-paginable';  
@NgModule({   
	imports: [NgPaginableModule.forRoot()] 
}) 
export class AppModule {}      
```

```typescript
código del componente
```

```html
<paginable-table [headers]="headers" [pagination]="pagination">
</paginable-table>
```

### Table Options

The paginated table component accepts a `PaginableTableOptions` object to customize styling and behavior via the `@Input() options` binding.

The available options are:

- `serverSidePagination` - Enable server-side pagination. Default is false.

- `cursor` - Cursor style when hovering rows. `'pointer'` or `'default'`.

- `hoverableRows` - Enable highlight row on hover. Default `false`.

- `striped` - Stripe table `'rows'` or `'columns'`. 

- `variant` - Color variant for styled tables. Accepts any `string` value.

For example: 

```
@Component({

  // ...

})
export class TableComponent {

  options: PaginableTableOptions = {
    serverSidePagination: true,
    cursor: 'pointer',
    hoverableRows: true,  
    striped: 'columns',
    variant: 'dark'
  };

}
```

This enables server-side pagination, row hovering, column stripes, custom cursor, and a dark theme variant.

The `variant` property allows applying custom color theming to the table by passing any string value. Some common options are `'primary'`, `'secondary'`, `'success'`, `'danger'` etc.

This provides flexibility to customize the table styling based on your design system or theme requirements.

### Generating Headers

The headers for the paginated table are configured by passing an array of `PaginableTableHeader` objects. 

Each header can have the following properties:

- `title` - The text to display in the header cell.

- `property` - The key mapping to the property in the row data.

- `icon` - An optional icon to display next to the title text.

- `align` - Alignment of the text, either `'start'`, `'center'`, or `'end'`. Default is `'start'`.

- `sortable` - Whether the column can be sorted. Default is `false`.

- `wrapping` - Whether text in the column can wrap. Either `'wrap'` or `'nowrap'`. Default is `'nowrap'`.  

- `sticky` - Stick the header to the `'start'` or `'end'` of the table when scrolling.

- `buttons` - An array of buttons or dropdowns to display in the header.

- `filter` - Add filtering for the column. Can be either an `InputFilter` or `DropdownFilter`.

- `onlyButtons` - Hide the title and only show configured buttons.

#### Filtering

The `filter` property on a header can be used to enable filtering for a column. There are two types of filters:

##### Input Filter

An input filter displays a text input in the header:

```
filter: {
  type: 'text',
  key: 'name',
  placeholder: 'Filter names...' 
}
```

The `type` can be `'text'`, `'number'`, `'date'`, etc.

##### Dropdown Filter

A dropdown filter shows a select dropdown in the header:

```
filter: {
  type: 'dropdown',
  key: 'category',
  options: [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Furniture', value: 'furniture' }
  ]
}
```

The `options` can be an array, promise, or observable that provides the options for the select.

This allows adding rich filtering options for the paginated table headers.

#### Filter modes

The `mode` controls where the filter UI is displayed - either inline in the header cell or in a menu that toggles:

##### Inline Mode

Setting `mode: 'row'` will display the filter inline, embedded directly in the header cell:

```
filter: {
  mode: 'row',
  type: 'text',
  key: 'name'
}
```

This displays the filter UI directly in the header cell for that column.

##### Menu Mode

Setting `mode: 'menu'` will hide the filter UI behind a menu toggle:

```
filter: {
  mode: 'menu',  
  type: 'text',
  key: 'name'
}
```

This adds a menu toggle button to the header. When clicked, it opens a panel that displays the filter UI.

The menu mode is useful for hiding filters behind a toggle and keeping the header more compact.

So in summary:

- `mode: 'row'` displays the filter inline in the header cell.
- `mode: 'menu'` hides the filter UI behind a menu toggle.

The `mode` option gives flexibility in how the filter UI is presented in the headers.

### Batch Actions

The `batchActions` input allows defining action buttons and dropdowns that apply to the currently selected rows.

It takes an array of `PaginableTableDropdown` objects, each configuring a dropdown with action buttons:

``` typescript
@Component({

  // ...

})
export class TableComponent {

  batchActions: PaginableTableDropdown[] = [

    // Dropdown with action buttons
    {
      buttons: [
        {
          icon: 'fa fa-pencil', 
          title: 'Edit',
          handler: () => {
            // edit selected rows  
          }
        },
        {
          icon: 'fa fa-trash',
          title: 'Delete',
          color: 'danger', 
          handler: () => {
            // delete selected rows
          }
        }
      ]
    },

    // Single action button
    {
      icon: 'fa fa-file-export',
      title: 'Export',
      handler: () => {
        // export selected rows
      }
    }

  ];

}
```

``` html
<paginable-table
	[headers]="headers"
	[rows]="items"
	[batchActions]="batchActions"
	[(ngModel)]="selected"
>
</paginable-table>
```


Each button accepts properties for `icon`, `title`, `color` and `handler`.

The `handler` method will receive the array of selected rows as an argument.

This allows performing bulk actions on the currently selected rows in the table.

## Inputs

| Name  | Type | Default | Required | Description |
|:----------|:----------|:----------|:----------|:----------|
| options | PaginableTableOptions | - | false | Allows customizing the table's style, behavior, and pagination strategy through a flexible set of properties. |
| headers    | PaginableTableHeader | - | true | A boolean value that determines whether or not the table will display column headers. |
| pagination | PaginableTablePagination \| Observable\<PaginableTablePagination> | - | true | A boolean value that determines whether or not the table will display pagination control. |
| ordination | PaginableTableOrdination | - | false | A object representing the initial ordination. |
| rows    | Array\<any> | null | true | An array of objects, each object representing a row in the table. En este caso la paginación se generará automáticamente |
| batchActions | Array<PaginableTableDropdown \| PaginableTableButton> | [] | false | An array of objects, each object representing a batch action that can be applied to multiple rows at once. |
| perPageOptions | Array\<number>| [10, 20, 50, 100] | false | An array of numbers, each number representing an option for how many rows should be displayed per page. |
| responsive | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | null | false | A boolean value that determines whether or not the table will be responsive to different screen sizes. |
| id | string | null | false | A string value that is used as an identifier for the table component instance. |
| showSearchInput | boolean | true | false | A boolean value that determines whether or not a search input will be displayed at the top of the table. |
| selectable    | boolean    | false    | false    | Determines whether or not rows can be selected by clicking on them. |
| multiple    | boolean    | false    | false    | Determines whether or not multiple rows can be selected at once by clicking on them. |
| selectableProperty | string | null | false | The name of a property on each row object which indicates whether or not it is selectable. |
| paginationPosition | 'bottom' \| 'top' \| 'both' | 'bottom' | false | The position where pagination controls should be displayed (e.g., "top" or "bottom"). |
| paginationInfo | boolean | true | false | Determines whether or not pagination information is displayed. |
| searchKeys | Array<string> | [] | false | Determines in which properties the search has to be performed when the pagination is performed by the component itself. They can be properties not included in the headers. |


## Outputs
| Output  | Type | Description |
| ------------- | ------------- | ------------- |
| (onPageClick) | number | Fired on select blur |
| (onSelected)  | T \| Array<T> | Triggered when a row or multiples rows are selected or unselected |
| (onParamsChange) | PaginationParamsChangeEvent | Triggered when ordination or page change |
| (filterChange) | FilterChangeEvent | Triggered when filters change |

## Methods
 Name  | Description |
| ------------- | ------------- |
| open  | Opens the select dropdown panel |
| close  | Closes the select dropdown panel |
| focus  | Focuses the select element |
| blur  | Blurs the select element |

## Templates

Each of the following templates can be used for different purposes:

### No data message
The no data message template can be used to display a custom message when no results are found.
```html
<paginable-table [rows]="[]" [headers]="headers">
	<ng-template paginableTableNotFound>
		<div class="d-flex flex-column p-4 text-center">
			<img src="https://media.giphy.com/media/3ohA2ZD9EkeK2AyfdK/giphy.gif" alt="Sorry!" class="m-auto"
				style="width: 256px;">
			<div>
				<i class="fa fa-info-circle" aria-hidden="true"></i> Nothing has been found...
			</div>
		</div>
	</ng-template>
</paginable-table>
```

### Header
The header cell template can be used to customize each individual cell within the header.

```html
<paginable-table [headers]="headers" [rows]="items">
	<ng-template paginableTableHeader header="name" let-header="header">
		<div class="animate-character">Name</div>
	</ng-template>
</paginable-table>
```

### Row
The row template can be used to customize the entire content of a row.
```html
<paginable-table [headers]="headers" [rows]="items">
	<ng-template paginableTableRow let-item>
		<tr>
			<td>
				<img [src]="'assets/avatars/64_' + (item.id % 16 + 1) + '.png'" [alt]="item.name">
			</td>
			<td>{{ item.name }}</td>
			<td>{{ item.email }}</td>
			<td>
				<a class="btn btn-link" (click)="item.unfold  = !item.unfold">
					<i class="fa" [ngClass]="{'fa-chevron-down': !item.unfold, 'fa-chevron-up': item.unfold}"></i>
				</a>
			</td>
		</tr>
		<ng-container *ngIf="item.unfold">
			<tr>
				<td colspan="4">
					Columna personalizada
				</td>
			</tr>
			<tr>
				<td>
					Columna personalizada 1
				</td>
				<td>
					Columna personalizada 2
				</td>
				<td>
					Columna personalizada 3
				</td>
				<td>
				</td>
			</tr>
		</ng-container>
	</ng-template>
</paginable-table>
```

### Cell
The cell template can be used to customize each individual cell within a row.
```html
<paginable-table [headers]="headers" [rows]="items">
	<ng-template paginableTableCell header="avatar" let-item="item">
		<img
			[src]="'assets/avatars/64_' + ((item.id % 16) + 1) + '.png'"
			[alt]="item.name"
		/>
	</ng-template>
	<ng-template paginableTableCell header="name" let-property="property">
		<span class="badge badge-pill badge-info"> customized column </span>
		{{ property }}
	</ng-template>
	<ng-template paginableTableCell header="email" let-item="item">
		{{ item.email }}
		<span class="badge badge-pill badge-warning"> also customized </span>
	</ng-template>
</paginable-table>
```

### Loading
The loading template can be used to display a loading animation while results are being fetched.
```html
<paginable-table [headers]="headers" [pagination]="pagination">
	<ng-template paginableTableLoading>
		<div class="text-center">
			<img src="../images/loading.svg">
		</div>
	</ng-template>
</paginable-table>
```

### Error message
The error message template can be used to display a custom error message if there is an issue fetching results.

```html
<paginable-table [headers]="headers" [pagination]="pagination">
	<ng-template paginableTableError>
		<div class="text-center">
			<img src="../images/error.svg">
		</div>
	</ng-template>
</paginable-table>
```


### Expandable row
The expandable row template can be used to define the content that appears when a row is expanded.
```html
<paginable-table [headers]="headers" [rows]="items">
	<ng-template paginableTableExpandingRow let-item="item">
		<tr class="bg-warning">
			<td [attr.colspan]="headers.length + 1">
				<div class="d-flex">
					<div class="align-self-center pr-4">
						<img [src]="'assets/avatars/64_' + (item.id % 16 + 1) + '.png'" [alt]="item.name">
					</div>
					<div class="flex-grow">
						<h3>{{ item.email }}</h3>
						<h4>{{ item.name }}</h4>
					</div>
				</div>
			</td>
		</tr>
	</ng-template>
	<ng-template paginableTableExpandingRow let-item="item">
		<tr class="bg-warning">
			<td [attr.colspan]="headers.length + 1" class="bg-success">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo leo eget elementum
					condimentum.
				</p>
			</td>
		</tr>
	</ng-template>
</paginable-table>
```

### Filters
The filters template can be used to customize the appearance and behavior of filters for each column.
```html
<paginable-table
	(filterChange)="onFilterChange($event)"
	(onParamsChange)="fetch($event)"
	[selectable]="true"
	[headers]="headers"
	[pagination]="pagination"
>
	<ng-template
		paginableTableFilter
		header="email"
		let-header="header"
		let-formControl="formControl"
	>
		...
		<div
			class="form-check"
			*ngFor="let option of header.filter.options | async"
		>
			<input
				class="form-check-input"
				type="checkbox"
				[value]="option.value"
				[formControl]="formControl"
			/>
			<label class="form-check-label">
				{{ option.text }}
			</label>
		</div>
	</ng-template>
	...
</paginable-table>
```

## Other

Here is the documentation for ng-paginable-list in English:

### ng-paginable-list

The `ng-paginable-list` component allows rendering data in a nested, hierarchical list.

#### Basic Usage

To use it, simply pass the data structure to the `tree` input:

```html
<hub-ui-paginable-list [tree]="data"></hub-ui-paginable-list>
```

```ts
data = [
  {
    label: 'Item 1', 
    children: [
      {label: 'Subitem 1'},
      {label: 'Subitem 2'},
    ]
  },
  {
   label: 'Item 2'
  }
];
```

This will generate a list with the items and subitems.

#### Options

The available options are:

- `bindLabel` - Property of the item object to use as label
- `bindValue` - Property for the unique value of each item
- `bindChildren` - Property with child items
- `selectable` - Enables single or multiple selection. Values: `'single' | 'multiple'` 

#### Customization

You can use a template to customize the markup for each item. The `listItemTpt` template now receives the next parameters:

```html
<ng-template listItemTpt let-data="data" let-depth="depth" let-index="index" let-collapsed="collapsed" let-selected="selected">

</ng-template>  
```

Where:

- `data` - Item
- `depth` - Item depth
- `index` - Item index
- `collapsed` - Whether it is collapsed
- `selected` - Whether it is selected

```html
<hub-ui-paginable-list
  [items]="data"
  bindValue="id"
  bindChildren="subItems"
  selectable="multiple" 
  (clickFn)="onClick($event)">

  <ng-template
    listItemTpt
    let-data="data"
    let-depth="depth"
    let-selected="selected">
    
    <div>
     {{ data.name }} (depth: {{depth}}, selected: {{selected}})
    </div>
  
  </ng-template>

</hub-ui-paginable-list>
```

This allows fully customizing the rendered item.

#### Integration with Forms

The component implements `ControlValueAccessor` to integrate with reactive forms. 

The selected value will be available in the `formControl`.

#### Accessibility

The component properly manages focus and keyboard navigation for good accessibility.


### Translating Labels

ng-paginable includes predefined labels in English and Spanish that are used in the component's UI.

These labels can easily be replaced to support other languages or custom translations.

#### Default Translations

By default, ng-paginable uses the browser's language to select between English and Spanish. This displays the default labels without needing additional configuration.

#### Customizing Translations

You can provide custom translations to the `PaginableTranslationService`:

```typescript 
@Component({
  // ..
})
export class AppComponent {

  constructor(private translationService: PaginableTranslationService) {

    this.translationService.setTranslation({
      first: 'First',
      prev: 'Previous', 
      next: 'Next',
      last: 'Last'
      // ...
    });

  }

}
```

This overrides the default labels.

#### Integration with Translation Libraries 

To integrate ng-paginable with translation libraries like ngx-translate, you can subscribe to language changes:

```typescript
@Component({
  // ...  
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private translationService: PaginableTranslationService
  ) {

    this.translate.onLangChange.subscribe((event) => {

      this.translate.get('PAGINATION').subscribe((translations) => {
        this.translationService.setTranslation(translations);
      })

    });

  }

}
```

This way, when the language changes in the app, the pagination labels are updated.

This allows for complete, integrated translation across the UI.

#### Translation API

The `PaginableTranslationService` exposes the following methods:

```typescript
setTranslation(translations: PaginableTranslations) // sets translations
getTranslation(key: string) // gets a specific label
```

This provides full control over the labels and language used by the component.

With this flexible API it's straightforward to integrate ng-paginable with any translation strategy.

## Configuration (Optional)
You can also set global configuration and localization messages by passing a config to forRoot method of NgPaginableModule, typically in your root component, and customize the values of its properties in order to provide default values.

```typescript
  @NgModule({
	declarations: [UserListComponent],
	imports: [
		CommonModule,
		NgPaginableModule.forRoot({
			mapping: {
				currentPage: 'page',
				data: 'content',
				lastPage: 'last',
				total: 'total'
			}
		})
	],
	exports: [UserListComponent],
	providers: []
})
export class UserListModule {}
```

## Change Detection
Ng-paginable component implements `OnPush` change detection which means the dirty checking checks for immutable 
data types. That means if you do object mutations like:

```javascript
this.rows.push({id: 1, name: 'New item'})
``` 

Component will not detect a change. Instead you need to do:

```javascript
this.rows = [...this.rows, {id: 1, name: 'New item'}];
```

## Inspiring
This component was created to make it easier for developers to display data from Laravel paginated objects in an Angular table without having to write custom code. Over time, options for configuration were added to make it easier to use with any framework or with custom pagination structures.s

## Support
If you find this library helpful and want to support its development, consider [buying me a coffee](https://www.buymeacoffee.com/carlosmorcillo). Thank you for your support!

## About the author
Carlos Morcillo is a web developer and open source contributor. You can find more of his work on [this website](https://www.carlosmorcillo.com/).
