// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Import all test files explicitly
import './lib/components/table/table.component.spec';
import './lib/components/paginator/paginator.component.spec';
import './lib/directives/paginable-table-cell.directive.spec';
import './lib/pipes/get.pipe.spec';