import { Component, OnInit } from '@angular/core';
import { SpellService } from './spell.service';

@Component({
	selector: 'spells',
	template: `
		<h3> TODO </h3>
	`
})

export class SpellsComponent implements OnInit{
	constructor(private spellService: SpellService){}
	ngOnInit(): void{
		this.spellService.getSpells().subscribe(
			spells => {console.log(spells);}
		);
	}
}