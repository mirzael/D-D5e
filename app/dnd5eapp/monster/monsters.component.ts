import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SimplePageScroll } from 'ng2-simple-page-scroll';

import { Monster } from './monster';
import { MonsterService } from './monster.service';
import { EncounterGeneratorService } from '../encounter/encounterGenerator.service';
import { EncounterMonsterService } from '../encounter/encounterMonsters.service';
import { crMap, encounterMultipliers, Difficulty } from '../encounter/encounterConstants';

declare var jQuery: any;

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	templateUrl: "monsters.component.html",
	styleUrls: ["monsters.component.css"]
})

export class MonstersComponent implements OnInit, AfterViewInit{
	constructor(private monsterService: MonsterService, private route: ActivatedRoute, private location: Location, private encounterService: EncounterGeneratorService, private encounterMonsterService: EncounterMonsterService){}
	
	errorMessage: any;
	difficulty: Difficulty;
	
	private checkHP(monster: Monster){
		if(monster.CurrentHP == 0 && monster.Name.indexOf("(DEAD)") === -1){
			monster.Name += " (DEAD)"
		}else if(monster.CurrentHP != 0){
			monster.Name = monster.Name.replace(" (DEAD)","");
		}
	}
	
	private getHPText(monster: Monster): string{
		if(monster.CurrentHP.toString() === ""){
			return "DEAD";
		} 
		return monster.CurrentHP.toString();
	}

	ngOnInit(): void{
		for(var monster of this.encounterMonsterService.getMonsters()){
			monster.generateHP();
		}
		
		this.difficulty = this.encounterMonsterService.getDifficulty();
	}
	
	ngAfterViewInit(){
		jQuery( document ).ready(function() {
			jQuery('.tabular.menu .item').tab();
		});
	}
	
	private isEasyEncounter(): boolean{
		return this.difficulty === Difficulty.Easy;
	}
	
	private isMediumEncounter(): boolean{
		return this.difficulty === Difficulty.Medium;
	}
	
	private isHardEncounter(): boolean{
		return this.difficulty === Difficulty.Hard;
	}
	
	private isDeadlyEncounter(): boolean{
		return this.difficulty === Difficulty.Deadly;
	}
	
	private getDifficultyString(): string{
		return Difficulty[this.difficulty]; 
	}
}