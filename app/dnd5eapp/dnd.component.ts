import { Component } from '@angular/core';

@Component({
	selector: 'dnd-app',
	template: `
		<nav class="navbar navbar-default">
			<div class="navbar-header">
				<a class="navbar-brand" href="encounter"> Encounter Generator </a>
			</div>
			<div id="navbar" class="navbar-collapse collapse" aria-expanded="false" style="height: 1px;">
				<ul class="nav navbar-nav">
					<li> 
						<a href="spells"> Spell list </a>
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