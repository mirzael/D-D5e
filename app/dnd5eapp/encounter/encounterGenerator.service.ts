import { Injectable } from '@angular/core';
import { Monster } from '../monster/monster';
import { crMap, deadlyMap, easyMap, mediumMap, hardMap, encounterMultipliers, numberMap, Difficulty } from './encounterConstants';
import { GaussianRandomNumberGenerator } from './gaussianNumberGenerator';
import { PlayerService } from '../players/player.service';

@Injectable()
export class EncounterGeneratorService{
	private difficulty: Difficulty = Difficulty.Easy;
	private players: number[];
	constructor(private rand: GaussianRandomNumberGenerator, private playerService: PlayerService){}
	
	public setDifficulty(difficulty: Difficulty){
		this.difficulty = difficulty;
	}
	
	public calculateXP(monsters: Monster[]): number{
		let unModXP = 0;
		for(var monster of monsters) { unModXP += crMap[monster.CR];}
		return this._calculateXP(monsters.length, unModXP);
	}
	
	public generateEncounter(monsters: Monster[]): Monster[]{
		var encounterMonsters: Monster[] = [];
		var maxCr = Math.min(...this.playerService.getPlayers());
		let xpThreshold: number = this.playerService.generateXPThreshold(this.difficulty);
		
		let crMult: number = 1;
		if(this.difficulty === Difficulty.Deadly) crMult = 1.5;
		
		let currentXP: number = 0;
		let unmodifiedXP: number = 0;

		let retries: number = 0;
		let totalRetries: number = 0;
		let resets: number = 0;
		let MAX_RESETS: number = 8;
		while(!this.withinThreshold(currentXP, xpThreshold, 0.10)){
			
			let monsterToExamine = this.getRandomMonster(monsters, maxCr * crMult);
			let monsterXP: number = crMap[monsterToExamine.CR];

			let calculatedXP: number = 0;

			calculatedXP = this._calculateXP(encounterMonsters.length+1, unmodifiedXP,monsterXP);
			
			if(calculatedXP < xpThreshold){
				encounterMonsters.push(monsterToExamine);
				currentXP = calculatedXP;
				unmodifiedXP += monsterXP;
			}else{
				retries++;
				totalRetries++;
				if(retries > 5 && totalRetries % 5 < 4 && encounterMonsters.length > 0){
					let monster: Monster = encounterMonsters.pop();
					unmodifiedXP -= crMap[monster.CR];
					currentXP =  this._calculateXP(encounterMonsters.length, unmodifiedXP);
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
					return [];
				}
			}
		}
		
		return encounterMonsters;
	} 
	
	private getRandomMonster(monsterList: Monster[], maxCR: number): Monster{
		let cr = this.getNearestCR(this.rand.generateGaussianNoise(maxCR / 2, maxCR / 4));
		cr = Math.min(cr, maxCR);
		let filteredMonsters = monsterList.filter(monster => monster.CR === cr);
		if(filteredMonsters.length === 0) return this.getRandomMonster(monsterList, maxCR);
		
		let randIndex: number = Math.floor(Math.random() * filteredMonsters.length);
		return filteredMonsters[randIndex];
	}

	private _calculateXP(numMonsters: number, unModifiedXP: number, newXP?: number): number{
		let calcMonsters = numMonsters;
		if(newXP !== undefined) calcMonsters++;
		else newXP = 0;
		var multiplier = encounterMultipliers[calcMonsters]; 
		if(isNaN(multiplier) && calcMonsters > 0){
			multiplier = encounterMultipliers.maxValue;
		}else if(calcMonsters = 0){
			return 0;
		}
		
		let xp = (unModifiedXP + newXP) * multiplier;
		return xp;
	}
	
	private withinThreshold(currentNumber: number, maxNumber: number, thresholdPercentage: number): boolean{
		if(currentNumber == 0) return false;
		return Math.abs(Math.max(maxNumber, currentNumber) - Math.min(maxNumber, currentNumber))/Math.min(maxNumber, currentNumber) < thresholdPercentage;
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
}