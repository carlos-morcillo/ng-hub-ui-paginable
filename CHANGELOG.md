# Changelog

## [19.12.0] - 2026-01-03

### Added

*   **table:** added `rowClass` input to allow applying custom classes to rows based on data or a fixed string, enabling dynamic row styling.

### Documentation

*   **paginable:** add missing JSDoc documentation to `PaginatorComponent`, `PaginableTableRangeInputComponent`, `MenuFilterComponent`, `ResizableComponent`, and `PaginableTableDropdownComponent`.

### Refactor

*   **styles:** refactor row classes in `table.scss` to use `@each` loop for better maintainability and reduced code duplication.
## [19.11.5] - 2026-01-02

### Bug Fixes

*   **paginable:** relax stricter type checking on `items` input and internal `_items` property to `any` to allow readonly arrays.
*   **interfaces:** update `PaginableTableDropdown`, `ListButton`, and `PaginationState` to accept `ReadonlyArray` for better compatibility with immutable data sources.

### Refactor

*   **paginable-list:** migrate `@Input` properties to `input()` signals for `bindValue`, `bindLabel`, `bindChildren`, `selectable`, `clickFn` and content queries.

## [19.11.4] - 2026-01-02

### Fixed
- Relaxed type definition for `items` input in `PaginableListComponent` to accept `ReadonlyArray` and `any`.
- Updated `PaginationService.generate` signature to accept `ReadonlyArray<any>` alongside mutable arrays.

## [19.11.3] - 2026-01-02

### Changed
- Updated ng-hub-ui-utils peer dependency to version 1.2.0

## [19.11.2] - 2026-01-02

### Fixed
- Fixed paginable-list component implementation

### Changed
- Updated translation service from PaginableTranslationService to HubTranslationService
- Updated component test files
- Updated README documentation

## [19.11.1] - 2026-01-02

### Fixed
- Fixed build configuration to use compiled ng-hub-ui-utils from dist/ instead of source files
- Fixed missing PaginableTableConfig interface export in public API
- Resolved ng-packagr warnings by removing conflicting package.json entries

## [19.11.0] - 2026-01-01
### Added
- Expanded unit test coverage for core components, directives, services, and utilities.
- Translation pipe tests.

### Changed
- Table component template/layout cleanup and style adjustments across list, dropdown, paginator, and resizable components.
- Moved shared utility pipes to `ng-hub-ui-utils`.
- Documentation updates (notably `README.es.md`).

### Removed
- Storybook configuration from the package.
- Local copies of shared utility pipes (get/isObject/isObservable/isString/ucfirst/unwrapAsync).
- Legacy `table2` stylesheet.

## [19.10.2] - 2025-12-23
### Fixed
- Resolve TypeScript errors template typing; build passes

## [19.9.2] - 2025-07-21
### Added
- Add debouncedSignal utility function

## [19.9.1] - 2025-06-20
### Added
- Enhance item click handling by adding mouse event to clickFn updating ListClickEvent interface
- Enhance filtering capabilities by adding detailed documentation new input types for filters

## [19.9.0] - 2025-05-22
### Changed
- Refactor button interfaces for improved row action handling

## [19.7.1] - 2025-05-22
### Changed
- Version release.

## [19.7.0] - 2025-05-22
### Added
- Enhance row handling styling options in paginable table component

## [19.6.0] - 2025-05-21
### Added
- Implement HubTableComponent with pagination, filtering, selection features

### Changed
- Refactor dropdown component to use toggle method improve rendering logic

## [19.1.0] - 2025-04-11
### Changed
- Refactor component to use new input model resource handling

## [19.0.0] - 2025-01-21
### Changed
- Enhance PaginableTable with HubIconComponent

## [1.54.2] - 2024-12-26
### Changed
- Add HubIconComponent to PaginableTable

## [1.54.1] - 2024-12-26
### Changed
- Updating to angular 19

## [1.52.3] - 2024-09-26
### Fixed
- Stability improvements.

## [1.52.2] - 2024-09-26
### Fixed
- Stability improvements.

### Removed
- Removed residues from ngx-translate library

## [1.52.1] - 2024-09-26
### Fixed
- Stability improvements.

## [1.52.0] - 2024-09-26
### Changed
- Refactored pagination structure. Added BEM classes to all items to improve customisation.

## [1.51.4] - 2024-09-26
### Fixed
- Stability improvements.

## [1.51.3] - 2024-09-26
### Fixed
- Stability improvements.

## [1.51.2] - 2024-09-26
### Fixed
- Stability improvements.

## [1.51.1] - 2024-09-26
### Added
- Added cursor pointer to clickable items

## [1.51.0] - 2024-09-26
### Added
- Added clickFn input

## [1.50.2] - 2024-09-12
### Changed
- Version release.

## [1.50.1] - 2024-09-12
### Fixed
- Stability improvements.

## [1.50.0] - 2024-09-12
### Changed
- String observables are now allowed in the table headers

## [1.49.2] - 2024-07-25
### Fixed
- Stability improvements.

## [1.49.1] - 2024-07-23
### Fixed
- Stability improvements.

## [1.49.0] - 2024-07-23
### Added
- Added support for material, bootstrap and font awesome buttons.

## [1.48.1] - 2024-07-16
### Fixed
- Fixed issue with boolean filters.

## [1.48.0] - 2024-07-16
### Changed
- Version release.

## [1.47.0] - 2024-06-18
### Added
- Added null match modes.

## [1.46.2] - 2024-06-17
### Fixed
- Fixed boolean filter values.

## [1.46.1] - 2024-06-17
### Fixed
- Fixed column counts call.

## [1.46.0] - 2024-06-17
### Added
- Added boolean filters.

## [1.45.3] - 2024-05-13
### Changed
- Replaced Equals and NotEquals to Equal and NotEqual.

## [1.45.2] - 2024-05-13
### Fixed
- Fixed position style of table.

## [1.45.1] - 2024-04-25
### Fixed
- Fixed clear filter button.

## [1.45.0] - 2024-04-21
### Added
- Added filter rule removing.

## [1.44.4] - 2024-04-16
### Changed
- Updated translation logic

## [1.44.3] - 2024-03-27
### Fixed
- Fixed some filter issues.

## [1.44.1] - 2024-02-06
### Fixed
- Fixed dropdown buttons handlers.

## [1.44.0] - 2023-12-19
### Changed
- New bindValue, bindLabel, and bindChildren inputs allow more control over item properties mapping
- Item template now exposes data, depth, index, collapsed, and selected properties for greater customization.

## [1.43.1] - 2023-11-27
### Fixed
- Fixed checkbox click event.

## [1.43.0] - 2023-11-20
### Changed
- Refactored and documented paginable list.

## [1.42.0] - 2023-11-20
### Removed
- Removed library ngx-translate.

## [1.40.5] - 2023-11-09
### Fixed
- Fixed some translation issues.

## [1.40.4] - 2023-10-31
### Changed
- Updated documentation.

## [1.40.3] - 2023-10-31
### Changed
- Updated documentation.

## [1.40.2] - 2023-10-26
### Fixed
- Fixed some translation issues.

## [1.40.1] - 2023-10-25
### Fixed
- Fixed some translation issues.
- Fixed paginable list search and pagination.

## [1.40.0] - 2023-10-25
### Added
- Added menu filters.

### Changed
- Working on paginated lists.

## [1.39.0] - 2023-09-04
### Added
- Added stripped and variant options

## [1.38.0] - 2023-07-17
### Changed
- Updated dependencies to Angular 16.

## [1.37.1] - 2023-07-04
### Changed
- The tooltips are removed when clicking on the parent element.

## [1.37.0] - 2023-04-18
### Added
- The table actions now accept an observable as a value for the 'hidden' property

## [1.36.0] - 2023-04-18
### Changed
- The error message is now located within the table and takes up a whole row

## [1.35.1] - 2023-04-02
### Added
- Fixed specific filters

## [1.35.0] - 2023-04-02
### Added
- Initial ordination input

## [1.34.0] - 2023-03-31
### Changed
- Filter event

## [1.32.0] - 2023-03-31
### Changed
- Mock users externalized

## [1.31.3] - 2023-03-31
### Fixed
- Search input event

## [1.31.1] - 2023-03-21
### Fixed
- Optional modificator to some pagination interface properties

## [1.31.0] - 2023-03-15
### Added
- Added header template for headers customisation

## [1.30.3] - 2023-03-07
### Fixed
- Buttons cell width

## [1.30.0] - 2023-03-07
### Added
- Label and classlist properties to buttons

## [1.29.0] - 2023-03-06
### Removed
- Views

## [1.27.0] - 2022-07-27
### Added
- Single and multiple selection

## [1.26.0] - 2022-07-05
### Changed
- Angular 14

## [1.25.7] - 2022-07-05
### Fixed
- Reactive forms

## [1.25.6] - 2022-07-05
### Fixed
- Reactive forms

## [1.25.5] - 2022-07-01
### Fixed
- Bootstrap 5 styling

## [1.25.4] - 2022-03-31
### Fixed
- Rows-per-page selector styling for Bootstrap 5

## [1.24.10] - 2022-01-04
### Changed
- Version release.

## [1.24.9] - 2021-10-05
### Fixed
- Fixed the typeahead open/close button when results are displayed.

## [1.24.8] - 2021-09-29
### Added
- Translations in the views form.

### Fixed
- Fixed condition filling in the views edit form.

## [1.24.7] - 2021-09-27
### Fixed
- Translation updates.

## [1.24.6] - 2021-09-22
### Fixed
- Fixed error when changing saved views when values are null.

## [1.24.5] - 2021-09-22
### Fixed
- Fixed error when changing saved views when values are numbers.

## [1.24.4] - 2021-09-16
### Fixed
- Fixed error when changing filters if the views selector is not shown.

## [1.24.3] - 2021-09-03
### Fixed
- Translations and typeahead template fixes.

## [1.24.2] - 2021-09-02
### Fixed
- General fixes.

## [1.24.1] - 2021-08-30
### Fixed
- Search and views selector layout.

## [1.24.0] - 2021-08-26
### Added
- Typeahead for selecting, editing, and deleting routes.

## [1.23.7] - 2021-08-24
### Changed
- Module changes

## [1.23.5] - 2021-08-24
### Fixed
- Modal module export

## [1.23.3] - 2021-08-24
### Fixed
- Directive exports

## [1.23.2] - 2021-08-24
### Fixed
- Component exports

## [1.23.1] - 2021-08-24
### Removed
- Removed unnecessary directives

## [1.23.0] - 2021-08-23
### Added
- Ability to save filters as views
- Bootstrap 5 support

## [1.22.1] - 2021-06-23
### Fixed
- Batch action buttons are not enabled until items are selected

## [1.22.0] - 2021-06-23
### Added
- New isObservable pipe

## [1.21.2] - 2021-06-23
### Fixed
- Fixes for RxJS-related errors

## [1.21.1] - 2021-06-23
### Fixed
- Type detection for the last column

## [1.21.0] - 2021-06-22
### Added
- Added a function to show/hide a button inside a cell

## [1.20.0] - 2021-06-22
### Added
- Templates for custom filters

## [1.19.5] - 2021-06-22
### Fixed
- Fixed sorting variable name

## [1.19.4] - 2021-06-22
### Fixed
- Fixed form events

## [1.19.3] - 2021-06-21
### Fixed
- Layout fixes

## [1.19.2] - 2021-06-18
### Fixed
- Fixed filter loading

## [1.19.1] - 2021-06-18
### Fixed
- Component exports

## [1.19.0] - 2021-06-18
### Added
- New filtering fields

## [1.18.5] - 2021-06-16
### Fixed
- Fixed layout and event format for advanced filters

## [1.18.4] - 2021-06-15
### Fixed
- Fixed observables

## [1.18.3] - 2021-06-15
### Fixed
- Layout fixes

## [1.18.2] - 2021-06-15
### Fixed
- Component exports

## [1.18.1] - 2021-06-15
### Fixed
- Directive exports

## [1.18.0] - 2021-06-15
### Added
- Advanced per-column filters
- Loading state when pagination is an observable
- Error capture and message when pagination is an observable
- Customizable loading state
- Customizable error message

## [1.17.0] - 2021-06-11
### Added
- Columns with resize handles

## [1.16.14] - 2021-06-07
### Fixed
- Removed use of the isString function.

## [1.16.13] - 2021-05-19
### Fixed
- Mark selectable items when items are objects.

## [1.16.12] - 2021-05-19
### Fixed
- Mark selectable items when items are objects.
- Mark items when the row is also clickable.

## [1.16.11] - 2021-05-19
### Added
- Ability to make the table hoverable.

### Fixed
- Mark selectable items when the item isn't selectable but has batchActions.

## [1.16.10] - 2021-05-18
### Fixed
- When changing items per page, the page is reset to 1.

## [1.16.8] - 2021-05-18
### Fixed
- Fixed item selection when changing page.
- Fixed main component rendering.

## [1.16.7] - 2021-03-24
### Fixed
- Fixed column alignment.

## [1.16.5] - 2021-05-18
### Fixed
- When changing items per page, pagination goes to page 1.

## [1.16.3] - 2021-02-23
### Fixed
- Fixed item sorting.

## [1.16.2] - 2021-02-03
### Changed
- Angular 11.

## [1.16.1] - 2021-02-03
### Fixed
- TSLint correctly detects the component.

## [1.16.0] - 2021-01-20
### Added
- Action buttons can be shown/hidden based on their own hidden value.

## [1.15.1] - 2021-01-19
### Fixed
- Selected objects are compared correctly.

## [1.15.0] - 2020-12-29
### Added
- Ability to add batch actions

## [1.14.2] - 2020-12-22
### Fixed
- Dropdown component export

## [1.14.0] - 2020-12-22
### Added
- Ability to add dropdowns as actions

### Changed
- Actions can now be placed in any column

## [1.13.0] - 2020-12-21
### Added
- Implemented ControlValueAccessor

### Fixed
- Item selection when changing page

## [1.12.0] - 2020-12-18
### Added
- Attribute to make the table responsive based on xs, sm, md, lg, xl breakpoints
- Added sticky property to column headers to pin them to the start or end. Allowed values: start and end.

## [1.11.1] - 2020-11-30
### Removed
- Removed default language setting

## [1.11.0] - 2020-10-23
### Added
- Added @ngx-translate and Spanish/English languages

## [1.10.0] - 2020-09-24
### Added
- Ability to create tables without pagination by setting paginate to false.

### Changed
- triggerTheParamChanges event only emits non-null properties.

### Fixed
- Expanding rows button compatible with Font Awesome 5.
- Fixed paginator in client-side pagination.

## [1.9.0] - 2020-08-07
### Changed
- Updated to Angular 10

### Fixed
- Handled marking elements when they don't exist.

### Removed
- Dependencia ngx-avatar

## [1.8.1] - 2020-08-06
### Fixed
- Display pagination information.
- Display headers.

## [1.8.0] - 2020-08-05
### Added
- Ability to make table items selectable.
- Ability to change the number of items per page.

### Changed
- Pagination info appears by default.

## [1.7.3] - 2020-07-27
### Fixed
- Fixed pipe exports.

## [1.7.2] - 2020-07-27
### Fixed
- References to exporting all modules, components, directives, pipes, etc.

## [1.7.0] - 2020-07-27
### Added
- Ability to create expandable rows that show content via a toggle.

### Changed
- File reorganization.

## [1.6.0] - 2020-05-14
### Added
- Custom cells now receive the property and the full item.

## [1.5.0] - 2020-04-13
### Added
- Ability to map pagination elements.

### WIP
- Documentation page.

## [1.4.2] - 2020-01-07
### Changed
- Search is shown even when there are no results.

### Fixed
- Fixed action handler so it doesn't trigger the row event.

### WIP
- Documentation page.

## [1.4.1] - 2019-12-17
### Added
- Ability to customize the template of a column specified by parameter.

### Fixed
- Fixed action handler behavior.
- Renamed PaginableTableRowAction interface property from handle to handler.

### Removed
- Removed unused pipes.

## [1.4.0] - 2019-12-15
### Added
- Ability to customize the template of a column specified by parameter.

### Fixed
- Renamed PaginableTableRowAction interface property from handle to handler.

## [1.3.0] - 2019-12-12
### Added
- Ability to add a column of custom actions per row.

## [1.2.0] - 2019-10-07
### Added
- Ability to customize rows with templates.

### Changed
- Replaced Lodash function calls with custom functions.

### Fixed
- Errors when undefined or null were passed as component parameters.

## [1.1.0] - 2019-10-02
### Added
- Ability to control pagination by passing a Laravel pagination object.
- Result sorting and sort events.
