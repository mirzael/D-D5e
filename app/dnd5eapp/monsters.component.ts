import { Component, OnInit } from '@angular/core';
import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	template: `
	<div class="container">
		<div class="row bg-primary" *ngFor="let monster of monsters" style="padding: 10px 0; margin: 10px 0;">
			<div class="col-md-2 attributes border-right"> 
				Attributes
			</div>
			<div class="col-md-2 attributesDef borders" >
				<div class="row" [ngClass]="{'text-success': monster.Strength > 15}"> STR: {{ monster.Strength }} </div>
				<div class="row"> DEX: {{ monster.Dexterity }} </div>
				<div class="row"> WIS: {{ monster.Wisdom }} </div>
				<div class="row"> INT: {{ monster.Intelligence }} </div>
				<div class="row"> CHA: {{ monster.Charisma }} </div>
				<div class="row"> CON: {{ monster.Constitution }} </div>
			</div>
			<!--
					<div> {{ monster.Name }} </div>
					<div> {{ monster.Size }} </div>
					<div> {{ monster.Type }} </div>
					<div> {{ monster.Align }} </div>
					<div> {{ monster.CR }} </div>
					<div> {{ monster.AC }} </div>
					<div> {{ monster.HP }} </div>
					<div> {{ monster.Speed }} </div>
					<div> {{ monster.Bonuses }} </div>

					<div> {{ monster.Constitution }} </div>
					<div> 
						<div class="row" >
							<div *ngFor="let trait of monster.Traits">
								<div class="row">
									<div > {{ trait.Name}} </div>
									<div > 
										<span style="display: inline-block" *ngFor="let description of trait.Description">
											{{description}}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
			-->
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
			monsters => {this.monsters = monsters.slice(1,5); console.log(monsters);},
			error => this.errorMessage = <any>error
		);
	}
}