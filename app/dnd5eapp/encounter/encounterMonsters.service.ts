import { Injectable, OnInit } from '@angular/core';
import { Monster } from '../monster/monster';
import { PlayerService } from '../players/player.service'
import { crMap, encounterMultipliers, Difficulty } from './encounterConstants';

@Injectable()
export class EncounterMonsterService implements OnInit{
	monsters: Monster[] = [];
	
	public constructor(private playerService: PlayerService){}
	
	ngOnInit(): void {
	}
	
	public addMonster(monster: Monster): void{
		this.monsters.push(monster);
	}
	
	public addMonsters(otherMonsters: Monster[]): void {
		this.monsters.push.apply(this.monsters, otherMonsters);
	}
	
	public removeMonster(index: number): void{
		if(index > -1) {
			this.monsters.splice(index,1);
		}
	}
	
	public clearMonsters(): void{
		this.monsters = [];
	}
	
	public getMonsters(): Monster[]{
		return this.monsters;
	} 
	
	public length(): number{
		return this.monsters.length;
	}
	
	public getXP(index: number){
		return crMap[this.monsters[index].CR];
	}
	
	public calculateXP(): number{
		let unModXP = 0;
		for(var monster of this.monsters) { unModXP += crMap[monster.CR];}
		
		var multiplier = encounterMultipliers[this.monsters.length]; 
		if(isNaN(multiplier) && this.monsters.length > 0){
			multiplier = encounterMultipliers.maxValue;
		}else if(this.monsters.length === 0){
			return 0;
		}

		console.log(this.monsters);
		return unModXP * multiplier;
	}
	
	public getDifficulty(): Difficulty {
		let encounterXP = this.calculateXP();
		
		if(encounterXP <= this.playerService.generateXPThreshold(Difficulty.Easy)){
			return Difficulty.Easy;
		}else if(encounterXP <= this.playerService.generateXPThreshold(Difficulty.Medium)){
			return Difficulty.Medium;
		}else if(encounterXP <= this.playerService.generateXPThreshold(Difficulty.Hard)){
			return Difficulty.Hard;
		}else{
			return Difficulty.Deadly;
		}
	}
}