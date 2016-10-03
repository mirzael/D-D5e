import { Component } from '@angular/core';

@Component({
	selector: 'dnd-app',
	template: `
		<h1>D&D 5e Encounter Generator</h1>
		<router-outlet></router-outlet>
	`
})

export class DndComponent{
	title= "D&D 5e encounter generator"
}