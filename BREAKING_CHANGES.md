# Breaking Changes: ng-hub-ui-paginable

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
