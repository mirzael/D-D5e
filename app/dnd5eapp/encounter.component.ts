import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component({
	selector: 'encounter',
	moduleId: module.id,
	template: `
	<div class="dropdown pageButton" style="width: 90%">
		<button class="btn btn-primary dropdown-toogle" type="button" data-toggle="dropdown">Add Player
		<span class="caret"></span></button>
		<ul class="dropdown-menu">
			<li><a (click)="addPlayer(1)"> Level 01 </a></li>
			<li><a (click)="addPlayer(2)"> Level 02 </a></li>
			<li><a (click)="addPlayer(3)"> Level 03 </a></li>
			<li><a (click)="addPlayer(4)"> Level 04 </a></li>			
			<li><a (click)="addPlayer(5)"> Level 05 </a></li>			
			<li><a (click)="addPlayer(6)"> Level 06 </a></li>			
			<li><a (click)="addPlayer(7)"> Level 07 </a></li>			
			<li><a (click)="addPlayer(8)"> Level 08 </a></li>			
			<li><a (click)="addPlayer(9)"> Level 09 </a></li>			
			<li><a (click)="addPlayer(10)"> Level 10 </a></li>
			<li><a (click)="addPlayer(11)"> Level 11 </a></li>
			<li><a (click)="addPlayer(12)"> Level 12 </a></li>
			<li><a (click)="addPlayer(13)"> Level 13 </a></li>
			<li><a (click)="addPlayer(14)"> Level 14 </a></li>			
			<li><a (click)="addPlayer(15)"> Level 15 </a></li>			
			<li><a (click)="addPlayer(16)"> Level 16 </a></li>			
			<li><a (click)="addPlayer(17)"> Level 17 </a></li>			
			<li><a (click)="addPlayer(18)"> Level 18 </a></li>			
			<li><a (click)="addPlayer(19)"> Level 19 </a></li>			
			<li><a (click)="addPlayer(20)"> Level 20 </a></li>		
		</ul>
	</div>

	<div class="panel panel-info" *ngIf="players.length > 0" style="width: 90%; margin: 0 auto;">
		<div class="panel-heading" >
			<h3 class="panel-title">Players</h3>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-sm-2 bg-success playerElement" *ngFor="let player of players; let i = index;">
					<button class="close" style="margin-top: 7px" (click)="removePlayer(i)">x</button>Level {{player}}
				</div>
			</div>
		</div>
	</div>
	
	<button class="btn btn-success pageButton" (click)="generateEncounter()">
		GENERATE ENCOUNTER
	</button>
	`,
	styleUrls: ["encounter.component.css"]
})

export class EncounterComponent implements OnInit{
	players: number[] = []
	monsters: Monster[] = []
	constructor(private monsterService: MonsterService, private router: Router){}

	private generateEncounter(){
		if(this.players.length <= 0){
			console.error("Cannot generate encounter with no players. Please add at least one player.");
		}else{
			let monsterIds: number[] = [];
			for(let i: number = 0; i <= 5; i++){
				let monsterId: number = Math.floor(Math.random() * this.monsters.length);
				
				monsterIds.push(monsterId);
			}
			
			let link = ['/monsters', monsterIds.toString()];
			this.router.navigate(link);
		}
	} 

	private addPlayer(number){
		this.players.push(number);
	}

	private removePlayer(index){
		this.players.splice(index,1);
	}
	
	ngOnInit(): void{
		this.monsterService.getMonsters().subscribe(
			monsters => this.monsters = monsters,
			error => console.error(error)
		);
	}
}