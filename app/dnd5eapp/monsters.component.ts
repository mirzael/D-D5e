import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SimplePageScroll } from 'ng2-simple-page-scroll';

import { Monster } from './monster';
import { MonsterService } from './monster.service';
import { EncounterService } from './encounter/encounter.service';
import { crMap, encounterMultipliers } from './encounter/encounterConstants';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	templateUrl: "monsters.component.html",
	styleUrls: ["monsters.component.css"]
})

export class MonstersComponent implements OnInit{
	constructor(private monsterService: MonsterService, private route: ActivatedRoute, private location: Location, private encounterService: EncounterService){}
	monsters: Monster[] = [];
	totalXP: number = 0;
	errorMessage: any;
	
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
		this.monsterService.getMonsters().subscribe(
			monsters => {
				this.route.params.forEach((params: Params) => {
					let idArr = params['ids'];
					let ids = idArr.split(',');
					for(var i = 0; i<ids.length; i++){ ids[i] = +ids[i]; }
					this.monsters = this.monsterService.getMonstersByIds(ids);

					this.totalXP = this.encounterService.calculateXP(this.monsters);
					
					this.monsters.forEach(monster => monster.generateHP());
				});
			},
			err => {
				console.error(err)
		});
	}
}