import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HostBinding } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DndComponent } from './dnd.component';
import { MonstersComponent } from './monsters.component';
import { SpellsComponent } from './spell.component';
import { EncounterComponent } from './encounter.component';
import { ManualEncounterComponent } from './manualEncounter.component';
import { MonsterService } from './monster.service';
import { SpellService } from './spell.service';
import { routing } from '../app.routing';
import { gaussianRandomNumberGenerator } from './gaussianNumberGenerator';


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
	ManualEncounterComponent
  ],
  providers: [
    MonsterService,
	SpellService,
	gaussianRandomNumberGenerator
  ],
  bootstrap: [ 
    DndComponent
  ]
})

export class DndApp { }
