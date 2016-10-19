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
	typeFilter: string = "all";
	alignmentFilter: string = "all";
	types: string[];
	alignments: string[];
	constructor(private monsterService: MonsterService, private router: Router, private randGenerator: gaussianRandomNumberGenerator){}

	private generateEncounter(){
		if(this.players.length <= 0){
			console.error("Cannot generate encounter with no players. Please add at least one player.");
		}else{
			var maxCr = Math.min(...this.players);
			let xpThreshold: number = 0;
			let encounterMonsters: Monster[] = [];

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
				(this.typeFilter === "all" || monster.Type.indexOf(this.typeFilter) > -1 ) && 
				(this.alignmentFilter === "all" ||
					monster.Align === "any alignment" || 
					monster.Align.indexOf(this.alignmentFilter) > -1) ||
					(this.alignmentFilter.indexOf("evil") > -1 && monster.Align === "any evil alignment") ||
					(this.alignmentFilter.indexOf("chaotic") > -1 && monster.Align === "any chaotic alignment") ||
					(this.alignmentFilter.indexOf("good") === -1 && monster.Align === "any non-good alignment") ||
					(this.alignmentFilter.indexOf("lawful") === -1 && monster.Align === "any non-lawful alignment"));
			console.log(filteredMonsters);
			if(filteredMonsters.length === 0){
				console.error("There are no monsters of type: " + this.typeFilter + " that match the filter and players that you have selected. " );
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

				calculatedXP = this.calculateXP(encounterMonsters.length+1, unmodifiedXP,monsterXP);
				console.log("Calculated XP: " + calculatedXP);
				
				if(calculatedXP < xpThreshold){
					encounterMonsters.push(monsterToExamine);
					currentXP = calculatedXP;
					unmodifiedXP += monsterXP;
					console.log("New XP: " + currentXP);
				}else{
					retries++;
					totalRetries++;
					if(retries > 5 && totalRetries % 5 < 4 && encounterMonsters.length > 0){
						let monster: Monster = encounterMonsters.pop();
						unmodifiedXP -= crMap[monster.CR];
						currentXP =  this.calculateXP(encounterMonsters.length, unmodifiedXP,0);
						console.log("unmod xp: " + unmodifiedXP);
						console.log("Retrying. New XP: " + currentXP);
						retries = 0;
					}else if(retries > 5 && (totalRetries % 5 == 4 || encounterMonsters.length === 0)){
						encounterMonsters = [];
						unmodifiedXP = 0;
						currentXP = 0;
						resets++;
						retries = 0;
					}
					
					if(resets >= MAX_RESETS){
						encounterMonsters = [];
						unmodifiedXP = 0;
						currentXP = 0;
						console.error("Could not generate encounter with given parameters");
						return;
					}
				}
			}

			let monsterIds: number[] = [];
			for(var monster of encounterMonsters){ monsterIds.push(monster.ID); }
			console.log(encounterMonsters)
			let link = ['/monsters', monsterIds.toString()];
			this.router.navigate(link);
		}
	} 

	private calculateXP(numMonsters: number, unModifiedXP: number, newXP: number): number{
		var multiplier = encounterMultipliers[numMonsters]; 
		if(isNaN(multiplier) && numMonsters > 0){
			multiplier = encounterMultipliers.maxValue;
		}else if(numMonsters = 0){
			return 0;
		}
		return (unModifiedXP + newXP) * multiplier;
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
	
	private setFilter(filter){
		this.typeFilter = filter;
	}
	
	private setAlignmentFilter(filter){
		this.alignmentFilter = filter;
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