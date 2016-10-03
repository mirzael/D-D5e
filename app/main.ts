import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DndApp } from './dnd5eapp/dnd-app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(DndApp);