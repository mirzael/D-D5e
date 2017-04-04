import { Injectable, OnInit } from '@angular/core';

import { deadlyMap, easyMap, mediumMap, hardMap, numberMap, Difficulty } from '../encounter/encounterConstants';

@Injectable()
export class PlayerService implements OnInit{
	players: number[] = [];
	
	ngOnInit(): void {
	}
	
	public addPlayer(level: number): void{
		this.players.push(level);
	}
	
	public removePlayer(index: number): void{
		if(index > -1) {
			this.players.splice(index,1);
		}
	}
	
	public getPlayers(): number[]{
		return this.players;
	} 
	
	public length(): number{
		return this.players.length;
	}
	
	public generateXPThreshold(difficulty: Difficulty): number{
		let map: numberMap;
		let xpThreshold = 0;
		
		switch (difficulty) {
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
				console.log(difficulty);
				console.error("Undefined Difficulty encountered. Not generating encounter.");
				return NaN;
		}

		for (var level of this.players) { xpThreshold += map[level]; }
		
		return xpThreshold;
	}

}