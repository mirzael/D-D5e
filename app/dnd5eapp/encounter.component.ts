import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Monster } from './monster';
import { MonsterService } from './monster.service';
import { crMap, deadlyMap, easyMap, mediumMap, hardMap, encounterMultipliers, intDictionary, Difficulty } from './encounterConstants';
import { gaussianRandomNumberGenerator } from './gaussianNumberGenerator';

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
	constructor(private monsterService: MonsterService, private router: Router, private randGenerator: gaussianRandomNumberGenerator){}

	private generateEncounter(){
		this.encounterMonsters = [];
		if(this.players.length <= 0){
			console.error("Cannot generate encounter with no players. Please add at least one player.");
		}else{
			var maxCr = Math.min(...this.players);
			let xpThreshold: number = 0;

			let map: intDictionary;

			switch (this.difficultyLevel) {
				case Difficulty.Easy:
					map = easyMap;
					break;
				case Difficulty.Medium:
					map = mediumMap;
					break;
				case Difficulty.Hard:
					map = hardMap;
					break;
				case Difficulty.Deadly:
					map = deadlyMap;
					break;
				default:
					console.log(this.difficultyLevel);
					console.error("Undefined Difficulty encountered. Not generating encounter.");
					return;
			}

			for (var level of this.players) { xpThreshold += map[level]; }
			
			let crMult: number = 1;
			if(this.difficultyLevel === Difficulty.Deadly) crMult = 1.5;
			
			var filteredMonsters = this.monsters.filter(monster => 
				monster.CR <= maxCr * crMult && 
				(this.typeFilters.length === 0  || this.typeFilters.some(filter => monster.Type.indexOf(filter) > -1)) && 
				(this.alignmentFilters.length === 0 ||
					monster.Align === "any alignment" || 
					this.alignmentFilters.some(align => monster.Align.indexOf(align) > -1) ||
					(this.alignmentFilters.some(align => align.indexOf("evil") > -1) && monster.Align === "any evil alignment") ||
					(this.alignmentFilters.some(align => align.indexOf("chaotic") > -1) && monster.Align === "any chaotic alignment") ||
					(this.alignmentFilters.some(align => align.indexOf("good") === -1) && monster.Align === "any non-good alignment") ||
					(this.alignmentFilters.some(align => align.indexOf("lawful") === -1) && monster.Align === "any non-lawful alignment")));
			console.log(filteredMonsters);
			if(filteredMonsters.length === 0){
				console.error("There are no monsters of types: " + this.typeFilters + " that match the filter and players that you have selected. " );
				return;
			}
			
			let currentXP: number = 0;
			let unmodifiedXP: number = 0;
			console.log("Threshold XP: " + xpThreshold);

			let retries: number = 0;
			let totalRetries: number = 0;
			let resets: number = 0;
			let MAX_RESETS: number = 8;
			while(!this.withinThreshold(currentXP, xpThreshold, 0.10)){
				console.log("Current XP: " + currentXP);
				
				let monsterToExamine = this.getRandomMonster(filteredMonsters, maxCr * crMult);
				console.log(monsterToExamine);
				console.log(monsterToExamine.Name);
				let monsterXP: number = crMap[monsterToExamine.CR];

				let calculatedXP: number = 0;

				calculatedXP = this.calculateXP(this.encounterMonsters.length+1, unmodifiedXP,monsterXP);
				console.log("Calculated XP: " + calculatedXP);
				
				if(calculatedXP < xpThreshold){
					this.encounterMonsters.push(monsterToExamine);
					currentXP = calculatedXP;
					unmodifiedXP += monsterXP;
					console.log("New XP: " + currentXP);
				}else{
					retries++;
					totalRetries++;
					if(retries > 5 && totalRetries % 5 < 4 && this.encounterMonsters.length > 0){
						let monster: Monster = this.encounterMonsters.pop();
						unmodifiedXP -= crMap[monster.CR];
						currentXP =  this.calculateXP(this.encounterMonsters.length, unmodifiedXP);
						console.log("unmod xp: " + unmodifiedXP);
						console.log("Retrying. New XP: " + currentXP);
						retries = 0;
					}else if(retries > 5 && (totalRetries % 5 == 4 || this.encounterMonsters.length === 0)){
						this.encounterMonsters = [];
						unmodifiedXP = 0;
						currentXP = 0;
						resets++;
						retries = 0;
					}
					
					if(resets >= MAX_RESETS){
						this.encounterMonsters = [];
						unmodifiedXP = 0;
						currentXP = 0;
						console.error("Could not generate encounter with given parameters");
						return;
					}
				}
			}
		}
	} 
	
	private navigateToDetailsPage(){
		let monsterIds: number[] = [];
		for(var monster of this.encounterMonsters){ monsterIds.push(monster.ID); }
		console.log(this.encounterMonsters);
		let link = ['/monsters', monsterIds.toString()];
		this.router.navigate(link);
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
	
	private getRandomMonster(monsterList: Monster[], maxCR: number): Monster{
		let cr = this.getNearestCR(this.randGenerator.generateGaussianNoise(maxCR / 2, maxCR / 4));
		cr = Math.min(cr, maxCR);
		console.log("CR: " + cr);
		let filteredMonsters = monsterList.filter(monster => monster.CR === cr);
		if(filteredMonsters.length === 0) return this.getRandomMonster(monsterList, maxCR);
		
		let randIndex: number = Math.floor(Math.random() * filteredMonsters.length);
		return filteredMonsters[randIndex];
	}

	private withinThreshold(currentNumber: number, maxNumber: number, thresholdPercentage: number): boolean{
		if(currentNumber == 0) return false;
		return Math.abs(Math.max(maxNumber, currentNumber) - Math.min(maxNumber, currentNumber))/Math.min(maxNumber, currentNumber) < thresholdPercentage;
	}

	private addPlayer(number){
		this.players.push(number);
	}

	private removePlayer(index){
		this.players.splice(index,1);
	}

	private setDifficulty(diff){
		this.difficultyLevel = diff;
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
	
	private getNearestCR(cr: number): number{
		if(cr >= 1){
			return Math.floor(cr);
		}else if(cr >= 0.5){
			return 0.5;
		}else if (cr >= 0.25){
			return 0.25;
		}else if (cr >= 0.125){
			return 0.125;
		}else{
			return 0;
		}
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