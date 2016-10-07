import { Component, OnInit } from '@angular/core';
import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component({
	selector: 'encounter',
	moduleId: module.id,
	template: `
	<div class="dropdown">
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

	<div class="panel panel-info" *ngIf="players.length > 0">
		<div class="container">
			<div class="row">
				<div class="col-sm-2 bg-success" style="margin: 10px; text-align: center" *ngFor="let player of players">
					<button class="close" (click)="removePlayer(index-1)">x</button>Level {{player}}
				</div>
			</div>
		</div>
	</div>
	`
})

export class EncounterComponent{
	players: number[] = []
	constructor(private monsterService: MonsterService){}

	private generateEncounter(){

	} 

	private addPlayer(number){
		this.players.push(number);
	}

	private removePlayer(index){
		this.players.splice(index,1);
	}
}