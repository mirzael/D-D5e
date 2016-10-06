import { Component, OnInit } from '@angular/core';
import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	template: `
	<div class="container">
		<div class="row monsterContainer" *ngFor="let monster of monsters" style="margin: 10px 0;background-color: darkgray;">
			<div class="row monsterRow" >
				<div class="col-md-2">
					Name
				</div>
				<div class="col-md-3">
					{{monster.Name}}
				</div>
			</div>

			<div class="row monsterRow" >
				<div class="col-md-2">
					CR
				</div>
				<div class="col-md-3">
					{{monster.CR}}
				</div>
			</div>

			<div class="row monsterRow" >
				<div class="col-md-2">
					Size
				</div>
				<div class="col-md-3">
					{{monster.Size}}
				</div>
			</div>

			<div class="row monsterRow" >
				<div class="col-md-2">
					Type
				</div>
				<div class="col-md-3">
					{{monster.Type}}
				</div>
			</div>

			<div class="row monsterRow" >
				<div class="col-md-2">
					Alignment
				</div>
				<div class="col-md-3">
					{{monster.Align}}
				</div>
			</div>

			<div class="row monsterRow" >
				<div class="col-md-2">
					HP
				</div>
				<div class="col-md-3">
					{{monster.HP}}
				</div>
			</div>

			<div class="row monsterRow" >
				<div class="col-md-2">
					AC
				</div>
				<div class="col-md-3">
					{{monster.AC}}
				</div>
			</div>

			<div class="row monsterRow">
				<div class="col-md-2 attributes"> 
					Attributes
				</div>
				<div class="col-md-3 attributesDef" >
					<div class="row" 
						[ngClass]="{'text-info': monster.Strength > 15, 'text-muted': monster.Strength < 10}"
					> 
						STR: {{ monster.Strength }} 
					</div>
					<div class="row"
						[ngClass]="{'text-info': monster.Dexterity > 15, 'text-muted': monster.Dexterity < 10}"
					> 
						DEX: {{ monster.Dexterity }} 
					</div>
					<div class="row"
						[ngClass]="{'text-info': monster.Wisdom > 15, 'text-muted': monster.Wisdom < 10}"
					> 
						WIS: {{ monster.Wisdom }} 
					</div>
					<div class="row"
						[ngClass]="{'text-info': monster.Intelligence > 15, 'text-muted': monster.Intelligence < 10}"
					> 
						INT: {{ monster.Intelligence }} 
					</div>
					<div class="row"
						[ngClass]="{'text-info': monster.Charisma > 15, 'text-muted': monster.Charisma < 10}"
					> 
						CHA: {{ monster.Charisma }} 
					</div>
					<div class="row"
						[ngClass]="{'text-info': monster.Constitution > 15, 'text-muted': monster.Constitution < 10}"
					> 
						CON: {{ monster.Constitution }} 
					</div>
				</div>
			</div>

			<div class="row monsterRow" >
				<div class="col-md-2">
					Speed
				</div>
				<div class="col-md-3">
					{{monster.Speed}}
				</div>
			</div>

			<div class="row monsterRow" *ngIf="monster.Traits.length > 0">
				Traits
				<div class="row monsterRow" *ngFor="let trait of monster.Traits">
					<div class="monsterRow"> {{trait.Name}} </div>
					<div class="monsterRow"> 
						<span style="display: inline-block" *ngFor="let description of trait.Description">
							{{description}}
							<br/>
						</span>
					</div>
				</div>
			</div>

			<div class="row monsterRow" *ngIf="monster.Actions.length > 0">
				Actions
				<div class="monsterRow" *ngFor="let action of monster.Actions">
					<div class="monsterRow"> {{action.Name}} </div>
					<div class="monsterRow"> 
						<span style="display: inline-block" *ngFor="let description of action.Description">
							{{description}}
							<br/>
						</span>
					</div>
					<div class="monsterRow" *ngFor="let attack of action.Attacks">
						{{attack.Name}}
						<br/>
						Bonus: +{{attack.ToHitBonus}}
						<br/>
						Damage: {{attack.Damage}}
					</div>
				</div>
			</div>
		</div>
	</div>
	`,
	styleUrls: ["monsters.component.css"]
})

export class MonstersComponent implements OnInit{
	constructor(private monsterService: MonsterService){}
	monsters: Monster[]
	errorMessage: any

	ngOnInit(): void{
		this.monsterService.getMonsters().subscribe(
			monsters => {this.monsters = monsters; console.log(monsters);},
			error => this.errorMessage = <any>error
		);
	}
}