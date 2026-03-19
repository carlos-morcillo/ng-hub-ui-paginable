# Breaking Changes: ng-hub-ui-paginable

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
