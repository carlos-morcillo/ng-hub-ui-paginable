PaginableTableComponent
Componente para mostrar una tabla paginable con opciones para ordenar, buscar y seleccionar filas.

Inputs
id
Identificador único de la tabla. Si se proporciona, se utilizará como clase CSS en el componente.

html
Copy code
<app-paginable-table id="mi-tabla"></app-paginable-table>
showSearchInput
Indica si se muestra o no el campo de búsqueda en la tabla. Por defecto es true.

html
Copy code
<app-paginable-table [showSearchInput]="false"></app-paginable-table>
options
Opciones adicionales para configurar la tabla. Actualmente solo admite la configuración del cursor y si se activa o no el efecto hover en las filas.

typescript
Copy code
const opciones: PaginableTableOptions = {
    cursor: 'pointer',
    hoverableRows: true
};
html
Copy code
<app-paginable-table [options]="opciones"></app-paginable-table>
headers
Array de objetos con la información de los encabezados de la tabla. Los objetos deben tener las propiedades title (texto a mostrar en el encabezado) y property (nombre de la propiedad del objeto que se mostrará en la columna). También se puede proporcionar un array de strings, que se convertirán en objetos con la propiedad title y property iguales al valor del string.

typescript
Copy code
const headers: PaginableTableHeader[] = [
    { title: 'ID', property: 'id' },
    { title: 'Nombre', property: 'nombre' },
    { title: 'Email', property: 'email' },
    { title: 'Activo', property: 'activo' }
];
html
Copy code
<app-paginable-table [headers]="headers"></app-paginable-table>
pagination
Array de objetos que se mostrarán en la tabla, o un Observable que emita arrays de objetos. Si se proporciona un Observable, la tabla se actualizará automáticamente cada vez que el Observable emita un nuevo valor. Si se proporciona un array, se paginará automáticamente y se mostrarán sólo los elementos de la página actual.

typescript
Copy code
const elementos: any[] = [
    { id: 1, nombre: 'Juan', email: 'juan@mail.com', activo: true },
    { id: 2, nombre: 'María', email: 'maria@mail.com', activo: false },
    { id: 3, nombre: 'Pedro', email: 'pedro@mail.com', activo: true }
];
html
Copy code
<app-paginable-table [pagination]="elementos"></app-paginable-table>
rows
Array de objetos que se mostrarán en la tabla sin paginación. Si se proporciona un array, se paginará automáticamente y se mostrarán sólo los elementos de la página actual.

typescript
Copy code
const elementos: any[] = [
    { id: 1, nombre: 'Juan', email: 'juan@mail.com', activo: true },
    { id: 2, nombre: 'María', email: 'maria@mail.com', activo: false },
    { id: 3, nombre: 'Pedro', email: 'pedro@mail.com', activo: true }
];
html
Copy code
<app-paginable-table [rows]="elementos"></app-paginable-table>