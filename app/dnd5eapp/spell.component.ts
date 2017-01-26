import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SpellService } from './spell.service';
import { Spell } from './spell';
import { PagedList } from '../paging/pagingList';

@Component({
	selector: 'spells',
	moduleId: module.id,
	templateUrl: "spell.component.html",
	styleUrls: ["spell.component.css"]
})

export class SpellsComponent implements OnInit{
	classes: string[] = [];
	levels: string[] = [];
	
	classFilter: string = "all";
	levelFilter: string = "all";
	spellFilter: string = null;
	pagedSpells: PagedList<Spell> = new PagedList<Spell>()
	
	constructor(private spellService: SpellService){}
	
	ngOnInit(): void{
		this.spellService.getSpells().subscribe(
			spells => {
				this.pagedSpells.push(...spells);}
		);
		
		this.spellService.getClasses().subscribe(classes => this.classes = classes, err => console.log(err));
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
	
	setSpellFilter(spellFilter: string){
		this.spellFilter = spellFilter;
		this.filterSpells();
	}
	
	filterSpells(){
		this.pagedSpells.applyFilter(this.filterFunc.bind(this));
	}
	
	private filterFunc(spell: Spell): boolean {
		return (this.classFilter === "all" || spell.classes.indexOf(this.classFilter) > -1)
				&&
			(this.levelFilter === "all" || spell.level.indexOf(this.levelFilter) > -1)
				&&
			(this.spellFilter === null || this.spellFilter === "" || spell.name.toLowerCase().indexOf(this.spellFilter.toLowerCase()) > -1);
	}
}