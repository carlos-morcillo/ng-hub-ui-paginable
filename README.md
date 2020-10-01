[![npm version](https://badge.fury.io/js/%40ng-select%2Fng-select.svg)](https://www.npmjs.com/package/nb-table-sorter)
<!-- [![Coverage Status][coveralls-image]][coveralls-url] -->
<!-- [![gzip bundle size](http://img.badgesize.io/https://unpkg.com/@80ymedia/ngx-paginable-table@latest/bundles/ng-select-ng-select.umd.min.js?compression=gzip&style=flat-square)][ngx-paginable-table] -->

<!-- [coveralls-image]: https://coveralls.io/repos/github/ng-select/ng-select/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/ng-select/ng-select?branch=master -->
[ngx-paginable-table]: https://unpkg.com/@80ymedia/ngx-paginable-table@latest

# Angular ngx-paginable-table - Lightweight all in one UI Select, Multiselect and Autocomplete
See [Demo] (https://ng-select.github.io/ng-select) page.

---

## Versions

| Angular  | ngx-paginable-table |
| -------- | :-----------------: |
| >=10.0.0 |        v2.x         |

---

Table of contents
=================

  * [Features](#features)
  * [Getting started](#getting-started)
  * [API](#api)
  * [Change detection](#change-detection)
  * [Custom styles](#custom-styles)
  * [Validation state](#validation-state)
  * [Contributing](#contributing)
  * [Development](#development)
  * [Inspiration](#inspiration)

## Features
- [x] Client or server paging
- [x] Pagination object designed for laravel but mappable to fit any backend.
- [x] Customizable header template
- [x] Customizable row template
- [x] Customizable cell template
- [x] Customizable "not found" template
- [x] Customizable pagination positioning
- [x] Hidden paging information
- [x] Hidden search engine
- [x] Drop-down rows
- [x] Customizable buttons per row
- [x] Sortable rows
- [x] Filter by general search engine
- [x] Option of number of items per page customizable
- [x] Selectable items
- [x] Responsive

## Warning
Library is under active development and may have API breaking changes for subsequent major versions after 1.0.0.

## Getting started
### Step 1: Install `@80ymedia/ngx-paginable-table`:

#### NPM
```shell
npm install --save @80ymedia/ngx-paginable-table
```
#### YARN
```shell
yarn add @80ymedia/ngx-paginable-table
```
### Step 2: Import the PaginableTableModule and angular FormsModule module:
```js
import { PaginableTableModule } from '@80ymedia/ngx-paginable-table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [PaginableTableModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

<!-- ### Step 3: Include a theme: 
To allow customization and theming, `ng-select` bundle includes only generic styles that are necessary for correct layout and positioning. To get full look of the control, include one of the themes in your application. If you're using the Angular CLI, you can add this to your `styles.scss` or include it in `.angular-cli.json` (Angular v5 and below) or `angular.json` (Angular v6 onwards).

```scss
@import "~@80ymedia/ngx-paginable-table/themes/default.theme.css";
// ... or 
@import "~@80ymedia/ngx-paginable-table/themes/material.theme.css";

``` -->


### Step 3 (Optional): Configuration 

You can also set global configuration and localization messages by injecting NgSelectConfig service,
typically in your root component, and customize the values of its properties in order to provide default values.

```js
  constructor(private config: NgSelectConfig) {
      this.config.notFoundText = 'Custom not found';
      this.config.appendTo = 'body';
      // set the bindValue to global config when you use the same 
      // bindValue in most of the place. 
      // You can also override bindValue for the specified template 
      // by defining `bindValue` as property
      // Eg : <ng-select bindValue="some-new-value"></ng-select>
      this.config.bindValue = 'value';
  }
```

## API
### Inputs
| Input                | Type                                                 | Default             | Required | Description                                                                                                                                                                                    |
| -------------------- | ---------------------------------------------------- | ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [showSearchInput]    | `boolean \| ((term: string) => any \| Promise<any>)` | `false`             | no       | Allows to create custom options.                                                                                                                                                               |
| [headers]            | `string`                                             | `Add item`          | no       | Set custom text when using tagging                                                                                                                                                             |
| [pagination]         | `string`                                             | `underline`         | no       | Allows to select dropdown appearance. Set to `outline` to add border instead of underline (applies only to Material theme)                                                                     |
| [rows]               | `string`                                             | null                | no       | Append dropdown to body or any other element using css selector. For correct positioning `body` should have `position:relative`                                                                |
| [selectable]         | `string`                                             | `-`                 | no       | Object property to use for selected model. By default binds to whole object.                                                                                                                   |
| [selectableProperty] | `string`                                             | `label`             | no       | Object property to use for label. Default `label`                                                                                                                                              |
| paginationPosition   | `string`                                             | true                | no       | Whether to close the menu when a value is selected                                                                                                                                             |
| [paginationInfo]     | `string`                                             | `Clear all`         | no       | Set custom text for clear all icon title                                                                                                                                                       |
| [searchKeys]         | `boolean`                                            | `true`              | no       | Allow to clear selected value. Default `true`                                                                                                                                                  |
| [actions]            | `boolean`                                            | `true`              | no       | Clear selected values one by one when clicking backspace. Default `true`                                                                                                                       |
| [perPageOptions]     | `(a: any, b: any) => boolean`                        | `(a, b) => a === b` | no       | A function to compare the option values with the selected values. The first argument is a value from an option. The second is a value from the selection(model). A boolean should be returned. |
| itemsPerPage         | `bottom` \| `top` \| `auto`                          | `auto`              | no       | Set the dropdown position on open                                                                                                                                                              |

### Outputs

| Output           | Description                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| (onSelected)     | Fired when item is added while `[selectable]="true"`. Outputs added items                     |
| (itemClick)      | Fired on row clicked                                                                          |
| (onPageClick)    | Fired on page number click. Outputs a parameter change event                                  |
| (onParamsChange) | Fired on sorter header click, page size change or on search. Outputs a parameter change event |

<!-- ### Methods
 | Name  | Description                      |
 | ----- | -------------------------------- |
 | open  | Opens the select dropdown panel  |
 | close | Closes the select dropdown panel |
 | focus | Focuses the select element       |
 | blur  | Blurs the select element         |  | --> |

### Other
 | Name                           | Type          | Description                                                                                                                |
 | ------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------- |
 | [ngPaginableTableHeader]       | directive     | Highlights search term in option. Accepts search term. Should be used on option element                                    |
 | [ngPaginableTableRow]          | directive     | Highlights search term in option. Accepts search term. Should be used on option element                                    |
 | [ngPaginableTableCell]         | directive     | Highlights search term in option. Accepts search term. Should be used on option element                                    |
 | [ngPaginableTableExpandingRow] | directive     | Highlights search term in option. Accepts search term. Should be used on option element                                    |
 | [ngPaginableTableNotFound]     | directive     | Highlights search term in option. Accepts search term. Should be used on option element                                    |
 | NgSelectConfig                 | configuration | Configuration provider for the NgSelect component. You can inject this service and provide application wide configuration. |
 | NbTableSorterConfig            | interface     | DI token for SelectionModel implementation. You can provide custom implementation changing selection behaviour             |
 | NbTableSorterHeader            | interface     | DI token for SelectionModel implementation. You can provide custom implementation changing selection behaviour             |
 | NbTableSorterItem              | interface     | DI token for SelectionModel implementation. You can provide custom implementation changing selection behaviour             |
 | NbTableSorterOptions           | interface     | DI token for SelectionModel implementation. You can provide custom implementation changing selection behaviour             |
 | NbTableSorterOrdination        | interface     | DI token for SelectionModel implementation. You can provide custom implementation changing selection behaviour             |
 | NbTableSorterRowAction         | interface     | DI token for SelectionModel implementation. You can provide custom implementation changing selection behaviour             |
 | NbTableSorterPagination        | interface     | DI token for SelectionModel implementation. You can provide custom implementation changing selection behaviour             |
 

## Custom table sorter mapping
Ng-select allows to provide custom selection implementation using `SELECTION_MODEL_FACTORY`. To override [default](https://github.com/ng-select/ng-select/blob/master/src/ng-select/lib/selection-model.ts) logic provide your factory method in your angular module.

```javascript
// app.module.ts
providers: [
    { provide: SELECTION_MODEL_FACTORY, useValue: <SelectionModelFactory>CustomSelectionFactory }
]

// selection-model.ts
export function CustomSelectionFactory() {
    return new CustomSelectionModel();
}

export class CustomSelectionModel implements SelectionModel {
    ...
}
```

<!-- ## Change Detection
Ng-select component implements `OnPush` change detection which means the dirty checking checks for immutable 
data types. That means if you do object mutations like:

```javascript
this.items.push({id: 1, name: 'New item'})
``` 

Component will not detect a change. Instead you need to do:

```javascript
this.items = [...this.items, {id: 1, name: 'New item'}];
```

This will cause the component to detect the change and update. Some might have concerns that
this is a pricey operation, however, it is much more performant than running `ngDoCheck` and
constantly diffing the array. -->

<!-- ## Custom styles
If you are not happy with default styles you can easily override them with increased selector specificity or creating your own theme. This applies if you are using no `ViewEncapsulation` or adding styles to global stylesheet. E.g.

```html
<ng-select class="custom"></ng-select>
```

```css
.ng-select.custom {
    border:0px;
    min-height: 0px;
    border-radius: 0;
}
.ng-select.custom .ng-select-container  {            
    min-height: 0px;
    border-radius: 0;
}
```

If you are using `ViewEncapsulation`, you could use special `::ng-deep` selector which will prevent scoping for nested selectors altough this is more of a workaround and we recommend using solution described above.

```css
.ng-select.custom ::ng-deep .ng-select-container  {            
    min-height: 0px;
    border-radius: 0;
}
```
WARNING: Keep in mind that ng-deep is deprecated and there is no alternative to it yet. See [Here](https://github.com/angular/angular/issues/17867).

### Validation state
By default when you use reactive forms validators or template driven forms validators css class `ng-invalid` will be applied on ng-select. You can show errors state by adding custom css style

```css
ng-select.ng-invalid.ng-touched .ng-select-container {
    border-color: #dc3545;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px #fde6e8;
}
``` -->

## Contributing

Contributions are welcome. You can start by looking at [issues](https://github.com/ng-select/ng-select/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) with label *Help wanted*  or creating new Issue with proposal or bug report.
Note that we are using https://conventionalcommits.org/ commits format.

## Development

Perform the _clone-to-launch_ steps with these terminal commands.

### Run demo page in watch mode
```
git clone https://github.com/ng-select/ng-select
cd ng-select
yarn
yarn run start
```
### Testing
```
yarn run test
or
yarn run test:watch
```

## Inspiration
This component is designed to simplify programming when using the Angular and Laravel frameworks. Since the backend technology can be diverse, it has been adapted to work with anyone.