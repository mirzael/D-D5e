import { Component, OnInit } from '@angular/core';
import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	template: `
		<li *ngFor="let hero of monsters">
			<span>{{monster.name}}</span> {{monster.category}}
		</li>
	`
})

export class MonstersComponent implements OnInit{
	constructor(private monsterService: MonsterService){}
	monsters: Monster[]
	errorMessage: any

	ngOnInit(): void{
		this.monsterService.getMonsters().subscribe(
			monsters => this.monsters = monsters,
			error => this.errorMessage = <any>error
		);
	}
}