import { NgModule, CUSTOM_ELEMENTS_SCHEMA,  HostBinding }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DndComponent } from './dnd.component';
import { MonstersComponent } from './monster/monsters.component';
import { SpellsComponent } from './spell.component';
import { EncounterComponent } from './encounter/encounter.component';
import { ManualEncounterComponent } from './encounter/manualEncounter.component';
import { CharacterComponent } from './character/character.component';
import { MonsterService } from './monster/monster.service';
import { SpellService } from './spell.service';
import { EncounterGeneratorService } from './encounter/encounterGenerator.service';
import { EncounterMonsterService } from './encounter/encounterMonsters.service';
import { PlayerService } from './players/player.service';
import { routing } from '../app.routing';
import { GaussianRandomNumberGenerator } from './encounter/gaussianNumberGenerator';
import { PagingComponent } from '../paging/paging.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	routing
  ],
  declarations: [
    DndComponent,
    MonstersComponent,
    EncounterComponent,
	SpellsComponent, 
	ManualEncounterComponent,
	PagingComponent,
	CharacterComponent
  ],
  providers: [
    MonsterService,
	SpellService,
	GaussianRandomNumberGenerator,
	EncounterGeneratorService,
	PlayerService,
	EncounterMonsterService,
	[{provide: APP_BASE_HREF, useValue: '/app'}]
  ],
  bootstrap: [ 
    DndComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DndApp { }
