import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HostBinding } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DndComponent } from './dnd.component';
import { MonstersComponent } from './monsters.component';
import { EncounterComponent } from './encounter.component';
import { MonsterService } from './monster.service';
import { routing } from '../app.routing';


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
    EncounterComponent
  ],
  providers: [
    MonsterService
  ],
  bootstrap: [ 
    DndComponent
  ]
})

export class DndApp { }
