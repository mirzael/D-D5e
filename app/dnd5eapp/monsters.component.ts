import { Component, OnInit } from '@angular/core';
import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	template: `
	<div class="container">
		<div class="panel panel-primary monsterContainer" *ngFor="let monster of monsters">
			<div class="panel-heading" >
				<h3 class="panel-title">{{monster.Name}}</h3>
			</div>

			<div class="panel panel-success monsterHeader">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						CR
					</div>
					<div class="col-md-3">
						{{monster.CR}}
					</div>
				</div>
			</div>

			<div class="panel panel-success monsterHeader">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Size
					</div>
					<div class="col-md-3">
						{{monster.Size}}
					</div>
				</div>
			</div>

			<div class="panel panel-success monsterHeader">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Type
					</div>
					<div class="col-md-3">
						{{monster.Type}}
					</div>
				</div>
			</div>

			<div class="panel panel-success monsterHeader">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Alignment
					</div>
					<div class="col-md-3">
						{{monster.Align}}
					</div>
				</div>
			</div>

			<div class="panel panel-success monsterHeader">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						HP
					</div>
					<div class="col-md-3">
						{{monster.HP}}
					</div>
				</div>
			</div>

			<div class="panel panel-success monsterHeader">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						AC
					</div>
					<div class="col-md-3">
						{{monster.AC}}
					</div>
				</div>
			</div>
			
			<div class="panel panel-success monsterHeader" *ngIf="monster.Senses.length > 0">
				<div class="panel-dark monsterRow">
					<div class="col-md-2">
						Senses
					</div>
					<div class="col-md-3">
						<div *ngFor="let sense of monster.Senses">
							{{sense}}
						</div>
					</div>
				</div>
			</div>

			<div class="panel panel-success monsterHeader">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2 attributes"> 
						Attributes
					</div>
					<div class="col-md-3 attributesDef" >
						<div [ngClass]="{'text-success': monster.Strength > 15, 'text-muted': monster.Strength < 10}"> 
							STR: {{ monster.Strength }} 
						</div>
						<div [ngClass]="{'text-success': monster.Dexterity > 15, 'text-muted': monster.Dexterity < 10}"> 
							DEX: {{ monster.Dexterity }} 
						</div>
						<div [ngClass]="{'text-success': monster.Wisdom > 15, 'text-muted': monster.Wisdom < 10}"> 
							WIS: {{ monster.Wisdom }} 
						</div>
						<div [ngClass]="{'text-success': monster.Intelligence > 15, 'text-muted': monster.Intelligence < 10}"> 
							INT: {{ monster.Intelligence }} 
						</div>
						<div [ngClass]="{'text-success': monster.Charisma > 15, 'text-muted': monster.Charisma < 10}"> 
							CHA: {{ monster.Charisma }} 
						</div>
						<div [ngClass]="{'text-success': monster.Constitution > 15, 'text-muted': monster.Constitution < 10}"> 
							CON: {{ monster.Constitution }} 
						</div>
					</div>
				</div>
			</div>
			
			<div class="panel panel-success monsterHeader" *ngIf="monster.Bonuses.length > 0">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Skill Bonuses
					</div>
					<div class="col-md-3">
						<div *ngFor="let bonus of monster.Bonuses">
							{{bonus}}
						</div>
					</div>
				</div>
			</div>
			
			<div class="panel panel-success monsterHeader"  *ngIf="monster.Saves.length > 0">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Save Bonuses
					</div>
					<div class="col-md-3">
						<div *ngFor="let save of monster.Saves">
							{{save}}
						</div>
					</div>
				</div>
			</div>
			
			<div class="panel panel-success monsterHeader"  *ngIf="monster.Resistances.length > 0">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Resistances
					</div>
					<div class="col-md-4">
						<div *ngFor="let resistance of monster.Resistances">
							{{resistance}}
						</div>
					</div>
				</div>
			</div>

			<div class="panel panel-success monsterHeader" *ngIf="monster.Immunities.length > 0">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Immunities
					</div>
					<div class="col-md-4">
						<div *ngFor="let immunity of monster.Immunities">
							{{immunity}}
						</div>
					</div>
				</div>
			</div>
			
			<div class="panel panel-success monsterHeader" *ngIf="monster.Vulnerabilities.length > 0">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Vulnerabilities
					</div>
					<div class="col-md-4">
						<div *ngFor="let vulnerable of monster.Vulnerabilities">
							{{vulnerable}}
						</div>
					</div>
				</div>
			</div>

			<div class="panel panel-success monsterHeader">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Speed
					</div>
					<div class="col-md-3">
						{{monster.Speed}}
					</div>
				</div>
			</div>
			
			<div class="panel panel-success monsterHeader" *ngIf="monster.Spells.length > 0">
				<div class="panel-dark monsterRow" >
					<div class="col-md-2">
						Spells
					</div>
					<div class="col-md-4">
						<div *ngFor="let spell of monster.Spells">
							{{spell}}
						</div>
					</div>
				</div>
			</div>
			

			<span class="monsterListDescription" *ngIf="monster.Traits.length > 0">
				Traits
			</span>

			<div class="panel panel-success monsterHeader" *ngFor="let trait of monster.Traits">
				<div class="panel-dark monsterRow" >
					<div class="monsterRow"> {{trait.Name}} </div>
					<div class="monsterRow"> 
						<span style="display: inline-block" *ngFor="let description of trait.Description">
							{{description}}
							<br/>
						</span>
					</div>
				</div>
			</div>


			<span  class="monsterListDescription" *ngIf="monster.Actions.length > 0">
				Actions
			</span>

			<div class="panel panel-success monsterHeader" *ngFor="let action of monster.Actions">
				<div class="panel-dark monsterRow" >
					<div class="monsterRow"> {{action.Name}} </div>
					<div class="monsterRow" *ngFor="let attack of action.Attacks">
						{{attack.Name}}
						<br/>
						Bonus: +{{attack.ToHitBonus}}
						<br/>
						Damage: {{attack.Damage}}
					</div>
					<div class="monsterRow"> 
						<span style="display: inline-block" *ngFor="let description of action.Description">
							{{description}}
							<br/>
						</span>
					</div>
				</div>
			</div>
			
			<span  class="monsterListDescription" *ngIf="monster.Legendaries.length > 0">
				Legendaries
			</span>

			<div class="panel panel-success monsterHeader" *ngFor="let legendary of monster.Legendaries">
				<div class="panel-dark monsterRow" >
					<div class="monsterRow"> {{legendary.Name}} </div>
					<div class="monsterRow" *ngFor="let attack of legendary.Attacks">
						{{attack.Name}}
						<br/>
						Bonus: +{{attack.ToHitBonus}}
						<br/>
						Damage: {{attack.Damage}}
					</div>
					<div class="monsterRow"> 
						<span style="display: inline-block" *ngFor="let description of legendary.Description">
							{{description}}
							<br/>
						</span>
					</div>
				</div>
			</div>
			
			<span class="monsterListDescription" *ngIf="monster.Reactions.length > 0">
				Reactions
			</span>

			<div class="panel panel-success monsterHeader" *ngFor="let reaction of monster.Reactions">
				<div class="panel-dark monsterRow" >
					<div class="monsterRow"> {{reaction.Name}} </div>
					<div class="monsterRow"> 
						<span style="display: inline-block" *ngFor="let description of reaction.Description">
							{{description}}
							<br/>
						</span>
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