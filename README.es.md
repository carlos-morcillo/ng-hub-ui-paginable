# ng-hub-ui-paginable

## ✨ Inspiración

Esta biblioteca surge de la necesidad de ofrecer componentes de visualización de datos altamente configurables, accesibles y modernos para aplicaciones Angular, permitiendo listas, tablas y paginación integradas con soporte completo para señales, formularios reactivos y personalización total del renderizado.

## 🧩 Familia de bibliotecas `ng-hub-ui`

`ng-hub-ui-paginable` forma parte del ecosistema `ng-hub-ui`, una familia de componentes Angular modernos orientados a la experiencia de usuario, productividad y compatibilidad con Angular Signals. Cada paquete resuelve un problema específico de interfaz sin sobrecargar la lógica de negocio.

## 📦 Descripción

`ng-hub-ui-paginable` proporciona una tabla (`<hub-ui-table>`), una lista (`<hub-ui-list>`) y un paginador (`<hub-ui-paginator>`) preparados para trabajar en conjunto o por separado, facilitando la gestión de datos paginados, búsquedas, filtros y selección de ítems.

En esta primera versión del README nos centraremos en el componente `Tabla`.

## 🎯 Funcionalidades principales

- Soporte completo para Angular Signals (`model()`, `input()`, `computed()`, `effect()`).
- Compatibilidad con entradas separadas o agrupadas mediante `PaginationState`.
- Búsqueda local y filtros por columna (texto, rango, booleano...).
- Ordenación de columnas ascendente/descendente.
- Selección individual o múltiple de filas.
- Filas expandibles.
- Paginación local o remota.
- Soporte para templates personalizados (cabeceras, celdas, filtros, vacíos, errores...).
- Diseño responsive configurable por `breakpoint`.

## 🚀 Instalación

```bash
npm install ng-hub-ui-paginable
```

## 🎨 Estilos

Asegúrate de incluir los estilos base globales (SCSS):

```scss
@use 'ng-hub-ui-paginable/src/lib/styles/base.scss';
```

Si usas Angular CLI, puedes añadirlo en `angular.json` como un `stylePreprocessorIncludePaths`.

## ⚙️ Uso básico

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

| Nombre           | Tipo                            | Descripción                                                                 |
|------------------|----------------------------------|-----------------------------------------------------------------------------|
| `headers`        | `PaginableTableHeader[]`         | Definición de columnas con soporte para títulos, ordenación y filtros.     |
| `data` / `rows`  | `T[]` o `PaginationState<T>`     | Puede ser un array plano o un objeto con paginación.                       |
| `page`           | `number`                         | Página actual (model signal).                                              |
| `perPage`        | `number`                         | Número de elementos por página.                                            |
| `totalItems`     | `number`                         | Total de elementos disponibles.                                            |
| `searchable`     | `boolean`                        | Si se muestra el input de búsqueda.                                        |
| `selectable`     | `boolean`                        | Si las filas se pueden seleccionar.                                        |
| `multiple`       | `boolean`                        | Si se permite selección múltiple.                                          |
| `ordination`     | `PaginableTableOrdination`       | Propiedad y dirección de ordenación.                                       |
| `filters`        | `Record<string, any>`            | Filtros avanzados activos.                                                 |
| `searchTerm`     | `string`                         | Término de búsqueda.                                                       |
| `paginationPosition` | `'top' | 'bottom' | 'both'` | Dónde se ubica el paginador.                                               |
| `loading`        | `boolean`                        | Estado de carga.                                                           |
| `paginate`       | `boolean`                        | Si la tabla debe paginar o no.                                             |
| `bindValue`      | `string`                         | Propiedad usada para identificar unívocamente los ítems seleccionados.     |
| `options`        | `PaginableTableOptions`          | Configuración visual (scroll, variantes, hover...).                        |

## 📤 Outputs

El componente implementa `ControlValueAccessor`, por lo que puedes hacer `[(ngModel)]` o usarlo con `formControl`.

Además, puedes capturar clics en filas:

```ts
@clickFn="onItemClick($event)"
```

Donde `$event` incluye: `item`, `depth`, `index`, `selected`, `collapsed`.



El componente `hub-ui-table` permite sobrescribir prácticamente cualquier sección visual mediante plantillas Angular (`<ng-template>`). Esto permite adaptar la visualización de cada celda, cabecera o contenido especial a necesidades específicas.

### 🔠 headerTpt (cabecera de columna)

Permite reemplazar el contenido de una cabecera específica.

```html
<ng-template headerTpt header="name">
  <span class="text-primary fw-bold">Nombre completo</span>
</ng-template>
```

```html
<ng-template headerTpt header="birthday">
  <i class="fa-solid fa-cake-candles me-2"></i> Fecha de nacimiento
</ng-template>
```

### 📄 cellTpt (celda de columna)

Sobrescribe la visualización de una celda concreta.

```html
<ng-template cellTpt header="name" let-data="data">
  {{ data.name.toUpperCase() }}
</ng-template>
```

```html
<ng-template cellTpt header="age" let-data="data">
  <span [class.text-success]="data.age >= 18"> {{ data.age }} años </span>
</ng-template>
```

```html
<ng-template cellTpt header="adult" let-data="data">
  <hub-ui-icon
    [config]="{ type: 'material', value: data.adult ? 'check' : 'close' }"
  ></hub-ui-icon>
</ng-template>
```

### 🚫 notFoundTpt (estado vacío)

Muestra contenido personalizado cuando no hay datos que mostrar.

```html
<ng-template notFoundTpt>
  <div class="alert alert-info text-center">
    <i class="fa-solid fa-circle-info me-2"></i>
    No se han encontrado resultados para tu búsqueda.
  </div>
</ng-template>
```

### ⏳ loadingTpt (estado cargando)

Renderiza contenido mientras `loading` es `true`.

```html
<ng-template loadingTpt>
  <div class="text-center p-4">
    <div class="spinner-border text-primary" role="status"></div>
    <p>Cargando datos, por favor espera...</p>
  </div>
</ng-template>
```

### ❌ errorTpt (estado de error)

Se muestra si hay una plantilla de error configurada y se activa manualmente desde el componente.

```html
<ng-template errorTpt>
  <div class="alert alert-danger text-center">
    <i class="fa-solid fa-triangle-exclamation me-2"></i>
    Ha ocurrido un error inesperado. Intenta recargar la tabla.
  </div>
</ng-template>
```

### 📂 rowTpt (fila personalizada)

Permite redefinir por completo la estructura de una fila. Útil cuando la tabla no se usa como `<table>` sino como `<div>` o si necesitas visualización tipo "tarjeta".

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

## 🔍 Filtros personalizados (filterTpt)

Puedes personalizar la interfaz de filtrado por columna mediante plantillas individuales por `header`.

```html
<ng-template filterTpt header="birthday" let-formControl="formControl">
  <input
    type="date"
    class="form-control"
    [formControl]="formControl"
    placeholder="Filtra por fecha"
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
      placeholder="Mín."
    />
    <input
      type="number"
      class="form-control"
      [formControl]="formControl.controls.end"
      placeholder="Máx."
    />
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

Esto te permite adaptar cualquier tipo de filtro visual (date-range, boolean, dropdown, etc.) sin perder reactividad.


## 🧠 Gestión de datos y paginación

El componente `hub-ui-table` permite recibir los datos de dos formas distintas:

#### 1. Forma agrupada (`PaginationState<T>`)

Ideal si gestionas la paginación desde fuera del componente. El input `data` puede aceptar directamente un objeto con la estructura completa de paginación:

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

> Esta forma es útil cuando gestionas `PaginationState` en un solo lugar (por ejemplo, desde un servicio, `computed()` o store).

#### 2. Forma desglosada (inputs individuales)

También puedes pasar cada valor por separado:

```html
<hub-ui-table
  [data]="data()"
  [page]="page()"
  [perPage]="perPage()"
  [totalItems]="totalItems()"
></hub-ui-table>
```

> Es importante que, si eliges esta forma, **todos los inputs estén presentes**. Si faltan `page`, `perPage` o `totalItems`, el componente mostrará un error por consola.

Ambas formas son compatibles con Signals y pueden integrarse fácilmente con `model()` y `computed()`.

## 🧬 Interfaz `PaginationState<T>`

```ts
export interface PaginationState<T = any> {
  page: number | null;
  perPage: number | null;
  totalItems: number | null;
  data: ReadonlyArray<T> | null;
}
```

## 🤝 Contribuir

¡Toda aportación es bienvenida! Puedes abrir issues, enviar pull requests o proponer mejoras de funcionalidad.

```bash
git clone https://github.com/carlos-morcillo/ng-hub-ui-paginable.git
```

## ☕ Soporte

¿Te gusta esta librería? Puedes apoyarnos invitándonos a un café ☕:
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/carlosmorcillo)

## 📄 Licencia

MIT © ng-hub-ui contributors
