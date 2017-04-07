import { Component } from '@angular/core';

@Component({
	selector: 'dnd-app',
	template: `
		<div class="ui inverted vertical masthead aligned segment" style="height: 100%;">
			<div class="ui inverted menu">
				<a class="header item" routerLink="/encounter" routerLinkActive="active"> Random Encounter Generator </a>
				<a class="item" routerLink="/spells" routerLinkActive="active"> Spell List </a>
				<a class="item" routerLink="/manual" routerLinkActive="active"> Monsters </a>
				<a class="item" routerLink="/monsters" routerLinkActive="active"> Encounter </a>
			</div>
		
			<div class="ui centered header">
				<h1>D&D 5e Encounter Generator</h1>
			</div>
			<div class="ui container">
				<router-outlet></router-outlet>
			</div>
		</div>
	`
})

export class DndComponent{
	title= "D&D 5e encounter generator"
}