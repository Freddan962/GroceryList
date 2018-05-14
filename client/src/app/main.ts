import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { ListService } from '../services/listservice';
import { ItemService } from './../services/itemservice';
import { DepartmentService } from './../services/departmentservice';

platformBrowserDynamic().bootstrapModule(AppModule);

DepartmentService.initialize();
ItemService.initialize();
ListService.initialize();