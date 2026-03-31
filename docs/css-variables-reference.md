# ng-hub-ui-paginable — CSS Variables Reference

Complete reference of all CSS custom properties (CSS variables) exposed by the `ng-hub-ui-paginable` library. Use these variables to customize the appearance of the **Table**, **List**, and **Paginator** components without modifying source code.

---

## Table of Contents

- [How it Works](#how-it-works)
- [Importing Styles](#importing-styles)
- [Base System Fallbacks](#base-system-fallbacks)
- [Paginator Variables](#paginator-variables)
- [List Variables](#list-variables)
- [Table Variables](#table-variables)
- [Customization Examples](#customization-examples)
  - [Override a Single Component](#override-a-single-component)
  - [Dark Theme](#dark-theme)
  - [Compact Table](#compact-table)
  - [Custom Brand Colors](#custom-brand-colors)
  - [Bootstrap Integration](#bootstrap-integration)
- [Token Architecture (ref / sys / component)](#token-architecture)
- [Best Practices](#best-practices)

---

## How it Works

The library follows a **three-layer token architecture**:

```
ref (primitives)  →  sys (semantic)  →  component
```

| Layer | Prefix | Purpose |
|-------|--------|---------|
| `ref` | `--hub-ref-*` | Raw design values: colors, spacing, radii, font sizes |
| `sys` | `--hub-sys-*` | Semantic intent: surface colors, text colors, border colors, states |
| `component` | `--hub-{component}-*` | Component-specific tokens that reference `sys` or `ref` |

**Component variables always fall back to `sys`/`ref` tokens**, so changing a single `sys` variable propagates across every component that consumes it.

---

## Importing Styles

Add the following import to your global `styles.scss`:

```scss
@use 'ng-hub-ui-paginable/src/lib/styles/paginable.scss';
```

> **Tip**: Use `@use` instead of `@import` for proper SCSS scoping.

---

## Base System Fallbacks

Defined on `:root, :host`. These provide **sensible defaults** for the entire system. Override them to propagate changes globally.

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-sys-surface-page` | `#ffffff` | Main background color for pages and containers |
| `--hub-sys-border-color-default` | `#dee2e6` | Default border color used across all components |
| `--hub-sys-color-primary` | `#0d6efd` | Primary brand/action color |
| `--hub-sys-text-primary` | `#212529` | Primary text color |
| `--hub-sys-text-muted` | `#6c757d` | Secondary/muted text color |
| `--hub-sys-state-active-bg` | `rgba(0, 0, 0, 0.1)` | Background for active state (table rows) |
| `--hub-sys-state-hover-bg` | `rgba(0, 0, 0, 0.075)` | Background for hover state (table rows) |
| `--hub-sys-state-striped-bg` | `rgba(0, 0, 0, 0.05)` | Background for striped rows |
| `--hub-ref-surface-2` | `#f8f9fa` | Elevated/secondary surface color |
| `--hub-ref-color-white` | `#fff` | White color reference |
| `--hub-ref-border-width` | `1px` | Default border width |
| `--hub-ref-radius-sm` | `0.25rem` | Small border radius |
| `--hub-ref-radius-md` | `0.375rem` | Medium border radius |
| `--hub-ref-space-1` | `0.25rem` | Spacing scale — extra small |
| `--hub-ref-space-2` | `0.5rem` | Spacing scale — small |
| `--hub-ref-space-3` | `1rem` | Spacing scale — medium/base |
| `--hub-ref-icon-size` | `1em` | Default icon size |
| `--hub-ref-font-size-base` | `1rem` | Base font size |

---

## Paginator Variables

Defined on `.hub-paginator`. Control the appearance of pagination controls used by both the standalone `<hub-ui-paginator>` and the paginator embedded in `<hub-ui-table>`.

> Embedded paginators can also be themed contextually via `--hub-table-pagination-*` and `--hub-list-pagination-*` tokens defined on table/list hosts.

### Layout

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-paginator-font-size` | `var(--hub-ref-font-size-base)` | Font size for paginator text |
| `--hub-paginator-gap` | `var(--hub-ref-space-1)` | Gap between page items |
| `--hub-paginator-settings-gap` | `var(--hub-ref-space-2)` | Gap between settings controls (per-page selector, labels) |

### Page Links

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-paginator-link-color` | `var(--hub-sys-color-primary)` | Text color of page links |
| `--hub-paginator-link-bg` | `var(--hub-sys-surface-page)` | Background of page links |
| `--hub-paginator-link-border-color` | `var(--hub-sys-border-color-default)` | Border color of page links |
| `--hub-paginator-link-border-radius` | `var(--hub-ref-radius-sm)` | Border radius of page links |

### Page Links — Hover

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-paginator-link-hover-color` | `var(--hub-sys-color-primary)` | Text color on hover |
| `--hub-paginator-link-hover-bg` | `var(--hub-ref-surface-2)` | Background on hover |
| `--hub-paginator-link-hover-border-color` | `var(--hub-sys-border-color-default)` | Border color on hover |

### Page Links — Active (Current Page)

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-paginator-link-active-color` | `var(--hub-ref-color-white)` | Text color of the active page |
| `--hub-paginator-link-active-bg` | `var(--hub-sys-color-primary)` | Background of the active page |
| `--hub-paginator-link-active-border-color` | `var(--hub-sys-color-primary)` | Border of the active page |

### Page Links — Disabled

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-paginator-link-disabled-color` | `var(--hub-sys-text-muted)` | Text color when disabled |
| `--hub-paginator-link-disabled-bg` | `var(--hub-ref-surface-2)` | Background when disabled |
| `--hub-paginator-link-disabled-border-color` | `var(--hub-sys-border-color-default)` | Border when disabled |

### Select (Per-Page Dropdown)

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-paginator-select-color` | `var(--hub-sys-text-primary)` | Text color of the per-page select |
| `--hub-paginator-select-bg` | `var(--hub-sys-surface-page)` | Background of the per-page select |
| `--hub-paginator-select-border-color` | `var(--hub-sys-border-color-default)` | Border of the per-page select |
| `--hub-paginator-select-border-radius` | `var(--hub-ref-radius-sm)` | Border radius of the per-page select |
| `--hub-paginator-select-padding-x` | `var(--hub-ref-space-2)` | Horizontal padding of the select |
| `--hub-paginator-select-padding-y` | `var(--hub-ref-space-1)` | Vertical padding of the select |

### Misc

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-paginator-icon-color` | `var(--hub-sys-text-primary)` | Color of navigation icons (arrows) |
| `--hub-paginator-icon-size` | `1em` | Size of navigation icons |
| `--hub-paginator-info-color` | `var(--hub-sys-text-muted)` | Color of pagination info text ("Showing 1 to 10 of 100") |
| `--hub-paginator-label-color` | `var(--hub-sys-text-muted)` | Color of labels (e.g., "Items per page") |

---

## List Variables

Defined on `.hub-list`. Control the appearance of the `<hub-ui-list>` component (hierarchical/tree lists).

### Bottom Bar Layout (List)

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-bottom-bar-gap` | `var(--hub-ref-space-3)` | Gap between bottom bar blocks |
| `--hub-list-bottom-bar-justify-content` | `space-around` | Main axis distribution of bottom bar blocks |
| `--hub-list-bottom-bar-align-items` | `center` | Cross-axis alignment of bottom bar blocks |
| `--hub-list-bottom-bar-wrap` | `wrap` | Wrapping behavior for bottom bar blocks |
| `--hub-list-bottom-bar-paginator-order` | `1` | Order of paginator block |
| `--hub-list-bottom-bar-settings-order` | `2` | Order of rows-per-page block |
| `--hub-list-bottom-bar-info-order` | `3` | Order of info block |
| `--hub-list-bottom-bar-paginator-flex` | `0 0 auto` | Flex value for paginator block |
| `--hub-list-bottom-bar-settings-flex` | `0 0 auto` | Flex value for settings block |
| `--hub-list-bottom-bar-info-flex` | `0 0 auto` | Flex value for info block |

### Top Bar Layout (List)

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-top-bar-gap` | `var(--hub-ref-space-2)` | Gap between top bar blocks |
| `--hub-list-top-bar-justify-content` | `end` | Main axis distribution for top bar blocks |
| `--hub-list-top-bar-align-items` | `center` | Cross-axis alignment for top bar blocks |
| `--hub-list-top-bar-wrap` | `wrap` | Wrapping behavior for top bar blocks |
| `--hub-list-batch-actions-gap` | `var(--hub-ref-space-2)` | Gap between list batch action buttons |

### Context Pagination Tokens (List)

These tokens style the embedded paginator from the list host:

- `--hub-list-pagination-font-size`, `--hub-list-pagination-gap`
- `--hub-list-pagination-icon-color`, `--hub-list-pagination-icon-size`
- `--hub-list-pagination-label-color`, `--hub-list-pagination-info-color`
- `--hub-list-pagination-link-color`, `--hub-list-pagination-link-bg`, `--hub-list-pagination-link-border-color`, `--hub-list-pagination-link-border-radius`
- `--hub-list-pagination-link-hover-*`, `--hub-list-pagination-link-active-*`, `--hub-list-pagination-link-disabled-*`
- `--hub-list-pagination-select-bg`, `--hub-list-pagination-select-border-color`, `--hub-list-pagination-select-border-radius`, `--hub-list-pagination-select-color`, `--hub-list-pagination-select-padding-x`, `--hub-list-pagination-select-padding-y`
- `--hub-list-pagination-settings-gap`

### Container

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-container-bg` | `var(--hub-sys-surface-page)` | Background of the list container |
| `--hub-list-container-border-radius` | `var(--hub-ref-radius-md)` | Border radius of the list container |
| `--hub-list-container-gap` | `var(--hub-ref-space-2)` | Gap between list items |
| `--hub-list-container-padding-x` | `var(--hub-ref-space-3)` | Horizontal padding of the container |
| `--hub-list-container-padding-y` | `var(--hub-ref-space-3)` | Vertical padding of the container |

### Cards Layout

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-cards-min-column-width` | `18rem` | Minimum width used by each root-level card column |
| `--hub-list-cards-gap` | `var(--hub-list-container-gap)` | Gap between cards when `options.display = 'cards'` |

### Items

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-item-color` | `var(--hub-sys-text-primary)` | Text color of list items |
| `--hub-list-item-border-color` | `var(--hub-sys-border-color-default)` | Border color of list items |
| `--hub-list-item-border-radius` | `var(--hub-ref-radius-sm)` | Border radius of list items |
| `--hub-list-item-gap` | `var(--hub-ref-space-2)` | Internal gap within items |
| `--hub-list-item-padding-x` | `var(--hub-ref-space-3)` | Horizontal padding of items |
| `--hub-list-item-padding-y` | `var(--hub-ref-space-2)` | Vertical padding of items |
| `--hub-list-item-hover-bg` | `var(--hub-ref-surface-2)` | Background color on item hover |

### Items — Selected

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-item-selected-bg` | `var(--hub-sys-color-primary)` | Background of selected items |
| `--hub-list-item-selected-color` | `var(--hub-ref-color-white)` | Text color of selected items |

### Empty State

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-empty-bg` | `var(--hub-ref-surface-2)` | Background when the list is empty |
| `--hub-list-empty-border-color` | `var(--hub-sys-border-color-default)` | Border color of the empty state |
| `--hub-list-empty-color` | `var(--hub-sys-text-muted)` | Text color of the empty state |
| `--hub-list-empty-padding` | `var(--hub-ref-space-3)` | Padding of the empty state |

### Search

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-search-input-bg` | `var(--hub-sys-surface-page)` | Background of the search input |
| `--hub-list-search-input-border-color` | `var(--hub-sys-border-color-default)` | Border color of the search input |
| `--hub-list-search-input-border-radius` | `var(--hub-ref-radius-sm)` | Border radius of the search input |
| `--hub-list-search-input-color` | `var(--hub-sys-text-primary)` | Text color of the search input |
| `--hub-list-search-btn-bg` | `var(--hub-ref-surface-2)` | Background of the search button |
| `--hub-list-search-btn-color` | `var(--hub-sys-text-primary)` | Text/icon color of the search button |
| `--hub-list-search-button-min-width` | `2.75rem` | Minimum width of the search button |
| `--hub-list-search-border-color` | `var(--hub-list-search-input-border-color)` | Shared border color for search input/button |
| `--hub-list-search-border-width` | `1px` | Shared border width for search input/button |
| `--hub-list-search-border-radius` | `var(--hub-list-search-input-border-radius)` | Shared border radius for search input/button |
| `--hub-list-search-input-padding-x` | `0.75rem` | Horizontal padding of the search input |
| `--hub-list-search-input-padding-y` | `0.375rem` | Vertical padding of the search input |
| `--hub-list-search-input-font-size` | `1rem` | Font size of the search input |

### Action Buttons (List)

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-action-btn-bg` | `var(--hub-list-container-bg)` | Background of list action buttons |
| `--hub-list-action-btn-color` | `var(--hub-list-item-color)` | Text color of list action buttons |
| `--hub-list-action-btn-border-color` | `var(--hub-list-item-border-color)` | Border color of list action buttons |
| `--hub-list-action-btn-border-radius` | `var(--hub-list-item-border-radius)` | Border radius of list action buttons |
| `--hub-list-action-btn-padding-x` | `0.75rem` | Horizontal padding of list action buttons |
| `--hub-list-action-btn-padding-y` | `0.375rem` | Vertical padding of list action buttons |
| `--hub-list-action-btn-hover-bg` | `var(--hub-list-item-hover-bg)` | Hover background of list action buttons |


### Misc

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-list-checkbox-size` | `1rem` | Size of selection checkboxes |
| `--hub-list-chevron-size` | `var(--hub-ref-icon-size)` | Size of expand/collapse chevrons |

---

## Table Variables

Defined on `.hub-table`. Control the appearance of the `<hub-ui-table>` component.

### Bottom Bar Layout (Table)

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-bottom-bar-gap` | `var(--hub-ref-space-3)` | Gap between bottom bar blocks |
| `--hub-table-bottom-bar-justify-content` | `space-around` | Main axis distribution of bottom bar blocks |
| `--hub-table-bottom-bar-align-items` | `center` | Cross-axis alignment of bottom bar blocks |
| `--hub-table-bottom-bar-wrap` | `wrap` | Wrapping behavior for bottom bar blocks |
| `--hub-table-bottom-bar-paginator-order` | `1` | Order of paginator block |
| `--hub-table-bottom-bar-settings-order` | `2` | Order of rows-per-page block |
| `--hub-table-bottom-bar-info-order` | `3` | Order of info block |
| `--hub-table-bottom-bar-paginator-flex` | `0 0 auto` | Flex value for paginator block |
| `--hub-table-bottom-bar-settings-flex` | `0 0 auto` | Flex value for settings block |
| `--hub-table-bottom-bar-info-flex` | `0 0 auto` | Flex value for info block |

### Top Bar Layout (Table)

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-top-bar-gap` | `var(--hub-ref-space-3)` | Gap between top bar blocks |
| `--hub-table-top-bar-justify-content` | `end` | Main axis distribution for top bar blocks |
| `--hub-table-top-bar-align-items` | `center` | Cross-axis alignment for top bar blocks |
| `--hub-table-top-bar-wrap` | `wrap` | Wrapping behavior for top bar blocks |
| `--hub-table-batch-actions-gap` | `var(--hub-ref-space-2)` | Gap between table batch action buttons |
| `--hub-table-batch-actions-margin-inline-end` | `auto` | Push batch actions to inline start/end depending on direction |

### Context Pagination Tokens (Table)

These tokens style the embedded paginator from the table host:

- `--hub-table-pagination-font-size`, `--hub-table-pagination-gap`
- `--hub-table-pagination-icon-color`, `--hub-table-pagination-icon-size`
- `--hub-table-pagination-label-color`, `--hub-table-pagination-info-color`
- `--hub-table-pagination-link-color`, `--hub-table-pagination-link-bg`, `--hub-table-pagination-link-border-color`, `--hub-table-pagination-link-border-radius`
- `--hub-table-pagination-link-hover-*`, `--hub-table-pagination-link-active-*`, `--hub-table-pagination-link-disabled-*`
- `--hub-table-pagination-select-bg`, `--hub-table-pagination-select-border-color`, `--hub-table-pagination-select-border-radius`, `--hub-table-pagination-select-color`, `--hub-table-pagination-select-padding-x`, `--hub-table-pagination-select-padding-y`
- `--hub-table-pagination-settings-gap`

### Container

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-container-bg` | `var(--hub-ref-color-white)` | Background of the table container |
| `--hub-table-container-color` | `var(--hub-sys-text-primary)` | Text color of the table container |
| `--hub-table-border-color` | `var(--hub-sys-border-color-default)` | Border color used in the table wrapper |
| `--hub-table-border-radius` | `var(--hub-ref-radius-md)` | Border radius of the table container |
| `--hub-table-border-width` | `var(--hub-ref-border-width)` | Border width of the table container |

### Table Element

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-table-bg` | `var(--hub-ref-color-white)` | Background of the `<table>` element |
| `--hub-table-table-color` | `var(--hub-sys-text-primary)` | Text color inside the table |
| `--hub-table-table-border-color` | `var(--hub-sys-border-color-default)` | Border color of table rows and cells |
| `--hub-table-table-border-width` | `var(--hub-ref-border-width)` | Border width of table rows and cells |
| `--hub-table-table-group-separator-color` | `var(--hub-sys-border-color-default)` | Color of the separator between thead and tbody |

### Cell Spacing

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-table-cell-padding-x` | `var(--hub-ref-space-3)` | Horizontal cell padding (normal) |
| `--hub-table-table-cell-padding-y` | `var(--hub-ref-space-2)` | Vertical cell padding (normal) |
| `--hub-table-table-cell-padding-x-sm` | `var(--hub-ref-space-2)` | Horizontal cell padding (compact/small) |
| `--hub-table-table-cell-padding-y-sm` | `var(--hub-ref-space-1)` | Vertical cell padding (compact/small) |
| `--hub-table-table-cell-vertical-align` | `middle` | Vertical alignment of cell content |

### Row States

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-table-hover-bg` | `var(--hub-sys-state-hover-bg)` | Background on row hover |
| `--hub-table-table-hover-color` | `var(--hub-sys-text-primary)` | Text color on row hover |
| `--hub-table-table-active-bg` | `var(--hub-sys-state-active-bg)` | Background for active rows |
| `--hub-table-table-active-color` | `var(--hub-sys-text-primary)` | Text color for active rows |
| `--hub-table-table-striped-bg` | `var(--hub-sys-state-striped-bg)` | Background for striped rows |
| `--hub-table-table-striped-color` | `var(--hub-sys-text-primary)` | Text color for striped rows |

### Accent Layer (Advanced)

These variables power the cascade pattern for row states (`striped`, `hover`, `active`). They are set internally and generally should not be overridden directly.

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-table-accent-bg` | `transparent` | Base accent background |
| `--hub-table-table-bg-type` | `initial` | Background set by variant type (striped) |
| `--hub-table-table-bg-state` | `initial` | Background set by interaction state (hover, active) |
| `--hub-table-table-color-type` | `initial` | Color set by variant type |
| `--hub-table-table-color-state` | `initial` | Color set by interaction state |

### Icons

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-icon-color` | `currentColor` | Color of table icons (sort, filter, etc.) |
| `--hub-table-icon-size` | `1em` | Base size of table icons |

### Responsive Breakpoints

| Variable | Default | Description |
|----------|---------|-------------|
| `--hub-table-breakpoint-sm` | `576px` | Small breakpoint |
| `--hub-table-breakpoint-md` | `768px` | Medium breakpoint |
| `--hub-table-breakpoint-lg` | `992px` | Large breakpoint |
| `--hub-table-breakpoint-xl` | `1200px` | Extra large breakpoint |
| `--hub-table-breakpoint-xxl` | `1400px` | Extra extra large breakpoint |

---

## Customization Examples

### Override a Single Component

Change only the paginator's active color to green:

```scss
.hub-paginator {
  --hub-paginator-link-active-bg: #198754;
  --hub-paginator-link-active-border-color: #198754;
  --hub-paginator-link-color: #198754;
  --hub-paginator-link-hover-color: #157347;
}
```

### Dark Theme

Override the system-level tokens to switch all three components to dark mode at once:

```scss
[data-theme='dark'],
.dark-theme {
  --hub-sys-surface-page: #121212;
  --hub-sys-text-primary: #f8f9fa;
  --hub-sys-text-muted: #adb5bd;
  --hub-sys-border-color-default: #343a40;
  --hub-sys-color-primary: #6ea8fe;
  --hub-sys-state-hover-bg: rgba(255, 255, 255, 0.075);
  --hub-sys-state-active-bg: rgba(255, 255, 255, 0.1);
  --hub-sys-state-striped-bg: rgba(255, 255, 255, 0.05);
  --hub-ref-surface-2: #1e1e1e;
  --hub-ref-color-white: #fff;
}

/* Optional: override table-specific tokens for dark */
.dark-theme .hub-table {
  --hub-table-container-bg: #1e1e1e;
  --hub-table-table-bg: #1e1e1e;
}
```

### Compact Table

Reduce spacing for a denser data display:

```scss
.compact-table .hub-table {
  --hub-table-table-cell-padding-x: 0.5rem;
  --hub-table-table-cell-padding-y: 0.25rem;
  --hub-table-border-radius: 0.2rem;
  font-size: 0.875rem;
}

.compact-table .hub-paginator {
  --hub-paginator-font-size: 0.8rem;
  --hub-paginator-gap: 0.125rem;
}
```

### Custom Brand Colors

Apply your brand color to the primary actions across all components:

```scss
:root {
  /* Change the primary color globally */
  --hub-sys-color-primary: #7c3aed; /* Purple brand */
}
```

This single change will automatically update:
- Paginator active page background and link colors
- List selected item background
- Any other component consuming `--hub-sys-color-primary`

### Bootstrap Integration

If you use Bootstrap 5, you can bridge Bootstrap tokens into the hub system:

```scss
:root {
  --hub-sys-surface-page: var(--bs-body-bg);
  --hub-sys-text-primary: var(--bs-body-color);
  --hub-sys-border-color-default: var(--bs-border-color);
  --hub-sys-color-primary: var(--bs-primary);
  --hub-ref-radius-sm: var(--bs-border-radius-sm);
  --hub-ref-radius-md: var(--bs-border-radius);
}
```

### Scoped Override per Instance

Wrap a specific table in a class to override its styles without affecting others:

```html
<div class="finance-table">
  <hub-ui-table [headers]="headers" [data]="data"></hub-ui-table>
</div>
```

```scss
.finance-table .hub-table {
  --hub-table-table-striped-bg: rgba(25, 135, 84, 0.05);
  --hub-table-table-hover-bg: rgba(25, 135, 84, 0.1);
}

.finance-table .hub-paginator {
  --hub-paginator-link-active-bg: #198754;
  --hub-paginator-link-active-border-color: #198754;
}
```

### List with Custom Selection Color

```scss
.custom-list .hub-list {
  --hub-list-item-selected-bg: #7c3aed;
  --hub-list-item-selected-color: #fff;
  --hub-list-item-hover-bg: rgba(124, 58, 237, 0.08);
  --hub-list-container-border-radius: 0.5rem;
}
```

---

## Token Architecture

### Relationship Diagram

```
┌─────────────────────────────────────────────────────┐
│  ref layer (primitives)                             │
│  --hub-ref-color-white: #fff                        │
│  --hub-ref-space-2: 0.5rem                          │
│  --hub-ref-radius-sm: 0.25rem                       │
└──────────────────┬──────────────────────────────────┘
                   │ consumed by
                   ▼
┌─────────────────────────────────────────────────────┐
│  sys layer (semantic)                               │
│  --hub-sys-surface-page: #ffffff                    │
│  --hub-sys-color-primary: #0d6efd                   │
│  --hub-sys-border-color-default: #dee2e6            │
└──────────────────┬──────────────────────────────────┘
                   │ consumed by
                   ▼
┌─────────────────────────────────────────────────────┐
│  component layer                                    │
│  --hub-paginator-link-bg: var(--hub-sys-surface-page)│
│  --hub-table-table-color: var(--hub-sys-text-primary)│
│  --hub-list-item-hover-bg: var(--hub-ref-surface-2)  │
└─────────────────────────────────────────────────────┘
```

### Override Priority

1. **Highest priority**: Component-level variable override (e.g., `--hub-paginator-link-bg: red`)
2. **Medium priority**: System-level variable override (e.g., `--hub-sys-surface-page: #f0f0f0`)
3. **Lowest priority**: Reference-level variable override (e.g., `--hub-ref-color-white: #fafafa`)

Override at the **sys level** when you want consistent theming across components. Override at the **component level** when you need granular control over a specific element.

---

## Best Practices

1. **Theme globally with `sys` tokens**. Changing `--hub-sys-color-primary` updates every component.
2. **Use component tokens for granular control**. If only the paginator needs a different active color, override `--hub-paginator-link-active-bg`.
3. **Scope overrides with CSS classes**. Wrap components in containers and target `.my-context .hub-table { ... }` to avoid leaking styles.
4. **Prefer `@use` over `@import`** when including the library's SCSS to avoid polluting the global namespace.
5. **Do not override accent/state internal variables** (`--hub-table-table-bg-state`, `--hub-table-table-bg-type`) unless you fully understand the cascade pattern.
6. **Test in both light and dark themes** if your application supports theming.
7. **Persist user preferences** (e.g., compact vs. normal) in localStorage and apply the corresponding CSS class on load.
