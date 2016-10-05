import { Component, OnInit } from '@angular/core';
import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	template: `
	<div class="container">
		<div class="row" *ngFor="let monster of monsters" style="margin: 10px 0;background-color: darkgray;">
			<div class="row" style="padding: 10px 0; margin: 10px 10px; background-color: dimgrey; width=80%;">
				<div class="col-md-2">
					Name
				</div>
				<div class="col-md-3">
					{{monster.Name}}
				</div>
			</div>

			<div class="row" style="padding: 10px 0; margin: 10px 10px; background-color: dimgrey; width=80%;">
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
			monsters => {this.monsters = monsters; console.log(monsters);},
			error => this.errorMessage = <any>error
		);
	}
}