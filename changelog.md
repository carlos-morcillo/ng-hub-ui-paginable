# Changelog

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