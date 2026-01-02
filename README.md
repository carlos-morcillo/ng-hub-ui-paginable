# ng-hub-ui-paginable

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [✨ Inspiration](#-inspiration)
- [🧩 Library Family](#-library-family-ng-hub-ui)
- [📦 Description](#-description)
- [🎯 Features](#-features)
- [🏗️ Component Architecture](#️-component-architecture)
- [🚀 Installation](#-installation)
- [⚙️ Usage](#️-usage)
- [🏗️ Table Headers Configuration](#️-table-headers-configuration-paginabletableheader)
- [🔧 Resizable Columns](#-resizable-columns)
- [🎪 Additional Components](#-additional-components)
- [🪄 API Reference](#-api-reference)
- [🎠 Templates](#-templates)
- [🧩 Styling](#-styling)
- [⚡ Performance Tips](#-performance-tips)
- [🔧 Troubleshooting](#-troubleshooting)
- [♿ Accessibility](#-accessibility)
- [🧪 Testing Guide](#-testing-guide)
- [📚 Migration Guide](#-migration-guide)
- [❓ FAQ](#-faq)
- [🔍 Custom filters](#-custom-filters-filtertpt)
- [🧠 Pagination and Data Handling](#-pagination-and-data-handling)
- [🧬 PaginationState Interface](#-interface-paginationstatet)
- [🌍 Internationalization](#-internationalization-and-translation-management)
- [📊 Changelog](#-changelog)
- [🤝 Contribution](#-contribution)
- [☕ Support](#-support)
- [🏆 Contributors](#-contributors)
- [📄 License](#-license)

---

## 🚀 Quick Start

Get up and running with ng-hub-ui-paginable in less than 5 minutes:

### 1. Install
```bash
npm install ng-hub-ui-paginable
```

### 2. Import
```typescript
import { TableComponent } from 'ng-hub-ui-paginable';

@Component({
  imports: [TableComponent],
  // ...
})
```

### 3. Use
```html
<hub-ui-table
  [headers]="[{property: 'name', title: 'Name'}, {property: 'email', title: 'Email'}]"
  [data]="[{name: 'John', email: 'john@example.com'}]">
</hub-ui-table>
```

### 4. Advanced Features
```html
<hub-ui-table
  [headers]="headers"
  [data]="data"
  [searchable]="true"
  [selectable]="true"
  [(searchTerm)]="searchTerm"
  [(page)]="currentPage">
</hub-ui-table>
```

**💡 That's it!** You now have a fully functional data table with search, pagination, and selection.

---

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

---

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
- **🧩 Multi-rule Menu Filters**: AND/OR operators, null checks, and match modes per rule
- **📋 Hierarchical Lists**: Tree-like data structures with expandable/collapsible nodes

## 🏗️ Component Architecture

### Library Structure

```
ng-hub-ui-paginable/
├── 📦 Core Components
│   ├── TableComponent        - Main data table with all features
│   ├── PaginatorComponent    - Standalone pagination controls
│   └── PaginableListComponent - Hierarchical list with tree structure
├── 🎨 UI Components  
│   ├── HubIconComponent      - Multi-library icon support
│   ├── DropdownComponent     - Action dropdowns and menus
│   ├── MenuFilterComponent   - Advanced filtering interfaces
│   └── PaginableTableRangeInputComponent - Date/number range inputs
├── 🔧 Utility Components
│   └── ResizableComponent    - Column width adjustment
├── 📋 Template Directives
│   ├── PaginableTableHeaderDirective    - Custom headers
│   ├── PaginableTableCellDirective      - Custom cells
│   ├── PaginableTableFilterDirective    - Custom filters
│   ├── PaginableTableRowDirective       - Custom rows
│   ├── PaginableTableExpandingRowDirective - Expandable content
│   ├── PaginableTableLoadingDirective   - Loading states
│   ├── PaginableTableErrorDirective     - Error states
│   └── PaginableTableNotFoundDirective  - Empty states
├── ⚙️ Services
│   ├── PaginableService             - Core configuration
│   ├── HubTranslationService  - i18n management
│   └── PaginationService           - Pagination logic
└── 🎯 Utilities
    ├── Pipes (get, translate, ucfirst, etc.)
    ├── Interfaces (type definitions)
    ├── Constants (defaults, breakpoints)
    └── Utils (helper functions)
```

### Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    TableComponent                           │
│  ┌─────────────────────────────────────────────────────────┤
│  │ Header Row (with sorting, filtering, actions)           │
│  │ ├── PaginableTableHeaderDirective (custom headers)     │
│  │ ├── MenuFilterComponent (advanced filters)             │
│  │ └── ResizableDirective (column resizing)              │
│  ├─────────────────────────────────────────────────────────┤
│  │ Data Rows                                               │
│  │ ├── PaginableTableRowDirective (custom row templates)  │
│  │ ├── PaginableTableCellDirective (custom cell content)  │
│  │ ├── PaginableTableExpandingRowDirective (details)     │
│  │ └── DropdownComponent (row actions)                   │
│  ├─────────────────────────────────────────────────────────┤
│  │ State Templates                                         │
│  │ ├── PaginableTableLoadingDirective                    │
│  │ ├── PaginableTableErrorDirective                      │
│  │ └── PaginableTableNotFoundDirective                   │
│  └─────────────────────────────────────────────────────────┤
│                    PaginatorComponent                      │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   User Input     │    │  Angular Signals│    │  Component State │
│  ┌─────────────┐ │    │ ┌──────────────┐│    │ ┌──────────────┐ │
│  │ Search      │ │───▶│ │ searchTerm() ││───▶│ │ Filtered Data│ │
│  │ Filter      │ │    │ │ filters()    ││    │ │ Sorted Data  │ │
│  │ Sort        │ │    │ │ ordination() ││    │ │ Paginated    │ │
│  │ Select      │ │    │ │ page()       ││    │ │ Selected     │ │
│  └─────────────┘ │    │ └──────────────┘│    │ └──────────────┘ │
└──────────────────┘    └─────────────────┘    └──────────────────┘
           │                       │                        │
           │                       ▼                        │
           │            ┌─────────────────┐                 │
           │            │     Effects     │                 │
           │            │ ┌──────────────┐│                 │
           │            │ │ Debounced    ││                 │
           │            │ │ Updates      ││                 │
           │            │ │ Change       ││                 │
           │            │ │ Detection    ││                 │
           │            │ └──────────────┘│                 │
           │            └─────────────────┘                 │
           │                       │                        │
           └───────────────────────┼────────────────────────┘
                                   ▼
                        ┌─────────────────┐
                        │   Template      │
                        │     Render      │
                        │ ┌──────────────┐│
                        │ │ Table HTML   ││
                        │ │ Custom Tpls  ││
                        │ │ Pagination   ││
                        │ └──────────────┘│
                        └─────────────────┘
```

### Signal-Based Reactivity

The library leverages Angular Signals for optimal performance and reactivity:

```typescript
// Reactive data pipeline
data = signal<User[]>([]);
searchTerm = signal('');
filters = signal({});
ordination = signal<PaginableTableOrdination>();

// Computed derived state
filteredData = computed(() => {
  let result = this.data();
  
  // Apply search
  if (this.searchTerm()) {
    result = result.filter(item => 
      item.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  }
  
  // Apply filters
  const filters = this.filters();
  Object.keys(filters).forEach(key => {
    if (filters[key]) {
      result = result.filter(item => item[key] === filters[key]);
    }
  });
  
  // Apply sorting
  const sort = this.ordination();
  if (sort) {
    result.sort((a, b) => {
      const aVal = a[sort.property];
      const bVal = b[sort.property];
      return sort.direction === 'ASC' 
        ? aVal > bVal ? 1 : -1 
        : aVal < bVal ? 1 : -1;
    });
  }
  
  return result;
});

// Pagination computed
paginatedData = computed(() => {
  const filtered = this.filteredData();
  const page = this.page() || 1;
  const perPage = this.perPage() || 20;
  const start = (page - 1) * perPage;
  return filtered.slice(start, start + perPage);
});
```

---

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

### Menu Filters (automatic in `mode: 'menu'`)

Menu filters are rendered automatically when a column filter uses `mode: 'menu'`.
You do not need to use a dedicated component directly; the table wires the menu filter
based on the header configuration and the `filters` model.

```typescript
import { MenuFilterOperators, StringMatchModes } from 'ng-hub-ui-paginable';

const headers: PaginableTableHeader[] = [
  {
    property: 'name',
    title: 'Name',
    filter: { type: 'text', mode: 'menu' }
  }
];

filters = signal({
  name: {
    operator: MenuFilterOperators.And,
    rules: [
      { value: 'john', matchMode: StringMatchModes.Contains }
    ]
  }
});
```

Note: Null checks use `NullMatchModes.IsNull` / `NullMatchModes.IsNotNull` and do not
require a value.

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

### Menu Filter Value Shape

When a filter uses `mode: 'menu'`, the value stored in `filters` is a structured
`MenuFilterValue` (operator + rules). For `row` filters, the value is the raw input
value (string/number/boolean/date).

```typescript
import { MenuFilterOperators, StringMatchModes } from 'ng-hub-ui-paginable';

filters = signal({
  name: {
    operator: MenuFilterOperators.And,
    rules: [
      { value: 'john', matchMode: StringMatchModes.Contains }
    ]
  }
});
```

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

---

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

### 🧩 Additional customization tokens

Newer styling hooks are also exposed as CSS variables and helper classes:

```scss
.hub-table {
  --hub-table-cell-vertical-align: middle;
  --hub-icon-color: currentColor;
  --hub-icon-size: 1em;
}
```

```scss
/* Filter button and badge */
.hub-table__filter-button {
  /* base styles */
}
.hub-table__filter-button--active {
  /* active state */
}
.hub-table__filter-count {
  /* badge styles */
}
```

```scss
/* Icon helpers */
.hub-table__icon {
  /* base icon */
}
.hub-table__icon--sm {
  --hub-icon-size: 0.875em;
}
.hub-table__icon--lg {
  --hub-icon-size: 1.33em;
}
```

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

## 🧪 Testing Guide

### Unit Testing Components

When testing components that use ng-hub-ui-paginable, follow these patterns:

#### Basic Table Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from 'ng-hub-ui-paginable';
import { signal } from '@angular/core';

describe('MyTableComponent', () => {
  let component: MyTableComponent;
  let fixture: ComponentFixture<MyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, MyTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTableComponent);
    component = fixture.componentInstance;
  });

  it('should render table with data', () => {
    component.data.set([
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' }
    ]);
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
  });

  it('should handle row selection', () => {
    component.selectable.set(true);
    component.data.set([{ id: 1, name: 'John' }]);
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkbox.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedItems().length).toBe(1);
  });
});
```

#### Testing Search Functionality

```typescript
it('should filter data when search term changes', fakeAsync(() => {
  component.searchable.set(true);
  component.data.set([
    { name: 'John Doe' },
    { name: 'Jane Smith' }
  ]);
  fixture.detectChanges();

  const searchInput = fixture.debugElement.query(By.css('input[type="search"]'));
  searchInput.nativeElement.value = 'John';
  searchInput.nativeElement.dispatchEvent(new Event('input'));
  
  tick(300); // Account for debounce
  fixture.detectChanges();

  const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
  expect(rows.length).toBe(1);
}));
```

#### Testing Pagination

```typescript
it('should navigate between pages', () => {
  component.page.set(1);
  component.totalItems.set(100);
  component.perPage.set(10);
  fixture.detectChanges();

  const nextButton = fixture.debugElement.query(By.css('.pagination .page-item:last-child button'));
  nextButton.nativeElement.click();
  fixture.detectChanges();

  expect(component.page()).toBe(2);
});
```

#### Testing Custom Templates

```typescript
@Component({
  template: `
    <hub-ui-table [headers]="headers" [data]="data">
      <ng-template cellTpt header="name" let-data="data">
        <strong>{{ data.name }}</strong>
      </ng-template>
    </hub-ui-table>
  `
})
class TestHostComponent {
  headers = [{ property: 'name', title: 'Name' }];
  data = [{ name: 'John' }];
}

it('should render custom cell template', () => {
  const fixture = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();

  const strongElement = fixture.debugElement.query(By.css('strong'));
  expect(strongElement.nativeElement.textContent).toBe('John');
});
```

### Testing with Reactive Forms

```typescript
it('should work with reactive forms', () => {
  const form = new FormControl([]);
  component.selectedItemsControl = form;
  component.selectable.set(true);
  component.multiple.set(true);
  fixture.detectChanges();

  // Simulate selection
  component.onRowSelect({ id: 1, name: 'John' });
  fixture.detectChanges();

  expect(form.value).toEqual([{ id: 1, name: 'John' }]);
});
```

### Mock Services

```typescript
class MockHubTranslationService {
  getTranslation(key: string) {
    const translations = {
      'SEARCH': 'Search',
      'NO_RESULTS_FOUND': 'No results found',
      'LOADING': 'Loading...'
    };
    return translations[key] || key;
  }
}

// In TestBed configuration
providers: [
  { provide: HubTranslationService, useClass: MockHubTranslationService }
]
```

### Testing Performance

```typescript
it('should handle large datasets efficiently', () => {
  const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`
  }));

  const startTime = performance.now();
  component.data.set(largeDataset);
  fixture.detectChanges();
  const endTime = performance.now();

  expect(endTime - startTime).toBeLessThan(100); // Should render in less than 100ms
});
```

### Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jasmine-axe';

expect.extend(toHaveNoViolations);

it('should be accessible', async () => {
  component.data.set([{ name: 'John', email: 'john@example.com' }]);
  fixture.detectChanges();

  const results = await axe(fixture.nativeElement);
  expect(results).toHaveNoViolations();
});
```

---

## 📚 Migration Guide

### From v1.x to v1.52.x

#### Breaking Changes
- **ngx-translate dependency removed**: Use built-in translation service instead
- **Component selectors updated**: `hub-ui-table` is now preferred over legacy selectors
- **Angular Signals required**: Minimum Angular 16+ for Signals support

#### Migration Steps

**1. Update Translation System**
```typescript
// Before (v1.x)
import { TranslateService } from '@ngx-translate/core';

constructor(private translate: TranslateService) {
  // Translation setup
}

// After (v1.52.x)
import { HubTranslationService } from 'ng-hub-ui-paginable';

constructor(private hubTranslation: HubTranslationService) {
  this.hubTranslation.setTranslations({
    search: 'Search...',
    noResults: 'No results found'
  });
}
```

**2. Update Component Usage**
```html
<!-- Before -->
<paginable-table [headers]="headers" [data]="data">
</paginable-table>

<!-- After -->
<hub-ui-table [headers]="headers" [data]="data">
</hub-ui-table>
```

**3. Migrate to Angular Signals**
```typescript
// Before (v1.x)
export class MyComponent {
  headers = [{ property: 'name', title: 'Name' }];
  data = [];
  page = 1;
}

// After (v1.52.x)
export class MyComponent {
  headers = signal([{ property: 'name', title: 'Name' }]);
  data = signal([]);
  page = signal(1);
}
```

**4. Update Event Handlers**
```typescript
// Before
onPageChange(page: number) {
  this.page = page;
}

// After  
onPageChange(page: number) {
  this.page.set(page);
}
```

### From Legacy Bootstrap 4 to Bootstrap 5

**Update CSS Classes:**
```html
<!-- Before (Bootstrap 4) -->
<div class="form-row">
  <div class="col">
    <hub-ui-table class="table-sm">
    </hub-ui-table>
  </div>
</div>

<!-- After (Bootstrap 5) -->
<div class="row g-3">
  <div class="col">
    <hub-ui-table class="table table-sm">
    </hub-ui-table>
  </div>
</div>
```

### Configuration Updates

**Before (v1.x)**
```typescript
@NgModule({
  imports: [
    HubUITableModule.forRoot({
      theme: 'bootstrap',
      language: 'en'
    })
  ]
})
```

**After (v1.52.x)**
```typescript
// In main.ts or app.config.ts
import { provideTableConfig } from 'ng-hub-ui-paginable';

export const appConfig = {
  providers: [
    provideTableConfig({
      theme: 'bootstrap',
      language: 'en'
    })
  ]
};
```

### Common Migration Issues

**Issue: Filters not working**
```typescript
// Solution: Ensure proper filter configuration
headers = signal([{
  property: 'name',
  title: 'Name',
  filter: { 
    type: 'text', 
    mode: 'row',  // Add mode if missing
    placeholder: 'Search names...'
  }
}]);
```

**Issue: Selection not updating**
```typescript
// Solution: Use signals for reactive updates
selectedItems = signal([]);

onSelectionChange(items: any[]) {
  this.selectedItems.set(items); // Use .set() instead of direct assignment
}
```

**Issue: Custom templates not rendering**
```html
<!-- Ensure template directive names are correct -->
<ng-template cellTpt header="name" let-data="data">
  {{ data.name }}
</ng-template>
```

---

## ❓ FAQ

### General Usage

**Q: How do I enable search functionality?**
```html
<hub-ui-table [searchable]="true" [(searchTerm)]="searchTerm">
</hub-ui-table>
```

**Q: Can I use both local and remote pagination?**
A: Yes, set `options.serverSidePagination` to true for remote, false for local:
```typescript
options = { serverSidePagination: true };
```

**Q: How do I add action buttons to rows?**
```typescript
headers = [{
  property: 'actions',
  title: 'Actions',
  buttons: [
    { 
      icon: 'fa-edit', 
      handler: (row) => this.edit(row.data),
      title: 'Edit'
    }
  ]
}];
```

### Filtering

**Q: How do I create custom filters?**
```html
<ng-template filterTpt header="status" let-formControl="formControl">
  <select [formControl]="formControl" class="form-select">
    <option value="">All</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
</ng-template>
```

**Q: Can I filter by date ranges?**
```typescript
{
  property: 'createdAt',
  title: 'Created',
  filter: {
    type: 'date-range',
    mode: 'menu'
  }
}
```

### Styling and Customization

**Q: How do I customize table colors?**
```scss
.hub-table {
  --hub-body-bg: #f8f9fa;
  --hub-body-color: #212529;
  --hub-border-color: #dee2e6;
}
```

**Q: Can I make columns resizable?**
```html
<ng-template headerTpt header="name">
  <th resizable>Name</th>
</ng-template>
```

### Performance

**Q: How do I optimize for large datasets?**
```typescript
// Use server-side pagination
options = { serverSidePagination: true };

// Add debounce to search
<hub-ui-table [debounce]="300">
```

**Q: The table is slow with many columns, what can I do?**
```typescript
// Use dynamic column visibility
headers = computed(() => {
  return this.allHeaders().filter(h => 
    this.visibleColumns().includes(h.property)
  );
});
```

### Integration

**Q: How do I integrate with NgRx?**
```typescript
// Component
data = this.store.selectSignal(selectUsers);
loading = this.store.selectSignal(selectUsersLoading);

// Actions
onPageChange(page: number) {
  this.store.dispatch(loadUsers({ page }));
}
```

**Q: Can I use it with reactive forms?**
```html
<hub-ui-table 
  [formControl]="selectedItemsControl"
  [selectable]="true">
</hub-ui-table>
```

### Troubleshooting

**Q: Why aren't my templates showing?**
A: Check template directive names and ensure imports:
```typescript
import { 
  PaginableTableCellDirective,
  PaginableTableHeaderDirective 
} from 'ng-hub-ui-paginable';
```

**Q: Search is not working, why?**
A: Ensure searchable is enabled and check data binding:
```typescript
// Make sure data is properly bound
data = signal([...yourData]);
searchTerm = signal('');
```

**Q: How do I debug table issues?**
A: Enable console logging and check signals:
```typescript
// Check if signals are updating
effect(() => {
  console.log('Data changed:', this.data());
  console.log('Search term:', this.searchTerm());
});
```

## 🔍 Custom filters (filterTpt)

You can customize the column filter interface using individual templates per `header`.
These templates are rendered for `mode: 'row'` filters. Menu filters (`mode: 'menu'`)
use the built-in menu filter UI.

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
  #hubTranslationSvc = inject(HubTranslationService);

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
    this.#hubTranslationSvc.setTranslations(
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
  #hubTranslationSvc = inject(HubTranslationService);

  constructor() {
    // Listen for language changes
    this.#translateSvc.onLangChange.subscribe((event) => {
      const translations = this.#translateSvc.instant('PAGINABLE');
      this.#hubTranslationSvc.setTranslations(
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
  #hubTranslationSvc = inject(HubTranslationService);

  constructor() {
    // Set custom translations
    this.#hubTranslationSvc.setTranslations({
      search: 'Buscar...',
      noResults: 'No se encontraron resultados',
      loading: 'Cargando...',
      // ... other translations
    });
  }
}
```

## 📊 Changelog

## [19.10.2] - 2025-12-23
### Added
- `--hub-table-cell-vertical-align`, `--hub-icon-color`, and `--hub-icon-size` customization tokens.

### Changed
- Overlay utilities moved to `ng-hub-ui-utils` and dropdown integration now relies on that package.
- Table cell vertical alignment defaults to `middle` via CSS variable.

### Fixed
- Menu filter match mode options now render their translated labels correctly.
- Added missing translations for `IsNull` and `IsNotNull` match modes.

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
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/carlosmorcillo)

## 🏆 Contributors

Thanks to all contributors who have helped make this library better!

- **Carlos Morcillo Fernández** - *Creator & Maintainer* - [@carlos-morcillo](https://github.com/carlos-morcillo)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT © ng-hub-ui contributors
