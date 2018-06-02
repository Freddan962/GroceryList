import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { ListService } from '../services/listservice';
import { ItemService } from './../services/itemservice';
import { DepartmentService } from './../services/departmentservice';
import { UnitService } from '../services/unitservice';

platformBrowserDynamic().bootstrapModule(AppModule);

// Initialize services
UnitService.initialize();
DepartmentService.initialize();
ItemService.initialize();
ListService.initialize();