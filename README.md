# ng-hub-ui-paginable

## ✨ Inspiration

This library arises from the need to offer highly configurable, accessible, and modern data visualization components for Angular applications, enabling integrated lists, tables, and pagination with full support for signals, reactive forms, and complete render customization.

## 🧩 Library Family `ng-hub-ui`

`ng-hub-ui-paginable` is part of the `ng-hub-ui` ecosystem, a family of modern Angular components focused on user experience, productivity, and compatibility with Angular Signals. Each package solves a specific interface problem without overloading business logic.

## 📦 Description

`ng-hub-ui-paginable` provides a table (`<hub-ui-table>`), a list (`<hub-ui-list>`), and a paginator (`<hub-ui-paginator>`) ready to work together or separately, making it easy to manage paginated data, searches, filters, and item selection.

In this first version of the README, we will focus on the `Table` component.

## 🎯 Features

- **🔄 Full Angular Signals Support**: Built with modern Angular Signals architecture using `model()`, `input()`, `computed()`, and `effect()`
- **📊 Flexible Data Input**: Compatible with separate or grouped inputs via `PaginationState` for seamless integration
- **🔍 Advanced Filtering**: Local search and column-specific filters (text, range, boolean, date, custom)
- **📋 Smart Sorting**: Ascending/descending column sorting with custom sort functions
- **☑️ Row Selection**: Single or multiple row selection with batch operations
- **📈 Expandable Content**: Collapsible row content for detailed views
- **📄 Dual Pagination**: Support for both local and remote pagination strategies
- **🎨 Template Customization**: Extensive custom templates for headers, cells, filters, states (empty, loading, error)
- **📱 Responsive Design**: Configurable responsive breakpoints for optimal mobile experience
- **♿ Accessibility Ready**: Built-in ARIA support and keyboard navigation
- **⚡ Performance Optimized**: Virtual scrolling support and efficient change detection
- **🌍 Internationalization**: Full i18n support with customizable translations

## 🚀 Installation

```bash
npm install ng-hub-ui-paginable
```

## ⚙️ Usage

```html
<hub-ui-table
  [headers]="headers"
  [data]="data.value()"
  [(page)]="page"
  [totalItems]="totalItems"
  [loading]="loading"
  [searchable]="true"
  [selectable]="true"
  [multiple]="true"
  [(searchTerm)]="searchTerm"
  [(ordination)]="ordination"
></hub-ui-table>
```

## 🪄 Inputs

| Name                | Type                             | Description                                                                 |
|---------------------|----------------------------------|-----------------------------------------------------------------------------|
| `headers`           | `PaginableTableHeader[]`         | Column definition with support for titles, sorting, and filters.            |
| `data` / `rows`     | `T[]` or `PaginationState<T>`    | Can be a flat array or a paginated object.                                  |
| `page`              | `number`                         | Current page (model signal).                                                |
| `perPage`           | `number`                         | Number of items per page.                                                   |
| `totalItems`        | `number`                         | Total available items.                                                      |
| `searchable`        | `boolean`                        | Whether to show the search input.                                           |
| `selectable`        | `boolean`                        | Whether rows can be selected.                                               |
| `multiple`          | `boolean`                        | Whether multiple selection is allowed.                                      |
| `ordination`        | `PaginableTableOrdination`       | Sorting property and direction.                                             |
| `filters`           | `Record<string, any>`            | Active advanced filters.                                                    |
| `searchTerm`        | `string`                         | Search term.                                                                |
| `paginationPosition`| `'top' | 'bottom' | 'both'`      | Where the paginator is located.                                             |
| `loading`           | `boolean`                        | Loading state.                                                              |
| `paginate`          | `boolean`                        | Whether the table should paginate or not.                                   |
| `bindValue`         | `string`                         | Property used to uniquely identify selected items.                          |
| `options`           | `PaginableTableOptions`          | Visual configuration (scroll, variants, hover, etc.).                       |

## 📤 Outputs

The component implements `ControlValueAccessor`, so you can use `[(ngModel)]` or use it with `formControl`.

You can also capture row clicks:

```ts
@clickFn="onItemClick($event)"
```

Where `$event` includes: `item`, `depth`, `index`, `selected`, `collapsed`.

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

### Optimize Large Datasets

```typescript
// Use trackBy function for better performance with large lists
export class MyComponent {
  trackByFn(index: number, item: any) {
    return item.id; // Use unique identifier
  }
}
```

```html
<hub-ui-table
  [data]="data"
  [trackByFn]="trackByFn">
</hub-ui-table>
```

### Debounce Search and Filters

```html
<hub-ui-table
  [debounce]="300"
  [searchable]="true">
</hub-ui-table>
```

### Virtual Scrolling for Large Tables

```html
<hub-ui-table
  [virtualScrolling]="true"
  [itemSize]="50"
  [data]="largeDataset">
</hub-ui-table>
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

### Debug Mode

```typescript
// Enable debug logging
export class MyComponent {
  tableOptions = {
    debug: true, // Logs internal state changes
    // ... other options
  };
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

## 📊 Changelog

### v19.9.3 (Latest)
- Enhanced Angular 19 compatibility
- Improved Signal-based reactivity
- Performance optimizations for large datasets
- Better TypeScript strict mode support
- Updated documentation and examples

### Previous Versions
See [CHANGELOG.md](CHANGELOG.md) for complete version history.

## 🏆 Contributors

Thanks to all contributors who have helped make this library better!

- **Carlos Morcillo Fernández** - *Creator & Maintainer* - [@carlos-morcillo](https://github.com/carlos-morcillo)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT © ng-hub-ui contributors
