import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonstersComponent } from './dnd5eapp/monsters.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'monsters', pathMatch:'full' },
  { path: 'monsters', component: MonstersComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);