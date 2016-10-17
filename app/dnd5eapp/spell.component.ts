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
	classes: string[] = [];
	levels: string[] = [];
	
	classFilter: string = "all";
	levelFilter: string = "all";
	filteredSpells: Spell[] = [];
	
	constructor(private spellService: SpellService){}
	
	ngOnInit(): void{
		this.spellService.getSpells().subscribe(
			spells => {this.spells = spells; this.filteredSpells = spells;}
		);
		
		this.spellService.getClasses().then((classes) => this.classes = classes);
		this.spellService.getLevels().then((levels) => this.levels = levels);
	}
	
	setClassFilter(classFilter: string){
		this.classFilter = classFilter;
		this.filterSpells();
	}
	
	setLevelFilter(levelFilter: string){
		this.levelFilter = levelFilter;
		this.filterSpells();
	}
	
	filterSpells(){
		this.filteredSpells = this.spells.filter(spell =>  
			(this.classFilter === "all" || spell.classes.indexOf(this.classFilter) > -1)
				&&
			(this.levelFilter === "all" || spell.level.indexOf(this.levelFilter) > -1));
	}
	
	
}