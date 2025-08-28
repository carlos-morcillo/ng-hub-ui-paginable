# ng-hub-ui-paginable

## ✨ Inspiration

This library arises from the need to offer highly configurable, accessible, and modern data visualization components for Angular applications, enabling integrated lists, tables, and pagination with full support for signals, reactive forms, and complete render customization.

## 🧩 Library Family `ng-hub-ui`

`ng-hub-ui-paginable` is part of the `ng-hub-ui` ecosystem, a family of modern Angular components focused on user experience, productivity, and compatibility with Angular Signals. Each package solves a specific interface problem without overloading business logic.

## 📦 Description

`ng-hub-ui-paginable` provides three main components that work together seamlessly:

- **Table Component** (`<hub-ui-table>` or `<hub-table>`): Advanced data table with pagination, filtering, sorting, and selection
- **List Component** (`<hub-ui-list>` or `<hub-list>`): Hierarchical list with expandable items, selection, and custom templates  
- **Paginator Component** (`<hub-ui-paginator>` or `<hub-paginator>`): Standalone pagination controls
- **Additional Components**: Icons, dropdowns, resizable columns, range inputs, and filter menus

All components are built as standalone Angular components with full Angular Signals support.

## 🎯 Features

### Core Features
- **🔄 Full Angular Signals Support**: Built with modern Angular Signals architecture using `model()`, `input()`, `computed()`, and `effect()`
- **📊 Flexible Data Input**: Compatible with separate or grouped inputs via `PaginationState` for seamless integration
- **🔍 Advanced Filtering**: Column-specific filters with multiple types (text, dropdown, boolean, date-range, number-range)
- **📋 Smart Sorting**: Ascending/descending column sorting with visual indicators
- **☑️ Row Selection**: Single or multiple row selection with batch operations and ControlValueAccessor support
- **📈 Expandable Content**: Collapsible row content for detailed views with custom templates
- **📄 Dual Pagination**: Support for both local and remote pagination strategies
- **🎨 Template Customization**: Extensive custom templates for headers, cells, filters, states (empty, loading, error)
- **📱 Responsive Design**: Configurable responsive breakpoints for optimal mobile experience
- **♿ Accessibility Ready**: Built-in ARIA support and keyboard navigation
- **⚡ Performance Optimized**: Debounced search/filtering and efficient change detection
- **🌍 Internationalization**: Full i18n support with customizable translations (English/Spanish included)

### Advanced Features
- **🔧 Resizable Columns**: Interactive column width adjustment
- **📌 Sticky Columns**: Pin columns to start or end during horizontal scrolling
- **🎭 Dynamic Column Visibility**: Show/hide columns based on conditions, permissions, or user preferences
- **🔘 Action Buttons**: Row-level actions with dropdowns and conditional visibility
- **🎪 Custom Icons**: Support for FontAwesome, Material Icons, and Bootstrap Icons
- **🎨 Visual Variants**: Multiple styling options including striped, hoverable rows, and custom themes
- **🔍 Menu Filters**: Advanced filtering with dedicated filter panels
- **📋 Hierarchical Lists**: Tree-like data structures with expandable/collapsible nodes

## 🚀 Installation

```bash
npm install ng-hub-ui-paginable
```

## ⚙️ Usage

### Basic Table Setup

```typescript
import { Component, signal } from '@angular/core';
import { HubUITableModule } from 'ng-hub-ui-paginable';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [HubUITableModule],
  template: `
    <hub-ui-table
      [headers]="headers()"
      [data]="data()"
      [(page)]="page"
      [totalItems]="totalItems"
      [loading]="loading"
      [searchable]="true"
      [selectable]="true"
      [multiple]="true"
      [(searchTerm)]="searchTerm"
      [(ordination)]="ordination"
      [(filters)]="filters"
      [debounce]="300">
    </hub-ui-table>
  `
})
export class ExampleComponent {
  // Data and pagination
  data = signal<User[]>([]);
  page = signal(1);
  totalItems = signal(0);
  loading = signal(false);
  
  // Search and filtering
  searchTerm = signal('');
  filters = signal({});
  
  // Sorting
  ordination = signal<PaginableTableOrdination>();
  
  // Column configuration
  headers = signal<PaginableTableHeader[]>([
    {
      property: 'name',
      title: 'User Name',
      sortable: true,
      filter: { type: 'text', placeholder: 'Search by name...' }
    },
    {
      property: 'email',
      title: 'Email',
      align: 'center'
    },
    {
      property: 'status',
      title: 'Status',
      filter: {
        type: 'dropdown',
        options: ['Active', 'Inactive'],
        placeholder: 'Select status...'
      }
    }
  ]);
}
```

### List Component Usage

```html
<hub-ui-list
  [items]="items()"
  [selectable]="true"
  [bindLabel]="'name'"
  [bindChildren]="'children'"
  [options]="{ collapsed: false, searchable: true }"
  [clickFn]="onItemClick">
  
  <!-- Custom item template -->
  <ng-template listItem let-data="data" let-depth="depth">
    <div class="d-flex align-items-center">
      <span [style.margin-left.px]="depth * 20">
        {{ data.name }}
      </span>
      <span class="badge bg-secondary ms-auto">
        {{ data.type }}
      </span>
    </div>
  </ng-template>
</hub-ui-list>
```

### Standalone Paginator

```html
<hub-ui-paginator
  [(page)]="currentPage"
  [numberOfPages]="totalPages()">
</hub-ui-paginator>
```

## 🏗️ Table Headers Configuration (`PaginableTableHeader`)

The `PaginableTableHeader` interface is the core configuration for defining table columns. It provides extensive customization options for headers, sorting, filtering, actions, and visibility control.

### Basic Header Configuration

```typescript
const headers: PaginableTableHeader[] = [
  {
    property: 'name',
    title: 'User Name',
    sortable: true,
    align: 'start'
  },
  {
    property: 'email',
    title: 'Email Address',
    align: 'center',
    wrapping: 'nowrap'
  },
  {
    property: 'status',
    title: 'Status',
    align: 'end'
  }
];
```

### Header Properties Reference

| Property | Type | Description | Default | Example |
|----------|------|-------------|---------|---------|
| `property` | `string` | **Required.** Data property to display in this column | - | `'name'`, `'user.email'` |
| `title` | `string \| Observable<string>` | Column header title. Can be static or reactive | `property` value | `'User Name'`, `this.translate.get('user.name')` |
| `icon` | `string \| Icon` | Icon to display in header | - | `'fa-user'`, `{ type: 'material', value: 'person' }` |
| `align` | `'start' \| 'end' \| 'center'` | Text alignment for column | `'start'` | `'center'` for numbers |
| `sortable` | `boolean` | Enable sorting for this column | `false` | `true` |
| `wrapping` | `'wrap' \| 'nowrap'` | Text wrapping behavior | `'wrap'` | `'nowrap'` for IDs |
| `sticky` | `'start' \| 'end'` | Make column sticky during scroll | - | `'end'` for actions |
| `buttons` | `Array<RowButton \| PaginableTableDropdown>` | Action buttons in this column | - | See [Action Buttons](#action-buttons) |
| `filter` | `InputFilter \| DropdownFilter \| BooleanFilter` | Filter configuration | - | See [Column Filters](#column-filters) |
| `onlyButtons` | `boolean` | Optimize layout for button-only columns | `false` | `true` for action columns |
| `hidden` | `boolean \| Function` | Control column visibility | `false` | See [Column Visibility](#column-visibility) |

### Column Visibility Control (`hidden` Property) 🆕

The `hidden` property provides powerful and flexible ways to control column visibility dynamically. It supports multiple types for different use cases:

#### 1. Static Boolean Visibility

Simple show/hide based on a fixed value:

```typescript
const headers: PaginableTableHeader[] = [
  {
    property: 'id',
    title: 'ID',
    hidden: false // Always visible
  },
  {
    property: 'internal_notes',
    title: 'Internal Notes',
    hidden: true // Always hidden
  }
];
```

#### 2. Dynamic Function-Based Visibility

Control visibility based on current application state:

```typescript
export class UsersComponent {
  showAdvancedColumns = signal(false);
  userRole = signal<'admin' | 'user'>('user');

  headers: PaginableTableHeader[] = [
    {
      property: 'name',
      title: 'Name',
      // Always visible
    },
    {
      property: 'email',
      title: 'Email',
      hidden: () => !this.showAdvancedColumns() // Reactive to signal changes
    },
    {
      property: 'salary',
      title: 'Salary',
      hidden: () => this.userRole() !== 'admin' // Permission-based visibility
    },
    {
      property: 'last_login',
      title: 'Last Login',
      hidden: () => this.userRole() !== 'admin' && !this.showAdvancedColumns()
    }
  ];

  toggleAdvancedColumns() {
    this.showAdvancedColumns.update(show => !show);
  }
}
```

#### 3. Asynchronous Promise-Based Visibility

For visibility that depends on API calls or async operations:

```typescript
export class UsersComponent {
  constructor(
    private permissionService: PermissionService,
    private configService: ConfigService
  ) {}

  headers: PaginableTableHeader[] = [
    {
      property: 'sensitive_data',
      title: 'Sensitive Information',
      // Check permissions asynchronously
      hidden: () => this.permissionService.checkPermission('view.sensitive.data')
        .then(hasPermission => !hasPermission)
    },
    {
      property: 'feature_column',
      title: 'Feature Data',
      // Check feature flags
      hidden: () => this.configService.getFeatureFlag('show_feature_column')
        .then(enabled => !enabled)
    }
  ];
}
```

#### 4. Reactive Observable-Based Visibility

For real-time visibility updates from streams or state management:

```typescript
export class UsersComponent {
  constructor(
    private store: Store,
    private websocketService: WebSocketService
  ) {}

  headers: PaginableTableHeader[] = [
    {
      property: 'real_time_data',
      title: 'Live Data',
      // Visibility controlled by store state
      hidden: () => this.store.select(selectShowLiveData).pipe(
        map(showLive => !showLive)
      )
    },
    {
      property: 'admin_tools',
      title: 'Admin Tools',
      // Visibility from WebSocket updates
      hidden: () => this.websocketService.userRole$.pipe(
        map(role => role !== 'admin')
      )
    }
  ];
}
```

#### 5. Complex Visibility Logic

Combine multiple conditions for sophisticated visibility control:

```typescript
export class UsersComponent {
  screenSize = signal<'mobile' | 'tablet' | 'desktop'>('desktop');
  userPreferences = signal({ showOptionalColumns: true });
  isLoading = signal(false);

  headers: PaginableTableHeader[] = [
    {
      property: 'description',
      title: 'Description',
      hidden: () => {
        // Hide on mobile or when loading
        if (this.screenSize() === 'mobile' || this.isLoading()) {
          return true;
        }
        // Hide if user disabled optional columns
        return !this.userPreferences().showOptionalColumns;
      }
    }
  ];

  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;
    if (width < 768) {
      this.screenSize.set('mobile');
    } else if (width < 1024) {
      this.screenSize.set('tablet');
    } else {
      this.screenSize.set('desktop');
    }
  }
}
```

#### Template Usage Example

```html
<div class="table-controls mb-3">
  <button 
    type="button" 
    class="btn btn-outline-primary" 
    (click)="toggleAdvancedColumns()"
  >
    {{ showAdvancedColumns() ? 'Hide' : 'Show' }} Advanced Columns
  </button>
  
  <div class="form-check">
    <input 
      class="form-check-input" 
      type="checkbox" 
      [(ngModel)]="userPreferences().showOptionalColumns"
    >
    <label class="form-check-label">
      Show Optional Columns
    </label>
  </div>
</div>

<hub-ui-table
  [headers]="headers"
  [data]="users()"
  [loading]="isLoading()"
>
</hub-ui-table>
```

### Dynamic Column Management

You can also programmatically manage columns:

```typescript
export class DynamicTableComponent {
  availableColumns = [
    { key: 'name', label: 'Name', required: true },
    { key: 'email', label: 'Email', required: false },
    { key: 'phone', label: 'Phone', required: false },
    { key: 'department', label: 'Department', required: false }
  ];

  selectedColumns = signal(new Set(['name', 'email']));

  headers = computed(() => {
    const selected = this.selectedColumns();
    return this.availableColumns
      .filter(col => col.required || selected.has(col.key))
      .map(col => ({
        property: col.key,
        title: col.label,
        hidden: !selected.has(col.key) && !col.required
      }));
  });

  toggleColumn(columnKey: string) {
    this.selectedColumns.update(selected => {
      const newSelected = new Set(selected);
      if (newSelected.has(columnKey)) {
        newSelected.delete(columnKey);
      } else {
        newSelected.add(columnKey);
      }
      return newSelected;
    });
  }
}
```

### Best Practices for Column Visibility

1. **Performance**: Use signals and computed values for reactive visibility
2. **UX**: Provide clear UI controls for users to manage column visibility
3. **Persistence**: Consider saving column preferences to localStorage or user settings
4. **Accessibility**: Ensure hidden columns are properly handled by screen readers
5. **Mobile**: Hide non-essential columns on smaller screens automatically
6. **Permissions**: Use the hidden property for role-based column access control

## 🔧 Resizable Columns

The library includes a resizable component for interactive column width adjustment:

```html
<hub-ui-table [headers]="headers">
  <!-- Custom header with resizable functionality -->
  <ng-template headerTpt header="name">
    <th resizable>
      Resizable Column
    </th>
  </ng-template>
</hub-ui-table>
```

```typescript
// Enable resizing programmatically
import { ResizableComponent, ResizableDirective } from 'ng-hub-ui-paginable';

// Use the resizable directive on table headers
@Component({
  imports: [ResizableDirective]
})
```

### Resizable Features
- **Interactive Resize**: Click and drag column borders to adjust width
- **Minimum Width**: Prevent columns from becoming too narrow
- **Persistence**: Column widths can be saved and restored
- **Responsive**: Works with responsive table layouts

## 🎪 Additional Components

### Icon Component (`<hub-ui-icon>`)

Supports multiple icon libraries with unified interface:

```html
<!-- FontAwesome icon -->
<hub-ui-icon [config]="{ type: 'font-awesome', value: 'user' }"></hub-ui-icon>

<!-- Material icon -->
<hub-ui-icon [config]="{ type: 'material', value: 'person', variant: 'outlined' }"></hub-ui-icon>

<!-- Bootstrap icon -->
<hub-ui-icon [config]="{ type: 'bootstrap', value: 'person-fill' }"></hub-ui-icon>
```

### Dropdown Component (`<hub-ui-dropdown>`)

Used internally for action buttons and filters:

```typescript
interface PaginableTableDropdown {
  title: string;
  buttons: RowButton[];
  fill?: string;
  position?: 'start' | 'end';
  color?: string;
}
```

### Range Input Component (`<hub-ui-range-input>`)

Specialized component for number and date range filters:

```html
<hub-ui-range-input
  [type]="'number'"
  [placeholder]="'Min - Max'"
  [formControl]="rangeControl">
</hub-ui-range-input>
```

### Menu Filter Component (`<hub-ui-menu-filter>`)

Advanced filtering component with multiple input types:

```html
<hub-ui-menu-filter
  [type]="'date-range'"
  [formControl]="filterControl"
  [options]="filterOptions">
</hub-ui-menu-filter>
```

### Action Buttons

Configure action buttons in table columns for row-level operations:

```typescript
const headers: PaginableTableHeader[] = [
  {
    property: 'actions',
    title: 'Actions',
    onlyButtons: true,
    sticky: 'end',
    buttons: [
      {
        icon: 'fa-edit',
        title: 'Edit',
        color: 'primary',
        handler: (row) => this.editUser(row.data),
        hidden: (row) => !row.data.canEdit
      },
      {
        title: 'More Actions',
        buttons: [
          { title: 'Archive', handler: (row) => this.archiveUser(row.data) },
          { title: 'Delete', handler: (row) => this.deleteUser(row.data) }
        ]
      }
    ]
  }
];
```

### Column Filters

Add filtering capabilities to columns with various filter types:

#### Text Filter
```typescript
{
  property: 'name',
  title: 'Name',
  filter: {
    type: 'text',
    mode: 'row',
    placeholder: 'Search by name...'
  }
}
```

#### Dropdown Filter
```typescript
{
  property: 'status',
  title: 'Status',
  filter: {
    type: 'dropdown',
    mode: 'menu',
    options: ['Active', 'Inactive', 'Pending'],
    placeholder: 'Select status...'
  }
}
```

#### Boolean Filter
```typescript
{
  property: 'verified',
  title: 'Verified',
  filter: {
    type: 'boolean',
    mode: 'row',
    trueLabel: 'Verified',
    falseLabel: 'Not Verified'
  }
}
```

#### Date Range Filter
```typescript
{
  property: 'created_at',
  title: 'Created Date',
  filter: {
    type: 'date-range',
    mode: 'menu',
    placeholder: 'Select date range...'
  }
}
```

#### Number Range Filter
```typescript
{
  property: 'price',
  title: 'Price',
  filter: {
    type: 'number-range',
    mode: 'row',
    placeholder: 'Min - Max price'
  }
}
```

### Filter Modes

Filters can be displayed in two modes:

- **`row`**: Filter appears directly under the column header in a dedicated filter row
- **`menu`**: Filter appears in a dropdown menu accessible via a filter button in the header

### Available Filter Types

| Type             | Description                           | Input Controls                    |
|------------------|---------------------------------------|-----------------------------------|
| `text`           | Text search filter                    | Single text input                 |
| `number`         | Numeric value filter                  | Single number input               |
| `number-range`   | Range of numeric values               | Two number inputs (min/max)       |
| `date`           | Single date filter                    | Date picker                       |
| `date-range`     | Date range filter                     | Two date pickers (from/to)        |
| `boolean`        | True/false filter                     | Dropdown with custom labels       |
| `dropdown`       | Selection from predefined options     | Dropdown/select control           |

## 🪄 API Reference

### Table Component (`<hub-ui-table>`)

#### Inputs

| Name                | Type                             | Default | Description                                                                 |
|---------------------|----------------------------------|---------|-----------------------------------------------------------------------------|
| `headers`           | `PaginableTableHeader[]`         | `[]`    | Column definitions with titles, sorting, filtering, and actions.            |
| `data` / `rows`     | `T[]` or `PaginationState<T>`    | `[]`    | Table data - can be flat array or paginated object with metadata.          |
| `page`              | `number`                         | `null`  | Current page number (1-based, model signal).                               |
| `perPage`           | `number`                         | `null`  | Number of items per page.                                                   |
| `perPageOptions`    | `number[]`                       | `[20, 50, 100]` | Available options for items per page.                          |
| `totalItems`        | `number`                         | `null`  | Total number of items across all pages.                                    |
| `searchable`        | `boolean`                        | `true`  | Whether to show the global search input.                                   |
| `searchTerm`        | `string`                         | `''`    | Current search term (model signal).                                        |
| `searchFn`          | `(a: T, b: T) => boolean`        | `null`  | Custom search function for filtering.                                      |
| `selectable`        | `boolean`                        | `false` | Whether rows can be selected.                                               |
| `multiple`          | `boolean`                        | `false` | Whether multiple row selection is allowed.                                  |
| `bindValue`         | `string`                         | `null`  | Property used to uniquely identify selected items.                          |
| `ordination`        | `PaginableTableOrdination`       | `null`  | Current sorting configuration (model signal).                              |
| `filters`           | `Record<string, any>`            | `{}`    | Active column filters (model signal).                                      |
| `debounce`          | `number`                         | `0`     | Debounce time in ms for search and filter inputs.                          |
| `loading`           | `boolean`                        | `false` | Loading state indicator (model signal).                                    |
| `paginate`          | `boolean`                        | `true`  | Whether to enable pagination.                                               |
| `paginationPosition`| `'top' \| 'bottom' \| 'both'`    | `'bottom'` | Where to display pagination controls.                                    |
| `paginationInfo`    | `boolean`                        | `true`  | Whether to show pagination info (e.g., "Showing 1 to 10 of 100").         |
| `stickyActions`     | `boolean`                        | `false` | Whether action buttons should stick during scrolling.                      |
| `batchActions`      | `Array<PaginableTableDropdown \| ListButton>` | `[]` | Actions available for selected rows.                 |
| `responsive`        | `TableBreakpoint`                | `null`  | Responsive breakpoint for table layout.                                    |
| `options`           | `PaginableTableOptions`          | `{}`    | Visual configuration (cursor, hover, striped, variant).                    |
| `clickFn`           | `(event: TableRowEvent<T>) => void` | `null` | Handler for row click events.                                             |

#### Outputs & Events

The table component implements `ControlValueAccessor`, enabling two-way binding with `[(ngModel)]` or reactive forms:

```html
<!-- With ngModel -->
<hub-ui-table [(ngModel)]="selectedItems" [multiple]="true">
</hub-ui-table>

<!-- With reactive forms -->
<hub-ui-table [formControl]="selectedItemsControl">
</hub-ui-table>

<!-- Row click events -->
<hub-ui-table [clickFn]="handleRowClick">
</hub-ui-table>
```

**Row Click Event (`TableRowEvent<T>`):**
```typescript
interface TableRowEvent<T> {
  data: T;           // Row data
  selected: boolean; // Selection state
  collapsed: boolean; // Expansion state
  event: MouseEvent;  // Original mouse event
}
```

### List Component (`<hub-ui-list>`)

#### Inputs

| Name             | Type                                         | Default     | Description                                                    |
|------------------|----------------------------------------------|-------------|----------------------------------------------------------------|
| `items`          | `T[]`                                        | `[]`        | Hierarchical list data.                                       |
| `bindValue`      | `string`                                     | `null`      | Property for unique item identification.                      |
| `bindLabel`      | `string`                                     | `'label'`   | Property to display as item label.                           |
| `bindChildren`   | `string`                                     | `'children'`| Property containing child items.                              |
| `selectable`     | `string`                                     | `null`      | Selection mode configuration.                                 |
| `options`        | `PaginableTableOptions`                      | `{}`        | Visual and behavioral options.                                |
| `batchActions`   | `Array<PaginableTableDropdown \| ListButton>` | `[]`      | Actions for selected items.                                   |
| `clickFn`        | `(event: ListClickEvent<T>) => void`         | `null`      | Handler for item click events.                               |

**List Click Event (`ListClickEvent<T>`):**
```typescript
interface ListClickEvent<T> {
  depth: number;        // Nesting level
  index: number;        // Item position
  selected: boolean;    // Selection state
  collapsed: boolean;   // Expansion state
  value: any;          // Item value (based on bindLabel)
  item: T;             // Full item data
  mouseEvent: MouseEvent; // Original mouse event
}
```

### Paginator Component (`<hub-ui-paginator>`)

#### Inputs

| Name           | Type     | Default | Description                    |
|----------------|----------|---------|--------------------------------|
| `page`         | `number` | `1`     | Current page (model signal).  |
| `numberOfPages`| `number` | `null`  | Total number of pages.        |

## 🎠 Templates

The `hub-ui-table` component allows you to override almost any visual section using Angular templates (`<ng-template>`). This allows you to adapt the visualization of each cell, header, or special content to your specific needs.
⏹
### 🔠 headerTpt (column header)

Allows replacing the content of a specific header.

```html
<ng-template headerTpt header="name">
  <span class="text-primary fw-bold">Full Name</span>
</ng-template>
```

```html
<ng-template headerTpt header="birthday">
  <i class="fa-solid fa-cake-candles me-2"></i> Date of Birth
</ng-template>
```

### 📄 cellTpt (column cell)

Overrides the visualization of a specific cell.

```html
<ng-template cellTpt header="name" let-data="data">
  {{ data.name.toUpperCase() }}
</ng-template>
```

```html
<ng-template cellTpt header="age" let-data="data">
  <span [class.text-success]="data.age >= 18"> {{ data.age }} years </span>
</ng-template>
```

```html
<ng-template cellTpt header="adult" let-data="data">
  <hub-ui-icon
    [config]="{ type: 'material', value: data.adult ? 'check' : 'close' }"
  ></hub-ui-icon>
</ng-template>
```

### 🚫 notFoundTpt (empty state)

Displays custom content when there is no data to show.

```html
<ng-template notFoundTpt>
  <div class="alert alert-info text-center">
    <i class="fa-solid fa-circle-info me-2"></i>
    No results found for your search.
  </div>
</ng-template>
```

### ⏳ loadingTpt (loading state)

Renders content while `loading` is `true`.

```html
<ng-template loadingTpt>
  <div class="text-center p-4">
    <div class="spinner-border text-primary" role="status"></div>
    <p>Loading data, please wait...</p>
  </div>
</ng-template>
```

### ❌ errorTpt (error state)

Displayed if there is an error template configured and it is manually triggered from the component.

```html
<ng-template errorTpt>
  <div class="alert alert-danger text-center">
    <i class="fa-solid fa-triangle-exclamation me-2"></i>
    An unexpected error has occurred. Try reloading the table.
  </div>
</ng-template>
```

### 📂 rowTpt (custom row)

Allows you to completely redefine the structure of a row. Useful when the table is not used as a `<table>` but as a `<div>`, or if you need a "card"-type display.

```html
<ng-template tableRow let-item>
  <tr>
    <td>{{ item.name }}</td>
    <td>{{ item.lastname }}</td>
    <td>{{ item.age }} years</td>
  </tr>
</ng-template>
```

You can also use `tableRowTpt` with expandable components.

---

## 🧩 Styling

The `ng-hub-ui-paginable` library (specifically `hub-ui-table`) is fully style-configurable through **CSS custom properties (CSS variables)**. These variables follow a consistent naming convention based on a SCSS prefix (`hub-`) and can be easily overridden to adapt to any design system, including **Bootstrap**.

### 🌱 Base styles and integration

The base styles for the table component are located in the `table.scss` file inside the library:

```scss
// projects/paginable/src/lib/styles/table.scss
$tablePrefix: hub- !default;

.hub-table {
  --#{$tablePrefix}body-color: #212529;
  --#{$tablePrefix}body-bg: #fff;
  --#{$tablePrefix}border-width: 1px;
  --#{$tablePrefix}border-color: #dee2e6;
  --#{$tablePrefix}border-radius: 0.375rem;
}
```

All component styles are scoped under the .hub-table block and follow the pattern --hub-\<element>-\<property>, allowing fine-grained control of the table’s appearance.

### 🔗 How to include the styles in your application

To use the styles from ng-hub-ui-paginable, you need to import the base SCSS file from the compiled library into your main application’s styles.scss (or equivalent global style entry point):

```scss
@use 'bootstrap'; // Optional but recommended
@use 'ng-hub-ui-paginable/src/lib/styles/table.scss';
```

✅ Tip: Using @use instead of @import ensures proper scoping and avoids polluting the global namespace.

### 🎛 Customizing styles via CSS variables

Once the styles are imported, you can override any exposed CSS variable directly in your project using class selectors, wrappers, or CSS scopes.

Example: Customize the table search input and background color:

```scss
.hub-table {
  --hub-body-color: #343a40;
  --hub-body-bg: #f8f9fa;
  --hub-border-color: #ced4da;
  --hub-border-radius: 0.5rem;
}
```

Or for a specific section like the search input:

```scss
.hub-table__search-input {
  --hub-body-color: #0d6efd;
  --hub-border-color: #0d6efd;
}
```

This approach allows you to adapt the component to your theme without modifying the source code.

### ⚙️ Seamless Bootstrap integration

hub-ui-table is designed to integrate seamlessly with Bootstrap 5:
	•	Table layout and form controls (inputs, buttons) use Bootstrap variables and sizing.
	•	Utilities like gap, align-items, text-*, and btn classes are compatible.
	•	You can reuse Bootstrap color tokens via var(--bs-*) in overrides.

Example override using Bootstrap’s color system:

```scss
.hub-table__pagination-info {
  color: var(--bs-secondary);
}
.hub-table__search-button {
  border-color: var(--bs-border-color);
}
```

### 🎨 Theming and scalability

You can define light/dark modes or any theme variations using scoped CSS:

```scss
.dark-theme .hub-table {
  --hub-body-bg: #1e1e1e;
  --hub-body-color: #f1f1f1;
  --hub-border-color: #444;
}
```

You can also create reusable utility classes for different table variants:

```scss
.table-compact .hub-table {
  --hub-border-radius: 0.2rem;
  font-size: 0.875rem;
}
```

This makes hub-ui-table a solid foundation for UI systems that require high flexibility and visual consistency across projects.

## ⚡ Performance Tips

### Debounce Search and Filters

```html
<hub-ui-table
  [debounce]="300"
  [searchable]="true">
</hub-ui-table>
```

### Use Angular Signals for Reactive Data

```typescript
export class MyComponent {
  // Reactive data with signals
  data = signal<User[]>([]);
  filteredData = computed(() => 
    this.data().filter(user => user.active)
  );
  
  // Server-side pagination
  paginationState = computed(() => ({
    page: this.currentPage(),
    perPage: this.pageSize(),
    totalItems: this.totalCount(),
    data: this.filteredData()
  }));
}
```

### Optimize Large Datasets

For large datasets, consider:
- **Server-side pagination**: Only load data for current page
- **Server-side filtering**: Apply filters on the backend
- **Debounced search**: Use the built-in debounce functionality
- **Lazy loading**: Load data as needed

```typescript
// Server-side data management
async loadData(page: number, filters: any, search: string) {
  this.loading.set(true);
  try {
    const result = await this.dataService.getUsers({
      page,
      filters,
      search,
      perPage: this.perPage()
    });
    this.data.set(result.data);
    this.totalItems.set(result.total);
  } finally {
    this.loading.set(false);
  }
}
```

### Memory Management

```typescript
// Clean up subscriptions and effects
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## 🔧 Troubleshooting

### Common Issues

**Table not displaying data:**
- Ensure your data array is properly bound: `[data]="myData"`
- Check that headers match your data properties
- Verify Angular Signals are properly initialized

**Sorting not working:**
- Make sure `sortable: true` is set in header configuration
- Verify the `property` field matches your data structure

**Filters not applying:**
- Check that filter templates have proper `[formControl]` binding
- Ensure debounce settings allow enough time for input

**Performance issues:**
- Implement `trackByFn` for large datasets
- Consider virtual scrolling for 1000+ rows
- Use server-side pagination for very large datasets

**Responsive layout problems:**
- Set appropriate `[responsive]` breakpoint
- Test on various screen sizes
- Consider using custom CSS for specific layouts

### Module Import Issues

```typescript
// Correct module import for standalone components
import { HubUITableModule } from 'ng-hub-ui-paginable';

// Or import individual components
import { 
  TableComponent, 
  PaginatorComponent, 
  PaginableListComponent 
} from 'ng-hub-ui-paginable';

@Component({
  standalone: true,
  imports: [TableComponent, PaginatorComponent]
})
export class MyComponent {}
```

### TypeScript Configuration

Ensure your `tsconfig.json` includes proper path mapping:

```json
{
  "compilerOptions": {
    "paths": {
      "ng-hub-ui-paginable": ["./node_modules/ng-hub-ui-paginable"]
    }
  }
}
```

## ♿ Accessibility

The table component follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: Full keyboard support with tab, arrow keys, and Enter
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Compatible with high contrast themes

```html
<hub-ui-table
  [ariaLabel]="'User data table'"
  [ariaDescription]="'Contains user information with sorting and filtering options'">
</hub-ui-table>
```

## 🔍 Custom filters (filterTpt)

You can customize the column filter interface using individual templates per `header`.

```html
<ng-template filterTpt header="birthday" let-formControl="formControl">
  <input
    type="date"
    class="form-control"
    [formControl]="formControl"
    placeholder="Filter by date"
  />
</ng-template>
```

```html
<ng-template filterTpt header="age" let-formControl="formControl">
  <div class="d-flex gap-2">
    <input
      type="number"
      class="form-control"
      [formControl]="formControl.controls.start"
      placeholder="Min."
    />
    <input
      type="number"
      class="form-control"
      [formControl]="formControl.controls.end"
      placeholder="Max."
    />
  </div>
</ng-template>
```

```html
<ng-template filterTpt header="adult" let-formControl="formControl">
  <select class="form-select" [formControl]="formControl">
    <option [ngValue]="null">All</option>
    <option [ngValue]="true">Yes</option>
    <option [ngValue]="false">No</option>
  </select>
</ng-template>
```

This allows you to adapt any type of visual filter (date-range, boolean, dropdown, etc.) without losing reactivity.


## 🧠 Pagination and Data Handling

The `hub-ui-table` component can receive data in two different ways:

#### 1. Grouped form (`PaginationState<T>`)

Ideal if you manage pagination outside the component. The `data` input can directly accept an object with the full pagination structure:

```html
<hub-ui-table
  [data]="{
    page: page(),
    perPage: perPage(),
    totalItems: totalItems(),
    data: data()
  }"
></hub-ui-table>
```

> This form is useful when you manage `PaginationState` in a single place (for example, from a service, `computed()`, or store).

#### 2. Split form (individual inputs)

You can also pass each value separately:

```html
<hub-ui-table
  [data]="data()"
  [page]="page()"
  [perPage]="perPage()"
  [totalItems]="totalItems()"
></hub-ui-table>
```

> It is important that if you choose this form, **all inputs are present**. If `page`, `perPage`, or `totalItems` are missing, the component will show an error in the console.

Both forms are compatible with Signals and can be easily integrated with `model()` and `computed()`.

### Advanced Pagination Example

```typescript
export class AdvancedTableComponent {
  // Server-side pagination with loading state
  paginationState = computed(() => {
    return {
      page: this.currentPage(),
      perPage: this.itemsPerPage(),
      totalItems: this.totalItems(),
      data: this.loading() ? [] : this.currentData()
    };
  });

  currentPage = signal(1);
  itemsPerPage = signal(20);
  totalItems = signal(0);
  loading = signal(false);
  currentData = signal<User[]>([]);

  async loadData() {
    this.loading.set(true);
    try {
      const result = await this.userService.getUsers({
        page: this.currentPage(),
        perPage: this.itemsPerPage()
      });
      this.currentData.set(result.data);
      this.totalItems.set(result.total);
    } finally {
      this.loading.set(false);
    }
  }
}
```

## 🧬 Interface `PaginationState<T>`

```ts
export interface PaginationState<T = any> {
  page: number | null;
  perPage: number | null;
  totalItems: number | null;
  data: ReadonlyArray<T> | null;
}
```

## 🌍 Internationalization and Translation Management

The `ng-hub-ui-paginable` library includes built-in support for internationalization (i18n) with customizable translations. You can easily integrate it with your preferred translation library.

### Using with Transloco

If you're using Transloco as your translation library, here's how to set up dynamic translation updates:

```typescript
export class AppComponent {
  #translocoSvc = inject(TranslocoService);
  #paginableTranslationSvc = inject(PaginableTranslationService);

  translationLoadSuccess = toSignal(
    this.#translocoSvc.events$.pipe(
      filter((event) => event.type === 'translationLoadSuccess')
    )
  );

  currentLanguageEffect = effect(() => {
    const currentLanguage = Translations.currentLanguage();
    const translationsLoaded = this.translationLoadSuccess();
    if (!translationsLoaded) {
      return;
    }

    this.#translocoSvc.setActiveLang(currentLanguage);

    // Paginable translations
    const translations = this.#translocoSvc.translateObject('PAGINABLE');
    this.#paginableTranslationSvc.setTranslations(
      typeof translations === 'object' ? translations : {}
    );

    // ngx-timeago settings (if needed)
    this.setTimeagoLang(currentLanguage);
  });
}
```

### Using with ngx-translate

If you're using ngx-translate, you can set up translations similarly:

```typescript
export class AppComponent {
  #translateSvc = inject(TranslateService);
  #paginableTranslationSvc = inject(PaginableTranslationService);

  constructor() {
    // Listen for language changes
    this.#translateSvc.onLangChange.subscribe((event) => {
      const translations = this.#translateSvc.instant('PAGINABLE');
      this.#paginableTranslationSvc.setTranslations(
        typeof translations === 'object' ? translations : {}
      );
    });
  }
}
```

### Custom Translation Keys

The library expects translations under a `PAGINABLE` namespace. Here's an example structure for your translation files:

```json
{
  "PAGINABLE": {
    "search": "Search...",
    "noResults": "No results found",
    "loading": "Loading...",
    "itemsPerPage": "Items per page",
    "page": "Page",
    "of": "of",
    "first": "First",
    "previous": "Previous",
    "next": "Next",
    "last": "Last",
    "showing": "Showing",
    "to": "to",
    "entries": "entries"
  }
}
```

### Manual Translation Updates

You can also manually update translations without using a translation library:

```typescript
export class AppComponent {
  #paginableTranslationSvc = inject(PaginableTranslationService);

  constructor() {
    // Set custom translations
    this.#paginableTranslationSvc.setTranslations({
      search: 'Buscar...',
      noResults: 'No se encontraron resultados',
      loading: 'Cargando...',
      // ... other translations
    });
  }
}
```

## 🤝 Contribution

We welcome all contributions! Here's how you can help:

### Getting Started

```bash
# Clone the repository
git clone https://github.com/carlos-morcillo/ng-hub-ui-paginable.git
cd ng-hub-ui-paginable

# Install dependencies
npm install

# Start development server
npm run start

# Run tests
npm run test

# Build the library
npm run build:paginable
```

### Contributing Guidelines

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Add tests** for your changes
4. **Ensure** all tests pass: `npm run test`
5. **Commit** your changes: `git commit -m 'Add amazing feature'`
6. **Push** to your branch: `git push origin feature/amazing-feature`
7. **Submit** a pull request

### Development Workflow

- Follow the existing code style and conventions
- Write comprehensive tests for new features
- Update documentation when necessary
- Ensure TypeScript compilation is successful
- Test across different Angular versions when possible

### Reporting Issues

When reporting bugs, please include:
- Angular version
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Minimal reproduction example (StackBlitz preferred)

## ☕ Support

Do you like this library? You can support us by buying us a coffee ☕:
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/carlosmorcillo)

## 🏆 Contributors

Thanks to all contributors who have helped make this library better!

- **Carlos Morcillo Fernández** - *Creator & Maintainer* - [@carlos-morcillo](https://github.com/carlos-morcillo)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT © ng-hub-ui contributors
