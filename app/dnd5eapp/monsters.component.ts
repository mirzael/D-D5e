import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SimplePageScroll } from 'ng2-simple-page-scroll';

import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	templateUrl: "monsters.component.html",
	styleUrls: ["monsters.component.css"]
})

export class MonstersComponent implements OnInit{
	constructor(private monsterService: MonsterService, private route: ActivatedRoute, private location: Location){}
	monsters: Monster[]
	errorMessage: any

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
					
					console.log(this.monsters);
				});
			},
			err => {
				console.error(err)
		});
	}
}