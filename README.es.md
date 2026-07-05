# ng-hub-ui-paginable

**Español** | [English](./README.md)

## Documentación y ejemplos en vivo

Este paquete forma parte de [Hub UI](https://hubui.dev/), una colección de bibliotecas de componentes Angular para aplicaciones standalone.

- Documentación: https://hubui.dev/paginable/overview/
- Ejemplos en vivo: https://hubui.dev/paginable/examples/
- Hub UI: https://hubui.dev/

## 🧩 Familia de bibliotecas `ng-hub-ui`

Esta biblioteca forma parte del ecosistema **ng-hub-ui**:

- [**ng-hub-ui-accordion**](https://www.npmjs.com/package/ng-hub-ui-accordion) _(obsoleto — usa ng-hub-ui-panels)_
- [**ng-hub-ui-action-sheet**](https://www.npmjs.com/package/ng-hub-ui-action-sheet)
- [**ng-hub-ui-avatar**](https://www.npmjs.com/package/ng-hub-ui-avatar)
- [**ng-hub-ui-board**](https://www.npmjs.com/package/ng-hub-ui-board)
- [**ng-hub-ui-breadcrumbs**](https://www.npmjs.com/package/ng-hub-ui-breadcrumbs)
- [**ng-hub-ui-calendar**](https://www.npmjs.com/package/ng-hub-ui-calendar)
- [**ng-hub-ui-dropdown**](https://www.npmjs.com/package/ng-hub-ui-dropdown)
- [**ng-hub-ui-ds**](https://www.npmjs.com/package/ng-hub-ui-ds)
- [**ng-hub-ui-forms**](https://www.npmjs.com/package/ng-hub-ui-forms)
- [**ng-hub-ui-history**](https://www.npmjs.com/package/ng-hub-ui-history)
- [**ng-hub-ui-milestones**](https://www.npmjs.com/package/ng-hub-ui-milestones)
- [**ng-hub-ui-modal**](https://www.npmjs.com/package/ng-hub-ui-modal)
- [**ng-hub-ui-nav**](https://www.npmjs.com/package/ng-hub-ui-nav)
- [**ng-hub-ui-paginable**](https://www.npmjs.com/package/ng-hub-ui-paginable) ← Estás aquí
- [**ng-hub-ui-panels**](https://www.npmjs.com/package/ng-hub-ui-panels)
- [**ng-hub-ui-portal**](https://www.npmjs.com/package/ng-hub-ui-portal)
- [**ng-hub-ui-skeleton**](https://www.npmjs.com/package/ng-hub-ui-skeleton)
- [**ng-hub-ui-sortable**](https://www.npmjs.com/package/ng-hub-ui-sortable)
- [**ng-hub-ui-stepper**](https://www.npmjs.com/package/ng-hub-ui-stepper)
- [**ng-hub-ui-utils**](https://www.npmjs.com/package/ng-hub-ui-utils)

---

## 📋 Índice

- [🚀 Inicio rápido](#-inicio-rápido)
- [✨ Inspiración](#-inspiración)
- [📦 Descripción](#-descripción)
- [🎯 Funcionalidades](#-funcionalidades)
- [🏗️ Arquitectura de componentes](#️-arquitectura-de-componentes)
- [🚀 Instalación](#-instalación)
- [⚙️ Uso](#️-uso)
- [🏗️ Configuración de cabeceras de tabla](#️-configuración-de-cabeceras-de-tabla-paginabletableheader)
- [🔧 Columnas redimensionables](#-columnas-redimensionables)
- [🎪 Componentes adicionales](#-componentes-adicionales)
- [🪄 Referencia de API](#-referencia-de-api)
- [🎠 Plantillas](#-plantillas)
- [🧩 Estilos](#-estilos)
- [⚡ Consejos de rendimiento](#-consejos-de-rendimiento)
- [🔧 Solución de problemas](#-solución-de-problemas)
- [♿ Accesibilidad](#-accesibilidad)
- [🧪 Guía de testing](#-guía-de-testing)
- [📚 Guía de migración](#-guía-de-migración)
- [❓ FAQ](#-faq)
- [🔍 Filtros personalizados](#-filtros-personalizados-filtertpt)
- [🧠 Paginación y gestión de datos](#-paginación-y-gestión-de-datos)
- [🧬 Interfaz PaginationState](#-interfaz-paginationstatet)
- [🌍 Internacionalización y traducciones](#-internacionalización-y-traducciones)
- [📊 Changelog](#-changelog)
- [🤝 Contribuir](#-contribuir)
- [☕ Soporte](#-soporte)
- [🏆 Colaboradores](#-colaboradores)
- [📄 Licencia](#-licencia)

---

## 🚀 Inicio rápido

Arranca con ng-hub-ui-paginable en menos de 5 minutos:

### 1. Instalar

```bash
npm install ng-hub-ui-paginable
```

### 2. Importar

```typescript
import { TableComponent } from 'ng-hub-ui-paginable';

@Component({
  imports: [TableComponent],
  // ...
})
```

### 3. Usar

```html
<hub-ui-table
	[headers]="[{property: 'name', title: 'Name'}, {property: 'email', title: 'Email'}]"
	[data]="[{name: 'John', email: 'john@example.com'}]"
>
</hub-ui-table>
```

### 4. Funcionalidades avanzadas

```html
<hub-ui-table
	[headers]="headers"
	[data]="data"
	[searchable]="true"
	[selectable]="true"
	[(searchTerm)]="searchTerm"
	[(page)]="currentPage"
>
</hub-ui-table>
```

**💡 ¡Listo!** Ya tienes una tabla funcional con búsqueda, paginación y selección.

---

## ✨ Inspiración

Esta biblioteca nace de la necesidad de ofrecer componentes de visualización de datos altamente configurables, accesibles y modernos para aplicaciones Angular, permitiendo listas, tablas y paginación integradas con soporte completo para señales, formularios reactivos y personalización total del renderizado.

## 📦 Descripción

`ng-hub-ui-paginable` proporciona tres componentes principales que trabajan juntos de manera fluida:

- **Componente Tabla** (`<hub-ui-table>` o `<hub-table>`): Tabla de datos avanzada con paginación, filtros, ordenación y selección
- **Componente Lista** (`<hub-ui-list>` o `<hub-list>`): Lista jerárquica con elementos expandibles, selección y plantillas personalizadas
- **Componente Paginador** (`<hub-ui-paginator>` o `<hub-paginator>`): Controles de paginación independientes
- **Componentes Adicionales**: Iconos, dropdowns, columnas redimensionables, inputs de rango y menús de filtro

Todos los componentes están construidos como componentes standalone de Angular con soporte completo para Angular Signals.

> ⚠️ **Cambios breaking en v22.0.0**
> Esta versión major reestructura la API CSS de List (el bloque `.hub-list` pasa al host y el `<ul>` se convierte en `.hub-list__items`), renombra las variables `--hub-list-container-*` y elimina las variables `--hub-table-breakpoint-*` no funcionales. El `peerDependencies` se mantiene en `>=18.0.0`, así que Angular 18–22 siguen soportados.
> Revisa la migración en [BREAKING_CHANGES.md](./BREAKING_CHANGES.md) antes de actualizar.

---

## 🎯 Funcionalidades

### Funcionalidades centrales

- **🔄 Soporte completo para Angular Signals**: Arquitectura moderna con `model()`, `input()`, `computed()` y `effect()`
- **📊 Entrada de datos flexible**: Compatible con entradas separadas o agrupadas mediante `PaginationState`
- **🔍 Filtros avanzados**: Filtros por columna con múltiples tipos (texto, dropdown, booleano, rango de fechas, rango numérico)
- **📋 Ordenación inteligente**: Ordenación ascendente/descendente con indicadores visuales
- **☑️ Selección de filas**: Selección simple o múltiple con operaciones en lote y ControlValueAccessor
- **📈 Contenido expandible**: Filas colapsables con plantillas personalizadas
- **📄 Paginación dual**: Paginación **en cliente** automática para arrays (búsqueda, filtrado, orden y troceo en memoria) o **en servidor** vía `PaginationState` / `totalItems`
- **🎨 Personalización de plantillas**: Cabeceras, celdas, filtros y estados (vacío, carga, error)
- **📱 Diseño responsive**: Breakpoints configurables
- **♿ Listo para accesibilidad**: Soporte ARIA y navegación por teclado
- **⚡ Optimizado para rendimiento**: Debounce en búsqueda/filtrado y detección eficiente
- **🌍 Internacionalización**: i18n completo con traducciones personalizables (inglés/español)

### Funcionalidades avanzadas

- **🔧 Columnas redimensionables**: Ajuste interactivo de ancho
- **📌 Columnas fijas**: Anclar columnas al inicio o fin
- **🎭 Visibilidad dinámica de columnas**: Mostrar/ocultar por condiciones o permisos
- **🔘 Botones de acción**: Acciones por fila con dropdowns
- **🎪 Iconos personalizados**: FontAwesome, Material Icons y Bootstrap Icons
- **🎨 Variantes visuales**: Filas rayadas, hover y temas
- **🔍 Filtros de menú**: Paneles de filtro dedicados
- **🧩 Filtros de menú con reglas múltiples**: Operadores AND/OR, validaciones nulas y modos por regla
- **📋 Listas jerárquicas**: Estructuras tipo árbol
- **🃏 Modo cards para listas**: El componente de lista puede renderizar el nivel raíz como una rejilla de tarjetas mediante `options.display = 'cards'`
- **🎛 Tematización contextual de paginación**: El paginador hereda tokens de Table/List sin duplicar variables de paginador
- **↔️ Tokens de layout de barra inferior**: Permite reordenar y alinear paginador/settings/info en Table y List mediante variables CSS

### Uso del componente lista como cards

```html
<hub-ui-list
	[items]="products()"
	[bindLabel]="'name'"
	[bindChildren]="'children'"
	[options]="{
		display: 'cards',
		searchable: true,
		collapsed: true
	}"
>
</hub-ui-list>
```

`options.display` acepta `'list' | 'cards'`. El modo `cards` solo afecta al nivel raíz del componente de lista.

## 🏗️ Arquitectura de componentes

### Estructura de la librería

```
ng-hub-ui-paginable/
├── 📦 Core Components
│   ├── TableComponent        - Main data table with all features
│   ├── PaginatorComponent    - Standalone pagination controls
│   └── ListComponent - Hierarchical list with tree structure
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
│   └── PaginableNoResultsDirective     - Empty states
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

### Relaciones entre componentes

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
│  │ └── PaginableNoResultsDirective                      │
│  └─────────────────────────────────────────────────────────┤
│                    PaginatorComponent                      │
└─────────────────────────────────────────────────────────────┘
```

### Arquitectura de flujo de datos

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

### Reactividad basada en Signals

La librería aprovecha Angular Signals para rendimiento y reactividad:

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
		result = result.filter((item) => item.name.toLowerCase().includes(this.searchTerm().toLowerCase()));
	}

	// Apply filters
	const filters = this.filters();
	Object.keys(filters).forEach((key) => {
		if (filters[key]) {
			result = result.filter((item) => item[key] === filters[key]);
		}
	});

	// Apply sorting
	const sort = this.ordination();
	if (sort) {
		result.sort((a, b) => {
			const aVal = a[sort.property];
			const bVal = b[sort.property];
			return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
		});
	}

	return result;
});
```

## 🚀 Instalación

```bash
npm install ng-hub-ui-paginable
```

## ⚙️ Uso

### Configuración básica de tabla

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
			[debounce]="300"
		>
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

### Uso del componente de lista

```html
<hub-ui-list
	[items]="items()"
	[selectable]="true"
	[bindLabel]="'name'"
	[bindChildren]="'children'"
	[options]="{ collapsed: false, searchable: true }"
	[clickFn]="onItemClick"
>
	<!-- Custom item template -->
	<ng-template listItem let-data="data" let-depth="depth">
		<div class="d-flex align-items-center">
			<span [style.margin-left.px]="depth * 20"> {{ data.name }} </span>
			<span class="badge bg-secondary ms-auto"> {{ data.type }} </span>
		</div>
	</ng-template>
</hub-ui-list>
```

### Paginador independiente

```html
<hub-ui-paginator [(page)]="currentPage" [numberOfPages]="totalPages()"> </hub-ui-paginator>
```

## 🏗️ Configuración de cabeceras de tabla (`PaginableTableHeader`)

`PaginableTableHeader` es la configuración principal para definir columnas. Permite personalizar cabeceras, ordenación, filtros, acciones y visibilidad.

### Configuración básica de cabeceras

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

### Referencia de propiedades de cabecera

| Propiedad     | Tipo                                             | Descripción                                                   | Por defecto         | Ejemplo                                                                    |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------- |
| `property`    | `string`                                         | **Obligatoria.** Propiedad del dato a mostrar en esta columna | -                   | `'name'`, `'user.email'`                                                   |
| `title`       | `string \| Observable<string>`                   | Título de cabecera. Puede ser estático o reactivo             | valor de `property` | `'User Name'`, `this.translate.get('user.name')`                           |
| `icon`        | `string \| Icon`                                 | Icono a mostrar en la cabecera                                | -                   | `'fa-user'`, `{ type: 'material', value: 'person' }`                       |
| `align`       | `'start' \| 'end' \| 'center'`                   | Alineación de texto de la columna                             | `'start'`           | `'center'` para números                                                    |
| `sortable`    | `boolean`                                        | Habilita la ordenación en esta columna                        | `false`             | `true`                                                                     |
| `wrapping`    | `'wrap' \| 'nowrap'`                             | Comportamiento de salto de línea                              | `'wrap'`            | `'nowrap'` para IDs                                                        |
| `sticky`      | `'start' \| 'end'`                               | Fija la columna durante el scroll                             | -                   | `'end'` para acciones                                                      |
| `buttons`     | `Array<PaginableActionButton \| PaginableTableDropdown>` | Botones de acción en esta columna                             | -                   | Ver [Botones de acción](#botones-de-accion)                                |
| `filter`      | `InputFilter \| DropdownFilter \| BooleanFilter` | Configuración del filtro                                      | -                   | Ver [Filtros de columna](#filtros-de-columna)                              |
| `onlyButtons` | `boolean`                                        | Optimiza el layout para columnas solo de botones              | `false`             | `true` para columnas de acción                                             |
| `hidden`      | `boolean \| Function`                            | Controla la visibilidad de la columna                         | `false`             | Ver [Visibilidad de columnas](#control-de-visibilidad-de-columnas-hidden-) |

### Control de visibilidad de columnas (`hidden`) 🆕

La propiedad `hidden` permite controlar la visibilidad de columnas de forma flexible.

#### 1. Visibilidad booleana estática

```typescript
const headers: PaginableTableHeader[] = [
	{
		property: 'id',
		title: 'ID',
		hidden: false // Siempre visible
	},
	{
		property: 'internal_notes',
		title: 'Internal Notes',
		hidden: true // Siempre oculta
	}
];
```

#### 2. Visibilidad dinámica basada en funciones

```typescript
export class UsersComponent {
	showAdvancedColumns = signal(false);
	userRole = signal<'admin' | 'user'>('user');

	headers: PaginableTableHeader[] = [
		{
			property: 'name',
			title: 'Name'
			// Siempre visible
		},
		{
			property: 'email',
			title: 'Email',
			hidden: () => !this.showAdvancedColumns() // Reactivo a cambios en signals
		},
		{
			property: 'salary',
			title: 'Salary',
			hidden: () => this.userRole() !== 'admin' // Visibilidad basada en permisos
		},
		{
			property: 'last_login',
			title: 'Last Login',
			hidden: () => this.userRole() !== 'admin' && !this.showAdvancedColumns()
		}
	];

	toggleAdvancedColumns() {
		this.showAdvancedColumns.update((show) => !show);
	}
}
```

#### 3. Visibilidad asíncrona basada en promesas

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
			// Comprobar permisos de forma asíncrona
			hidden: () => this.permissionService.checkPermission('view.sensitive.data').then((hasPermission) => !hasPermission)
		},
		{
			property: 'feature_column',
			title: 'Feature Data',
			// Comprobar feature flags
			hidden: () => this.configService.getFeatureFlag('show_feature_column').then((enabled) => !enabled)
		}
	];
}
```

#### 4. Visibilidad reactiva basada en Observables

```typescript
export class UsersComponent {
	headers: PaginableTableHeader[] = [
		{
			property: 'premium_data',
			title: 'Premium Data',
			// Usar Observable para visibilidad reactiva
			hidden: () => this.userSubscriptionService.hasPremiumAccess$.pipe(map((hasAccess) => !hasAccess))
		}
	];
}
```

#### 5. Lógica de visibilidad compleja

```typescript
export class UsersComponent {
	headers: PaginableTableHeader[] = [
		{
			property: 'advanced_metrics',
			title: 'Advanced Metrics',
			hidden: () => {
				const isAdmin = this.userRole() === 'admin';
				const hasFeature = this.features().includes('advanced_metrics');
				const hasData = this.dataLoaded();
				return !(isAdmin && hasFeature && hasData);
			}
		}
	];
}
```

#### Ejemplo de uso en plantilla

```html
<hub-ui-table [headers]="headers" [data]="users()"> </hub-ui-table>
```

### Gestión dinámica de columnas

Usa arrays dinámicos para añadir o quitar columnas en tiempo de ejecución:

```typescript
export class DynamicColumnsComponent {
	baseHeaders: PaginableTableHeader[] = [
		{ property: 'name', title: 'Name' },
		{ property: 'email', title: 'Email' }
	];

	optionalHeaders: PaginableTableHeader[] = [
		{ property: 'phone', title: 'Phone' },
		{ property: 'address', title: 'Address' }
	];

	showOptionalColumns = signal(false);

	headers = computed(() => {
		return this.showOptionalColumns() ? [...this.baseHeaders, ...this.optionalHeaders] : this.baseHeaders;
	});
}
```

### Buenas prácticas para visibilidad de columnas

- Prefiere funciones para estado reactivo.
- Usa visibilidad asíncrona cuando los permisos se cargan remotamente.
- Mantén la lógica de visibilidad simple y testeable.

## 🔧 Columnas redimensionables

### Funcionalidades de redimensionado

- **Redimensionado interactivo**: Arrastra los bordes para ajustar el ancho
- **Ancho mínimo**: Evita que las columnas queden demasiado estrechas
- **Persistencia**: Los anchos se pueden guardar y restaurar
- **Responsive**: Funciona con layouts responsive

## 🎪 Componentes adicionales

### Componente de iconos (`<hub-ui-icon>`)

Soporta múltiples librerías de iconos con una interfaz unificada:

```html
<!-- FontAwesome icon -->
<hub-ui-icon [config]="{ type: 'font-awesome', value: 'user' }"></hub-ui-icon>

<!-- Material icon -->
<hub-ui-icon [config]="{ type: 'material', value: 'person', variant: 'outlined' }"></hub-ui-icon>

<!-- Bootstrap icon -->
<hub-ui-icon [config]="{ type: 'bootstrap', value: 'person-fill' }"></hub-ui-icon>
```

### Componente de dropdown (`<hub-ui-dropdown>`)

Usado internamente para acciones y filtros:

```typescript
interface PaginableTableDropdown {
	title: string;
	buttons: PaginableActionButton[];
	fill?: string;
	position?: 'start' | 'end';
	color?: string;
}
```

### Componente de rango (`<hub-ui-range-input>`)

Componente especializado para rangos numéricos y de fecha:

```html
<hub-ui-range-input [type]="'number'" [placeholder]="'Min - Max'" [formControl]="rangeControl"> </hub-ui-range-input>
```

### Filtros de menú (automáticos en `mode: 'menu'`)

Los filtros en modo menú se renderizan automáticamente cuando un filtro usa `mode: 'menu'`.
No es necesario instanciar un componente específico.

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
		rules: [{ value: 'john', matchMode: StringMatchModes.Contains }]
	}
});
```

Nota: Las comprobaciones nulas usan `NullMatchModes.IsNull` / `NullMatchModes.IsNotNull` y no requieren valor.

### Botones de acción

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

### Filtros de columna

#### Filtro de texto

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

#### Filtro desplegable

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

#### Filtro booleano

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

#### Filtro de rango de fechas

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

#### Filtro de rango numérico

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

### Modos de filtro

Los filtros pueden mostrarse en dos modos:

- **`row`**: Aparece bajo la cabecera en la fila de filtros
- **`menu`**: Aparece en un dropdown en la cabecera

### Forma del valor en filtros de menú

En `mode: 'menu'`, el valor de `filters` es un `MenuFilterValue` estructurado (operador + reglas). En `row`, el valor es el valor directo del input.

```typescript
import { MenuFilterOperators, StringMatchModes } from 'ng-hub-ui-paginable';

filters = signal({
	name: {
		operator: MenuFilterOperators.And,
		rules: [{ value: 'john', matchMode: StringMatchModes.Contains }]
	}
});
```

### Tipos de filtro disponibles

| Tipo           | Descripción                        | Controles de entrada                  |
| -------------- | ---------------------------------- | ------------------------------------- |
| `text`         | Filtro de búsqueda de texto        | Un input de texto                     |
| `number`       | Filtro de valor numérico           | Un input numérico                     |
| `number-range` | Rango de valores numéricos         | Dos inputs numéricos (min/max)        |
| `date`         | Filtro de fecha única              | Selector de fecha                     |
| `date-range`   | Filtro de rango de fechas          | Dos selectores de fecha (desde/hasta) |
| `boolean`      | Filtro verdadero/falso             | Dropdown con etiquetas personalizadas |
| `dropdown`     | Selección de opciones predefinidas | Control tipo dropdown/select          |

## 🪄 Referencia de API

### Componente de tabla (`<hub-ui-table>`)

#### Inputs

| Nombre               | Tipo                                          | Por defecto     | Descripción                                                            |
| -------------------- | --------------------------------------------- | --------------- | ---------------------------------------------------------------------- |
| `headers`            | `PaginableTableHeader[]`                      | `[]`            | Definición de columnas con títulos, ordenación, filtros y acciones.    |
| `data` / `rows`      | `T[]` o `PaginationState<T>`                  | `[]`            | Datos de tabla. Array plano → modo cliente (paginación en memoria); `PaginationState` → modo servidor. |
| `page`               | `number`                                      | `null`          | Número de página actual (1-based, señal model). En modo cliente se pone a `1` automáticamente. |
| `perPage`            | `number`                                      | `10`            | Número de elementos por página (señal model).                          |
| `perPageOptions`     | `number[]`                                    | `[10, 20, 50, 100]` | Opciones disponibles de elementos por página.                      |
| `totalItems`         | `number`                                      | `null`          | Total de elementos en todas las páginas. Indicarlo selecciona **modo servidor** (renderiza `data` tal cual). |
| `searchable`         | `boolean`                                     | `true`          | Si se muestra el input de búsqueda global.                             |
| `searchTerm`         | `string`                                      | `''`            | Término de búsqueda actual (señal model).                              |
| `searchFn`           | `(a: T, b: T) => boolean`                     | `null`          | Función de búsqueda personalizada para filtrar.                        |
| `selectable`         | `boolean`                                     | `false`         | Si las filas son seleccionables.                                       |
| `multiple`           | `boolean`                                     | `false`         | Si se permite la selección múltiple.                                   |
| `bindValue`          | `string`                                      | `null`          | Propiedad para identificar de forma única los elementos seleccionados. |
| `ordination`         | `PaginableTableOrdination`                    | `null`          | Configuración actual de ordenación (señal model).                      |
| `filters`            | `Record<string, any>`                         | `{}`            | Filtros de columna activos (señal model).                              |
| `debounce`           | `number`                                      | `0`             | Tiempo de debounce en ms para inputs de búsqueda y filtros.            |
| `loading`            | `boolean`                                     | `false`         | Indicador de estado de carga (señal model).                            |
| `paginate`           | `boolean`                                     | `true`          | Habilita la paginación. Con un array y sin `totalItems`, activa el modo cliente automático. `false` renderiza todo el array sin paginar. |
| `paginationPosition` | `'top' \| 'bottom' \| 'both'`                 | `'bottom'`      | Dónde mostrar los controles de paginación.                             |
| `paginationInfo`     | `boolean`                                     | `true`          | Si se muestra info de paginación (p. ej. "Mostrando 1 a 10 de 100").   |
| `stickyActions`      | `boolean`                                     | `false`         | Si los botones de acción quedan fijos durante el scroll.               |
| `batchActions`       | `Array<PaginableTableDropdown \| PaginableActionButton>` | `[]`            | Acciones disponibles para filas seleccionadas.                         |
| `responsive`         | `TableBreakpoint`                             | `null`          | Breakpoint responsive para el layout de la tabla.                      |
| `options`            | `PaginableTableOptions`                       | `{}`            | Configuración visual (cursor, hover, striped, variant).                |
| `clickFn`            | `(event: TableRowEvent<T>) => void`           | `null`          | Manejador para eventos de click en fila.                               |

#### Outputs y eventos

El componente implementa `ControlValueAccessor` para usar `[(ngModel)]` o formularios reactivos:

```html
<!-- Con ngModel -->
<hub-ui-table [(ngModel)]="selectedItems" [multiple]="true"> </hub-ui-table>

<!-- Con formularios reactivos -->
<hub-ui-table [formControl]="selectedItemsControl"> </hub-ui-table>

<!-- Eventos de click en fila -->
<hub-ui-table [clickFn]="handleRowClick"> </hub-ui-table>
```

**Evento de click en fila (`TableRowEvent<T>`):**

```typescript
interface TableRowEvent<T> {
	data: T; // Datos de la fila
	selected: boolean; // Estado de selección
	collapsed: boolean; // Estado de expansión
	event: MouseEvent; // Evento original del ratón
}
```

### Componente de lista (`<hub-ui-list>`)

#### Inputs

| Nombre         | Tipo                                          | Por defecto  | Descripción                                   |
| -------------- | --------------------------------------------- | ------------ | --------------------------------------------- |
| `items`        | `T[]`                                         | `[]`         | Datos de lista jerárquica.                    |
| `bindValue`    | `string`                                      | `null`       | Propiedad para identificación única de ítems. |
| `bindLabel`    | `string`                                      | `'label'`    | Propiedad a mostrar como etiqueta del ítem.   |
| `bindChildren` | `string`                                      | `'children'` | Propiedad que contiene los hijos.             |
| `selectable`   | `string`                                      | `null`       | Configuración del modo de selección.          |
| `options`      | `PaginableTableOptions`                       | `{}`         | Opciones visuales y de comportamiento.        |
| `batchActions` | `Array<PaginableTableDropdown \| PaginableActionButton>` | `[]`         | Acciones para ítems seleccionados.            |
| `clickFn`      | `(event: ListClickEvent<T>) => void`          | `null`       | Manejador para eventos de click en ítems.     |

**Evento de click en lista (`ListClickEvent<T>`):**

```typescript
interface ListClickEvent<T> {
	depth: number; // Nivel de anidamiento
	index: number; // Posición del ítem
	selected: boolean; // Estado de selección
	collapsed: boolean; // Estado de expansión
	value: any; // Valor del ítem (según bindLabel)
	item: T; // Datos completos del ítem
	mouseEvent: MouseEvent; // Evento original del ratón
}
```

### Componente paginador (`<hub-ui-paginator>`)

#### Inputs

| Nombre          | Tipo     | Por defecto | Descripción                  |
| --------------- | -------- | ----------- | ---------------------------- |
| `page`          | `number` | `1`         | Página actual (señal model). |
| `numberOfPages` | `number` | `null`      | Número total de páginas.     |

---

## 🎠 Plantillas

El componente `hub-ui-table` permite sobrescribir prácticamente cualquier sección visual mediante plantillas Angular (`<ng-template>`).

### 🔠 headerTpt (cabecera de columna)

```html
<ng-template headerTpt header="name">
	<span class="text-primary fw-bold">Nombre completo</span>
</ng-template>
```

```html
<ng-template headerTpt header="birthday"> <i class="fa-solid fa-cake-candles me-2"></i> Fecha de nacimiento </ng-template>
```

### 📄 cellTpt (celda de columna)

```html
<ng-template cellTpt header="name" let-data="data"> {{ data.name.toUpperCase() }} </ng-template>
```

```html
<ng-template cellTpt header="age" let-data="data">
	<span [class.text-success]="data.age >= 18"> {{ data.age }} años </span>
</ng-template>
```

```html
<ng-template cellTpt header="adult" let-data="data">
	<hub-ui-icon [config]="{ type: 'material', value: data.adult ? 'check' : 'close' }"></hub-ui-icon>
</ng-template>
```

### 🚫 notFoundTpt (estado vacío)

```html
<ng-template notFoundTpt>
	<div class="alert alert-info text-center">
		<i class="fa-solid fa-circle-info me-2"></i>
		No se encontraron resultados para tu búsqueda.
	</div>
</ng-template>
```

### ⏳ loadingTpt (estado de carga)

```html
<ng-template loadingTpt>
	<div class="text-center p-4">
		<div class="spinner-border text-primary" role="status"></div>
		<p>Cargando datos, espera un momento...</p>
	</div>
</ng-template>
```

### ❌ errorTpt (estado de error)

```html
<ng-template errorTpt>
	<div class="alert alert-danger text-center">
		<i class="fa-solid fa-triangle-exclamation me-2"></i>
		Ha ocurrido un error inesperado. Prueba a recargar la tabla.
	</div>
</ng-template>
```

### 📂 rowTpt (fila personalizada)

```html
<ng-template tableRow let-item>
	<tr>
		<td>{{ item.name }}</td>
		<td>{{ item.lastname }}</td>
		<td>{{ item.age }} años</td>
	</tr>
</ng-template>
```

También puedes usar `tableRowTpt` con componentes expandibles.

---

## 🧩 Estilos

La librería `ng-hub-ui-paginable` es totalmente configurable mediante **CSS custom properties** para **Table**, **List** y **Paginator**.

Para el catálogo completo y actualizado de tokens, consulta [CSS Variables Reference](./docs/css-variables-reference.md).
El paginador embebido en Table y List se tematiza mediante los tokens compartidos `--hub-paginator-*` — sobrescríbelos en el componente anfitrión para adaptarlo al contexto.

### 🔗 Cómo incluir los estilos en tu aplicación

```scss
@use 'bootstrap'; // Opcional pero recomendado
@use 'ng-hub-ui-paginable/src/lib/styles/paginable.scss';
```

### 🎛 Ejemplo rápido de personalización

```scss
.hub-table {
	--hub-table-border-radius: 0.5rem;
	--hub-table-cell-vertical-align: middle;
	--hub-table-hover-bg: rgba(13, 110, 253, 0.08);
}

.hub-list {
	--hub-list-item-border-radius: 0.5rem;
	--hub-list-item-hover-bg: rgba(13, 110, 253, 0.08);
}

.hub-paginator {
	--hub-paginator-link-active-bg: #0d6efd;
	--hub-paginator-link-active-color: #fff;
}
```

### 🔗 Lista conectada (`connected`)

El input `connected` de `<hub-list>` dibuja un conector vertical entre elementos consecutivos (aspecto timeline / pipeline; solo en modo lista, se omite en cards). Se tematiza con `--hub-list-connector-color` / `-width` / `-style` / `-offset`. Desactivado por defecto.

```html
<hub-list [items]="pasos" [connected]="true" [bindLabel]="'title'"> … </hub-list>
```

### 🧩 Mixins SCSS — theming en una llamada

En lugar de fijar los tokens `--hub-*` a mano, puedes tematizar la tabla o la lista en un solo `@include`. Cada parámetro es opcional y por defecto `null`, así que solo se emiten los que pasas (el resto conserva los valores por defecto del componente). Importa el mixin que necesites:

```scss
@use 'ng-hub-ui-paginable/styles/mixins/table-theme' as *;
@use 'ng-hub-ui-paginable/styles/mixins/list-theme' as *;
```

**`hub-table-theme(…)`** — color (`$accent`, `$bg`, `$color`, `$border-color`, `$hover-bg`, `$hover-color`, `$selected-bg`, `$selected-color`, `$striped-bg`, `$striped-color`), borde (`$border-width`, `$border-radius`), densidad (`$cell-padding-x`, `$cell-padding-y`) y footer (`$footer-gap`, `$footer-justify`, `$footer-align`, `$footer-wrap`):

```scss
.tabla-facturas {
	@include hub-table-theme($accent: var(--hub-sys-color-success), $border-radius: 0.5rem, $cell-padding-y: 0.375rem, $footer-justify: end);
}
```

**`hub-list-theme(…)`** — color, borde/radio, densidad (`$gap`, `$item-padding-*`), layout de cards (`$cards-min-column-width`, `$cards-gap`, …) y footer, para `<hub-list>` en modos lista y cards:

```scss
.lista-equipo {
	@include hub-list-theme($accent: var(--hub-sys-color-success), $item-border-radius: 0.75rem, $gap: 0.5rem, $cards-min-column-width: 16rem);
}
```

## ⚡ Consejos de rendimiento

### Debounce en búsqueda y filtros

```html
<hub-ui-table [debounce]="300" [searchable]="true"> </hub-ui-table>
```

### Uso de Angular Signals para datos reactivos

```typescript
export class MyComponent {
	// Datos reactivos con signals
	data = signal<User[]>([]);
	filteredData = computed(() => this.data().filter((user) => user.active));

	// Paginación en servidor
	paginationState = computed(() => ({
		page: this.currentPage(),
		perPage: this.pageSize(),
		totalItems: this.totalCount(),
		data: this.filteredData()
	}));
}
```

### Optimización para datasets grandes

```typescript
// Gestión de datos en servidor
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

### Gestión de memoria

- Destruye suscripciones en `ngOnDestroy`.
- Evita arrays grandes en templates.
- Usa signals con debounce en filtros pesados.

## 🔧 Solución de problemas

### Problemas comunes

- Verifica imports y módulos standalone.
- Asegura que los signals se actualizan.

### Problemas con imports

```typescript
import { TableComponent } from 'ng-hub-ui-paginable';

@Component({
  standalone: true,
  imports: [TableComponent]
})
```

### Configuración de TypeScript

Asegúrate de tener `strict` habilitado y compatibilidad con Angular 19+.

## ♿ Accesibilidad

- Navegación por teclado en filtros y paginación.
- ARIA labels en acciones y controles.

## 🧪 Guía de testing

### Testing unitario de componentes

```typescript
it('should render table headers', () => {
	const headers = fixture.nativeElement.querySelectorAll('th');
	expect(headers.length).toBeGreaterThan(0);
});
```

### Testing con formularios reactivos

```typescript
const filtersForm = new FormGroup({
	name: new FormControl('test')
});
```

### Servicios mock

```typescript
const mockService = {
	getData: () => of([{ id: 1 }])
};
```

### Testing de rendimiento

- Usa datasets grandes en tests dedicados.
- Valida rendering con virtual scroll.

### Testing de accesibilidad

- Testea foco y navegación.
- Usa herramientas de auditoría (axe, lighthouse).

## 📚 Guía de migración

### De v1.x a v1.52.x

#### Cambios incompatibles

- Actualización de inputs y nombres.
- Cambio en estructura de filtros.

#### Pasos de migración

- Actualiza headers y filtros.
- Revisa imports y templates.

### De Bootstrap 4 legacy a Bootstrap 5

- Sustituye clases de formularios.
- Revisa variables CSS.

### Actualizaciones de configuración

- Ajusta `PaginableTableOptions`.
- Revisa `PaginationState`.

### Problemas comunes de migración

- Problemas de estilos por dependencias.
- Filtros no inicializados.

## ❓ FAQ

### Uso general

**Q: ¿Cómo habilito la paginación?**
A: Activa `paginate` y proporciona `page`, `perPage` y `totalItems`.

### Filtrado

**Q: ¿Cómo creo filtros personalizados?**
A: Usa plantillas `filterTpt` o `mode: 'menu'`.

### Estilos y personalización

**Q: ¿Cómo personalizo los colores de la tabla?**
A: Sobrescribe variables CSS bajo `.hub-table`.

### Rendimiento

**Q: ¿Cómo manejo datasets grandes?**
A: Usa paginación en servidor o virtual scroll.

### Integración

**Q: ¿Puedo usarlo con Angular Signals?**
A: Sí, está construido alrededor de signals.

### Solución de problemas

**Q: ¿Por qué no se ven mis plantillas?**
A: Revisa imports de directivas y claves de cabecera.

## 🔍 Filtros personalizados (filterTpt)

Puedes personalizar la interfaz de filtrado por columna mediante plantillas por `header`.
Estas plantillas se renderizan para filtros `mode: 'row'`. Los filtros de `mode: 'menu'` usan la interfaz integrada.

```html
<ng-template filterTpt header="birthday" let-formControl="formControl">
	<input type="date" class="form-control" [formControl]="formControl" placeholder="Filtrar por fecha" />
</ng-template>
```

```html
<ng-template filterTpt header="age" let-formControl="formControl">
	<div class="d-flex gap-2">
		<input type="number" class="form-control" [formControl]="formControl.controls.start" placeholder="Min." />
		<input type="number" class="form-control" [formControl]="formControl.controls.end" placeholder="Max." />
	</div>
</ng-template>
```

```html
<ng-template filterTpt header="adult" let-formControl="formControl">
	<select class="form-select" [formControl]="formControl">
		<option [ngValue]="null">Todos</option>
		<option [ngValue]="true">Sí</option>
		<option [ngValue]="false">No</option>
	</select>
</ng-template>
```

Esto permite adaptar cualquier filtro visual sin perder reactividad.

## 🧠 Paginación y gestión de datos

El componente `hub-ui-table` admite **tres** modos de datos / paginación:

#### 1. En cliente (automático) — pásale un array

Dale a la tabla el **array completo** y deja que pagine, busque, ordene y filtre **en memoria** — sin lógica en el padre. Es el modo por defecto siempre que `[data]` sea un array, `paginate` sea `true` (su valor por defecto) y **no** indiques `totalItems`; la tabla calcula el total ella misma. Replica el comportamiento en cliente de `<hub-ui-list>`.

```html
<hub-ui-table [data]="allRows()" [headers]="headers" [(page)]="page" [perPage]="20" [searchable]="true"></hub-ui-table>
```

> El buscador global, las cabeceras ordenables y todos los filtros por columna (filtros "row" y el motor de reglas "menu") se resuelven en cliente, y la página se resetea/ajusta automáticamente al cambiar el resultado. Pon `[paginate]="false"` para renderizar el array completo sin paginar.

#### 2. Forma agrupada (`PaginationState<T>`) — en servidor

Pasar un `PaginationState` mantiene la tabla en **modo servidor**: renderiza `data` tal cual y lee `page` / `perPage` / `totalItems` del objeto.

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

#### 3. Forma separada (inputs individuales) — en servidor

```html
<hub-ui-table [data]="pageRows()" [page]="page()" [perPage]="perPage()" [totalItems]="totalItems()"></hub-ui-table>
```

> Indica **`totalItems`** para activar el modo servidor (la tabla renderiza `data` tal cual). Si pasas un array **sin** `totalItems`, la tabla asume el modo cliente (#1) y lo pagina por ti.

## 🧬 Interfaz `PaginationState<T>`

```ts
export interface PaginationState<T = any> {
	page: number | null;
	perPage: number | null;
	totalItems: number | null;
	data: ReadonlyArray<T> | null;
}
```

## 🌍 Internacionalización y traducciones

### Uso con Transloco

```typescript
this.translateService.setTranslation(lang, {
	PAGINABLE: {
		search: 'Search...',
		noResults: 'No results found'
	}
});
```

### Uso con ngx-translate

```typescript
this.translate.get('PAGINABLE').subscribe((translations) => {
	this.hubTranslationSvc.setTranslations(translations);
});
```

### Claves de traducción personalizadas

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

### Actualización manual de traducciones

```typescript
export class AppComponent {
	#hubTranslationSvc = inject(HubTranslationService);

	constructor() {
		this.#hubTranslationSvc.setTranslations({
			search: 'Buscar...',
			noResults: 'No se encontraron resultados',
			loading: 'Cargando...'
		});
	}
}
```

## 📊 Changelog

## [22.0.1] - 2026-06-17

### Corregido

- **List:** las listas de hijos anidadas ya no se pegan al contenido del ítem padre — un margen superior (`--hub-list-children-gap`, por defecto `var(--hub-list-item-padding-y)`) las separa, tanto en el layout por defecto como en cards.

## [22.0.0] - 2026-06-17

### Cambiado

- **List:** el bloque BEM ahora vive en el elemento host. El host `hub-list` lleva la clase de bloque `.hub-list` y el `<ul>` pasa a ser el elemento `.hub-list__items` (modificadores `.hub-list__items--root` / `--cards`). Los fondos se controlan con `--hub-list-bg` (host) y `--hub-list-item-bg` (ítems): host transparente y superficie en los ítems por defecto.

### Añadido

- **List:** variables CSS `--hub-list-gap`, `--hub-list-items-bg` y `--hub-list-item-bg`.

### Corregido

- **List:** las variables de tarjeta (`--hub-list-cards-*`) estaban documentadas y eran personalizables pero nunca se aplicaban — ahora surten efecto.
- **Paginator:** `--hub-paginator-font-size` ahora se aplica realmente.
- **Docs:** referencia de variables CSS corregida (arreglado el prefijo duplicado `--hub-table-table-*` y documentado el bloque de búsqueda de tabla) y con paridad total EN/ES.

### Eliminado

- **Ruptura — List:** renombradas las variables `--hub-list-container-*` a `--hub-list-bg` / `--hub-list-border-radius` / `--hub-list-padding-x/y` / `--hub-list-items-gap`, y reestructurados los selectores `.hub-list` / `.hub-list--root` / `.hub-list--cards` (ver la nota de Cambiado).
- **Table:** eliminadas las variables `--hub-table-breakpoint-*` no funcionales (los breakpoints responsive son fijos y no se pueden sobrescribir vía variables CSS).

## [19.10.2] - 2025-12-23

### Añadido

- Tokens de personalización `--hub-table-cell-vertical-align`, `--hub-icon-color` y `--hub-icon-size`.

### Cambiado

- Las utilidades de overlay se movieron a `ng-hub-ui-utils` y la integración de dropdown ahora depende de ese paquete.
- La alineación vertical de celdas por defecto es `middle` vía variable CSS.

### Corregido

- Las opciones de modos de coincidencia en filtros de menú ahora renderizan correctamente sus etiquetas traducidas.
- Se añadieron traducciones faltantes para los modos `IsNull` y `IsNotNull`.

## 🤝 Contribuir

### Primeros pasos

```bash
# Clona el repositorio
git clone https://github.com/carlos-morcillo/ng-hub-ui-paginable.git
cd ng-hub-ui-paginable

# Instala dependencias
npm install

# Arranca el servidor de desarrollo
npm run start

# Ejecuta tests
npm run test

# Compila la librería
npm run build:paginable
```

### Guía de contribución

1. **Haz un fork** del repositorio
2. **Crea** una rama de feature: `git checkout -b feature/amazing-feature`
3. **Añade tests** para tus cambios
4. **Asegura** que todos los tests pasan: `npm run test`
5. **Commitea** tus cambios: `git commit -m 'Add amazing feature'`
6. **Haz push** a tu rama: `git push origin feature/amazing-feature`
7. **Abre** una pull request

### Flujo de desarrollo

- Sigue el estilo de código y convenciones existentes
- Escribe tests completos para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Asegura que la compilación de TypeScript sea correcta
- Prueba con distintas versiones de Angular cuando sea posible

### Reporte de issues

Al reportar bugs, incluye:

- Versión de Angular
- Navegador y versión
- Pasos para reproducir
- Comportamiento esperado vs real
- Ejemplo mínimo reproducible (StackBlitz preferido)

## ☕ Soporte

¿Te gusta esta librería? Puedes apoyarnos invitándonos a un café ☕:
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/carlosmorcillo)

## 🏆 Colaboradores

Gracias a todas las personas que han ayudado a mejorar esta librería.

- **[Carlos Morcillo Fernández](https://www.carlosmorcillo.com)** - _Creator & Maintainer_ - [@carlos-morcillo](https://github.com/carlos-morcillo)

## 📄 Licencia

Este proyecto está licenciado bajo MIT - ver [LICENSE](LICENSE).

MIT © colaboradores de ng-hub-ui
