import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SpellService } from './spell.service';
import { Spell } from './spell';

@Component({
	selector: 'spells',
	moduleId: module.id,
	templateUrl: "spell.component.html",
	styleUrls: ["monsters.component.css"]
})

export class SpellsComponent implements OnInit{
	spells: Spell[] = [];
	constructor(private spellService: SpellService){}
	ngOnInit(): void{
		this.spellService.getSpells().subscribe(
			spells => {this.spells = spells;}
		);
	}
}