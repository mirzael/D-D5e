import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Monster } from '../monster';
import { MonsterService } from '../monster.service';
import { EncounterService } from './encounter.service';
import { Difficulty } from './encounterConstants';

@Component({
	selector: 'encounter',
	moduleId: module.id,
	templateUrl: "encounter.component.html",
	styleUrls: ["encounter.component.css"]
})

export class EncounterComponent implements OnInit{
	public difficultyEnum = Difficulty;
	players: number[] = [];
	monsters: Monster[] = [];
	difficultyLevel: Difficulty = Difficulty.Easy;
	typeFilters: string[]  = [];
	alignmentFilters: string[] = [];
	types: string[];
	alignments: string[];
	encounterMonsters: Monster[] = [];
	xp: number;
	constructor(private monsterService: MonsterService, private router: Router, private encounterService: EncounterService){}

	private generateEncounter(){	
		if(this.players.length <= 0){
			console.error("Cannot generate encounter with no players. Please add at least one player.");
			return;
		}
		
		let maxCR = Math.min(...this.players);
		let crMult: number = 1;
		if(this.difficultyLevel === Difficulty.Deadly) crMult = 1.5;
		
		var filteredMonsters = this.monsters.filter(monster => 
				monster.CR <= maxCR * crMult && 
				(this.typeFilters.length === 0  || this.typeFilters.some(filter => monster.Type.indexOf(filter) > -1)) && 
				(this.alignmentFilters.length === 0 ||
					monster.Align === "any alignment" || 
					this.alignmentFilters.some(align => monster.Align.indexOf(align) > -1) ||
					(this.alignmentFilters.some(align => align.indexOf("evil") > -1) && monster.Align === "any evil alignment") ||
					(this.alignmentFilters.some(align => align.indexOf("chaotic") > -1) && monster.Align === "any chaotic alignment") ||
					(this.alignmentFilters.some(align => align.indexOf("good") === -1) && monster.Align === "any non-good alignment") ||
					(this.alignmentFilters.some(align => align.indexOf("lawful") === -1) && monster.Align === "any non-lawful alignment")));
		
		if(filteredMonsters.length === 0){
			console.error("There are no monsters of types: " + this.typeFilters + " that match the filter and players that you have selected. " );
			return;
		}
		
		this.encounterMonsters = this.encounterService.generateEncounter(filteredMonsters);
		this.recalcXP();
	} 
	
	private navigateToDetailsPage(){
		let monsterIds: number[] = [];
		for(var monster of this.encounterMonsters){ monsterIds.push(monster.ID); }
		console.log(this.encounterMonsters);
		let link = ['/monsters', monsterIds.toString()];
		this.router.navigate(link);
	}

	private addPlayer(number){
		this.players.push(number);
		this.encounterService.setPlayers(this.players);
	}

	private removePlayer(index){
		this.players.splice(index,1);
		this.encounterService.setPlayers(this.players);
	}

	private setDifficulty(diff){
		this.difficultyLevel = diff;
		this.encounterService.setDifficulty(diff);
	}
	
	private addFilter(filter: string){
		if(this.typeFilters.indexOf(filter) === -1){
			this.typeFilters.push(filter);
		}
	}
	
	private removeFilter(index){
		this.typeFilters.splice(index,1);
	}
	
	private addAlignmentFilter(filter){
		if(this.alignmentFilters.indexOf(filter) === -1){
			this.alignmentFilters.push(filter);
		}
	}
	
	private removeAlignmentFilter(index){
		this.alignmentFilters.splice(index,1);
	}
	
	private removeEncounterMonster(index){
		this.encounterMonsters.splice(index,1);
		this.recalcXP();
	}
	
	private recalcXP(){
		this.xp = this.encounterService.calculateXP(this.encounterMonsters);
	}

	
	ngOnInit(): void{
		this.monsterService.getMonsters().subscribe(
			monsters => this.monsters = monsters,
			error => console.error(error)
		);
		
		this.monsterService.getTypes().then(types => {this.types = types; this.types.sort();});
		this.monsterService.getAlignments().then(alignments => {this.alignments = alignments;});
	}
}