import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SimplePageScroll } from 'ng2-simple-page-scroll';

import { Monster } from './monster';
import { MonsterService } from './monster.service';
import { crMap } from './encounterConstants';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	templateUrl: "monsters.component.html",
	styleUrls: ["monsters.component.css"]
})

export class MonstersComponent implements OnInit{
	constructor(private monsterService: MonsterService, private route: ActivatedRoute, private location: Location){}
	monsters: Monster[] = [];
	totalXP: number = 0;
	errorMessage: any;

	ngOnInit(): void{
		this.monsterService.getMonsters().subscribe(
			monsters => {
				this.route.params.forEach((params: Params) => {
					let idArr = params['ids'];
					console.log(idArr);
					let ids = idArr.split(',');
					for(var i = 0; i<ids.length; i++){ ids[i] = +ids[i]; }
					console.log(ids);
					this.monsters = this.monsterService.getMonstersByIds(ids);
					
					for(let monster of this.monsters){
						this.totalXP += crMap[monster.CR];
					}
					
					console.log(this.monsters);
				});
			},
			err => {
				console.error(err)
		});
	}
}