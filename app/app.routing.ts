import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonstersComponent } from './dnd5eapp/monsters.component';
import { EncounterComponent } from './dnd5eapp/encounter.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'encounter', pathMatch:'full' },
  { path: 'monsters/:ids', component: MonstersComponent },
  { path: 'encounter', component: EncounterComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);