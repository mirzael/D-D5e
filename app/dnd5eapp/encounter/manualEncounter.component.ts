import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Monster } from '../monster/monster';
import { MonsterService } from '../monster/monster.service';
import { EncounterMonsterService } from './encounterMonsters.service';
import { crMap, encounterMultipliers} from './encounterConstants';
import { PagedList } from '../../paging/pagingList';

@Component ({
	selector: 'manual-encounter',
	moduleId: module.id,
	templateUrl: "manualEncounter.component.html",
	styleUrls: ["manualEncounter.component.css"]
})

export class ManualEncounterComponent implements OnInit {
	types: string[] = [];
	alignments: string[] = [];
	crs: number[] = [];
	typeFilters: string[] = [];
	crFilters: number[] = [];
	alignmentFilters: string[] = [];
	nameFilter: string = "";
	pagedMonsters: PagedList<Monster> = new PagedList<Monster>();
	xp: number;
	constructor(private monsterService: MonsterService, private router: Router, private encounterMonsters: EncounterMonsterService ){}	
	ngOnInit(): void{
		this.monsterService.getMonsters().subscribe(
			monsters => {this.pagedMonsters.push(...monsters);},
			error => console.error(error)
		);
		
		this.monsterService.getTypes().subscribe(types => {this.types = types; this.types.sort();});
		this.monsterService.getAlignments().then(alignments => {this.alignments = alignments;});
		this.monsterService.getCRs().then(crs => {this.crs = crs;});
	}
	
	private setNameFilter(name: string){
		this.nameFilter = name;
		this.filterMonsters();
	}
	
	private addTypeFilter(filter: string){
		if(this.typeFilters.indexOf(filter) === -1){
			this.typeFilters.push(filter);
			this.filterMonsters();
		}
	}
	
	private removeTypeFilter(index){
		this.typeFilters.splice(index,1);
		this.filterMonsters();
	}
	
	private addCRFilter(filter: number){
		if(this.crFilters.indexOf(filter) === -1){
			this.crFilters.push(filter);
			this.filterMonsters()
		}
	}
	
	private removeCRFilter(index){
		this.crFilters.splice(index,1);
		this.filterMonsters();
	}
	
	private addAlignmentFilter(filter){
		if(this.alignmentFilters.indexOf(filter) === -1){
			this.alignmentFilters.push(filter);
			this.filterMonsters();
		}
	}
	
	private removeAlignmentFilter(index){
		this.alignmentFilters.splice(index,1);
		this.filterMonsters();
	}
	
	private addEncounterMonster(monster: Monster){
		this.encounterMonsters.addMonster(monster);
		this.recalcXP();
	}
	
	private removeEncounterMonster(index: number){
		this.encounterMonsters.removeMonster(index);
		this.recalcXP();
	}
	
	private recalcXP(){
		this.xp = this.encounterMonsters.calculateXP();
	}

	
	private getXP(cr: number): number {
		return crMap[cr];
	}
	
	private filterMonsters(){
		this.pagedMonsters.applyFilter(this.filterFunc.bind(this));
	}
	
	private filterFunc(monster: Monster): boolean{
		return (this.crFilters.length === 0 || this.crFilters.some(filter => monster.CR === filter)) &&
				(this.typeFilters.length === 0  || this.typeFilters.some(filter => monster.Type.indexOf(filter) > -1)) && 
				(this.nameFilter === null || this.nameFilter === "" || monster.Name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1) &&
				(this.alignmentFilters.length === 0 ||
					monster.Align === "any alignment" || 
					this.alignmentFilters.some(align => monster.Align.toLowerCase().indexOf(align.toLowerCase()) > -1) ||
					(this.alignmentFilters.some(align => align.toLowerCase().indexOf("evil") > -1) && monster.Align.toLowerCase() === "any evil alignment") ||
					(this.alignmentFilters.some(align => align.toLowerCase().indexOf("chaotic") > -1) && monster.Align.toLowerCase() === "any chaotic alignment") ||
					(this.alignmentFilters.some(align => align.toLowerCase().indexOf("good") === -1) && monster.Align.toLowerCase() === "any non-good alignment") ||
					(this.alignmentFilters.some(align => align.toLowerCase().indexOf("lawful") === -1) && monster.Align.toLowerCase() === "any non-lawful alignment"));
	}
}