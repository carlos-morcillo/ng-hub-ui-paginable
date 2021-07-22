# Changelog

## [1.22.1] - 2021-06-23
### Fixed
- Los botones de accion en lote no se habilitan hasta que hay items seleccionados

## [1.22.0] - 2021-06-23
### Fixed
- Nueva pipe isObservable

## [1.21.2] - 2021-06-23
### Fixed
- Corrección de errores relacionados con RxJS

## [1.21.1] - 2021-06-23
### Fixed
- Detección de tipo de la última columna

## [1.21.0] - 2021-06-22
### Added
- Ahora es posible una función para mostrar/ocultar un botón dentro de una celda

## [1.20.0] - 2021-06-22
### Added
- Plantillas para filtros personalizados

## [1.19.5] - 2021-06-22
### Fixed
- Corrección de nombre de variable ordenación

## [1.19.4] - 2021-06-22
### Fixed
- Corrección de eventos de formulario

## [1.19.3] - 2021-06-21
### Fixed
- Corrección de maquetación

## [1.19.2] - 2021-06-18
### Fixed
- Corrección de loading de filtros

## [1.19.1] - 2021-06-18
### Fixed
- Exportación de componentes

## [1.19.0] - 2021-06-18
### Added
- Nuevos campos de filtrado

## [1.18.5] - 2021-06-16
### Fixed
- Corrección de maquetación y formato de evento de filtros avanzados

## [1.18.4] - 2021-06-15
### Fixed
- Corrección de observables

## [1.18.3] - 2021-06-15
### Fixed
- Corrección de maquetación

## [1.18.2] - 2021-06-15
### Fixed
- Exportación de componentes

## [1.18.1] - 2021-06-15
### Fixed
- Exportación de directivas

## [1.18.0] - 2021-06-15
### Added
- Filtros avanzados por columnas
- Loading cuando la paginación es un observable
- Captura de error y mensaje cuando la paginación es un observable
- Loading personalizable
- Mensaje de error personalizable

## [1.17.0] - 2021-06-11
### Added
- Columnas con manejador para ajustar el tamaño

## [1.16.14] - 2021-06-07
### Fixed
- Eliminación de uso de la función isString.

## [1.16.13] - 2021-05-19
### Fixed
- Marcación de elementos seleccionables cuando los elementos son objectos.

## [1.16.12] - 2021-05-19
### Fixed
- Marcación de elementos seleccionables cuando los elementos son objectos.
- Marcación de los elementos cuando la fila es también clicable.

## [1.16.11] - 2021-05-19
### Added
- Posibilidad de hacer la tabla hoverable.
### Fixed
- Marcación de elementos seleccionables cuando el elemento no es selectable pero si tiene batchActions.

## [1.16.10] - 2021-05-18
### Fixed
- Al cambiar el número de elementos por página se autoestablece el valor de la página como 1.

## [1.16.8] - 2021-05-18
### Fixed
- Corregida la selección de elementos al cambiar de página.
- Corregida la visualización del componente principal.

## [1.16.7] - 2021-03-24
### Fixed
- Corregida la alineación de las columnas.
## [1.16.5] - 2021-05-18
### Fixed
- Al cambiar el número de elementos por página la paginación va a la página 1.

## [1.16.3] - 2021-02-23
### Fixed
- Corregida la ordenación de los elementos.

## [1.16.2] - 2021-02-03
### Changed
- Angular 11.

## [1.16.1] - 2021-02-03
### Fixed
- Tslint detecta correctamente el componente.

## [1.16.0] - 2021-01-20
### Added
- Es posible mostrar u ocultar botones de acciones en función del valor hidden del propio botón.

## [1.15.1] - 2021-01-19
### Fixed
- Se comparan correctamente los objetos seleccionados.

## [1.15.0] - 2020-12-29
### Added
- Posibilidad de añadir acciones en lote

## [1.14.2] - 2020-12-22
### Fixed
- Exportación del componente dropdown

## [1.14.0] - 2020-12-22
### Added
- Posibilidad de añadir dropdowns como acciones
### Changed
- Las acciones ahora se pueden meter en cualquier columna

## [1.13.0] - 2020-12-21
### Added
- Implementación de control value accessor
### Fixed
- Selección de items al cambiar de página

## [1.12.0] - 2020-12-18
### Added
- Atributo para hacer la tabla responsive según los puntos de ruptura xs, sm, md, lg, xl
- Incorporación de la propiedad sticky en las cabeceras de las columnas haciendo estableciendo la disposición de ellas sticky al inicio o al final. Los posibles valores son start y end.

## [1.11.1] - 2020-11-30
### Removed
- Eliminación del establecimineto del idioma por defecto

## [1.11.0] - 2020-10-23
### Added
- Incorporación de @ngx-translate y los idiomas español e inglés

## [1.10.0] - 2020-09-24
### Added
- Posibilidad de crear tablas sin paginación estableciendo el parámetro paginate a false.
### Changed
- El evento triggerTheParamChanges solo emite propiedades distintas de null.
### Fixed
- Botón de expanding rows compatible con fontawesome 5.
- Corrección del paginador en paginación en cliente.

## [1.9.0] - 2020-08-07
### Changed
- Actualización a Angular 10
### Fixed
- Control del marcado de elementos cuando estos no existen.
### Removed
- Dependencia ngx-avatar

## [1.8.1] - 2020-08-06
### Fixed
- Visualización de la información sobre la paginación.
- Visualización de los headers.

## [1.8.0] - 2020-08-05
### Added
- Posibilidad de hacer los elementos de las tablas seleccionables.
- Posibilidad de cambiar el número de elementos por página.
### Changed
- La información de la paginación aparece por defectos.

## [1.7.3] - 2020-07-27
### Fixed
- Corrección de la exportación de las pipes.

## [1.7.2] - 2020-07-27
### Fixed
- Referencias a la exportación de todos los módulos, componentes, directivas, pipes, etc.

## [1.7.0] - 2020-07-27
### Added
- Posibilidad de crear filas expansivas que muestran su contenido a través de un toggle.
### Changed
- Reorganización de ficheros.

## [1.6.0] - 2020-05-14
### Added
- Ahora se dispone de la propiedad y el item completo en las celdas personalizadas.

## [1.5.0] - 2020-04-13
### WIP
- Página de documentación.
### Added
- Posibilidad de mapear los elementos de la paginación.

## [1.4.2] - 2020-01-07
### WIP
- Página de documentación.
### Changed
- Ahora el buscador se muestra aunque no haya resultados.
### Fixed
- Corregido el funcionamiento del handler de las acciones para que no se ejecute el evento de la fila.

## [1.4.1] - 2019-12-17
### Fixed
- Corregido el funcionamiento del handler de las acciones.
### Removed
- Eliminadas las pipes sin uso.

### Added
- Posibilidad de personalizar la plantilla de una columna especificada por parámetro.
### Fixed
- Renombrado la propiedad de la interfaz NbTableSorterRowAction de handle a handler.

## [1.4.0] - 2019-12-15

### Added
- Posibilidad de personalizar la plantilla de una columna especificada por parámetro.
### Fixed
- Renombrado la propiedad de la interfaz NbTableSorterRowAction de handle a handler.

## [1.3.0] - 2019-12-12

### Added
- Posibilidad de añadir una columna de acciones personalizadas sobre cada fila.

## [1.2.0] - 2019-10-07

### Added
- Posibilidad de personalizar las filas con plantillas.

### Changed
- Sustituidas las llamadas a funciones de Lodash con funciones personalizadas.

### Fixed
- Errores cuando se pasaba undefined o null como parámetros al componente.

## [1.1.0] - 2019-10-02

### Added
- Posibilidad de controlar la paginación pasando un objeto de paginación de Laravel.
- Ordenación de resultados y eventos de ordenación.