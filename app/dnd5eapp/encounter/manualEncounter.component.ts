import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';
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
	encounterMonsters: Monster[] =[];
	pagedMonsters: PagedList<Monster> = new PagedList<Monster>();
	xp: number;
	constructor(private monsterService: MonsterService, private router: Router){}	
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
		this.encounterMonsters.push(monster);
		this.recalcXP();
	}
	
	private removeEncounterMonster(index: number){
		this.encounterMonsters.splice(index, 1);
		this.recalcXP();
	}
	
	private recalcXP(){
		let unModXP = 0;
		for(var monster of this.encounterMonsters) { unModXP += crMap[monster.CR];}
		this.calculateXP(this.encounterMonsters.length, unModXP);
	}

	private calculateXP(numMonsters: number, unModifiedXP: number, newXP?: number): number{
		let calcMonsters = numMonsters;
		if(newXP !== undefined) calcMonsters++;
		else newXP = 0;
		var multiplier = encounterMultipliers[calcMonsters]; 
		if(isNaN(multiplier) && calcMonsters > 0){
			multiplier = encounterMultipliers.maxValue;
		}else if(calcMonsters = 0){
			return 0;
		}
		
		this.xp = (unModifiedXP + newXP) * multiplier;
		return this.xp;
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
	
	private navigateToDetailsPage(){
		let monsterIds: number[] = [];
		for(var monster of this.encounterMonsters){ monsterIds.push(monster.ID); }
		console.log(this.encounterMonsters);
		let link = ['/monsters', monsterIds.toString()];
		this.router.navigate(link);
	}
}