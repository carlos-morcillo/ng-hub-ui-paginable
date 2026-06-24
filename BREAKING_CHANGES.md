# Breaking Changes: ng-hub-ui-paginable

## v22.1.1

### Tooltip directive moved to `ng-hub-ui-utils`

- **Change**: `TooltipDirective` now lives in `ng-hub-ui-utils`. It is still re-exported from `ng-hub-ui-paginable` for backward compatibility, so existing imports keep working. The injected base class changed from `.ng-tooltip` to `.hub-tooltip`.
- **Impact**: any custom CSS targeting `.ng-tooltip` no longer applies.
- **Migration**: import `TooltipDirective` from `ng-hub-ui-utils`, and restyle via the new `.hub-tooltip` class or the `--hub-tooltip-*` CSS variables. Requires `ng-hub-ui-utils >= 22.2.0`.

## v22.0.0

This release aligns the major with Angular 22 and restructures the List component's CSS API. `peerDependencies` stays at `>=18.0.0`, so Angular 18–22 remain supported.

### 1. List BEM structure moved to the host element

- **Change**: the `.hub-list` block class now lives on the host element (`<hub-list>`); the inner `<ul>` is now `.hub-list__items`. The root/cards modifiers were renamed from `.hub-list--root` / `.hub-list--cards` to `.hub-list__items--root` / `.hub-list__items--cards`.
- **Impact**: CSS targeting `.hub-list` as the `<ul>`, or the `.hub-list--root` / `.hub-list--cards` selectors, no longer matches.
- **Migration**: target `.hub-list__items` (and `--root` / `--cards`) for the items collection; `.hub-list` now refers to the component host.

### 2. List CSS variables renamed

- **Change**:
    - `--hub-list-container-bg` → `--hub-list-bg`
    - `--hub-list-container-border-radius` → `--hub-list-border-radius`
    - `--hub-list-container-padding-x` / `-y` → `--hub-list-padding-x` / `-y`
    - `--hub-list-container-gap` → `--hub-list-items-gap`
- **Impact**: overrides using the old `--hub-list-container-*` names have no effect.
- **Migration**: rename the variables in your overrides. The background model also changed: `--hub-list-bg` (host) and `--hub-list-item-bg` (items) now control backgrounds; the host is transparent and items use the page surface by default.

### 3. Table responsive breakpoint variables removed

- **Change**: `--hub-table-breakpoint-sm` / `-md` / `-lg` / `-xl` / `-xxl` were removed.
- **Impact**: none in practice — they never had any effect, because CSS custom properties cannot be read inside `@media` conditions.
- **Migration**: none. The responsive variants (`.hub-table__responsive-*`) still trigger at the fixed `576px` / `768px` / `992px` / `1200px` / `1400px` breakpoints.

## v21.2.0

This major release removes framework-specific styling assumptions from action buttons and unifies the action button contract.

### 1. `PaginableActionButton.color` removed

- **Change**: `color` is no longer part of `PaginableActionButton`.
- **Impact**: Configurations that relied on automatic Bootstrap class generation (`btn-${color}` or `text-${color}`) must now provide classes explicitly.
- **Migration**: Move style intent to `classlist`.

```typescript
// Before
{
  title: 'Delete',
  color: 'danger'
}

// After
{
  title: 'Delete',
  classlist: 'btn btn-danger'
}
```

### 2. Legacy action interfaces removed

- **Change**: `RowButton` and `ListButton` have been removed.
- **Migration**: Replace all usages with `PaginableActionButton`.

```typescript
// Before
buttons: Array<RowButton | PaginableTableDropdown>;
batchActions: Array<PaginableTableDropdown | ListButton>;

// After
buttons: Array<PaginableActionButton | PaginableTableDropdown>;
batchActions: Array<PaginableTableDropdown | PaginableActionButton>;
```

## v21.0.0

This major release aligns with Angular 21 and introduces structural renaming to improve consistency across the library.

### 2. Component Renaming

- **Change**: `PaginableListComponent` has been renamed to `ListComponent`.
- **Migration**: Update your imports and component references:

    ```typescript
    // Before
    import { PaginableListComponent } from 'ng-hub-ui-paginable';

    // After
    import { ListComponent } from 'ng-hub-ui-paginable';
    ```

### 3. Directive Renaming

- **Change**: The empty state directive `PaginableTableNotFoundDirective` has been renamed to `PaginableNoResultsDirective`.
- **Migration**: Update your template and imports:

    ```html
    <!-- Before -->
    <ng-template paginableTableNotFound> No results found. </ng-template>

    <!-- After -->
    <ng-template paginableNoResults> No results found. </ng-template>
    ```
