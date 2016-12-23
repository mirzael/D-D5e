import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonstersComponent } from './dnd5eapp/monsters.component';
import { EncounterComponent } from './dnd5eapp/encounter/encounter.component';
import { ManualEncounterComponent } from './dnd5eapp/encounter/manualEncounter.component';
import { SpellsComponent} from './dnd5eapp/spell.component';
import { CharacterComponent } from './dnd5eapp/character/character.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'encounter', pathMatch:'full' },
  { path: 'monsters/:ids', component: MonstersComponent },
  { path: 'encounter', component: EncounterComponent },
  { path: 'spells', component: SpellsComponent },
  { path: 'manual', component: ManualEncounterComponent },
  { path: 'character', component: CharacterComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});