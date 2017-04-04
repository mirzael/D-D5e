import { Component } from '@angular/core';

@Component({
	selector: 'dnd-app',
	template: `
		<nav class="navbar navbar-default">
			<div class="navbar-header">
				<a class="navbar-brand" routerLink="/encounter" routerLinkActive="active">Random Encounter Generator </a>
				
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="true" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<div id="navbar" class="navbar-collapse collapse" aria-expanded="false" style="height: 1px;">
				<ul class="nav navbar-nav">
					<li> 
						<a routerLink="/spells" routerLinkActive="active"> Spell list </a>
					</li>
					<li> 
						<a routerLink="/manual" routerLinkActive="active"> Monsters </a>
					</li>
					<li>
						<a routerLink="/monsters" routerLinkActive="active"> Encounter </a>
					</li>
				</ul>
			</div>
		</nav>
		<h1>D&D 5e Encounter Generator</h1>
		<router-outlet></router-outlet>
	`
})

export class DndComponent{
	title= "D&D 5e encounter generator"
}