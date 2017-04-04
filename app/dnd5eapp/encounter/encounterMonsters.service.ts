import { Injectable, OnInit } from '@angular/core';
import { Monster } from '../monster/monster'
import { crMap, encounterMultipliers } from './encounterConstants';

@Injectable()
export class EncounterMonsterService implements OnInit{
	monsters: Monster[] = [];
	
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
}