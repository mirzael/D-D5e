import { Component, OnInit } from '@angular/core';
import { Monster } from './monster';
import { MonsterService } from './monster.service';

@Component ({
	selector: 'monsters',
	moduleId: module.id,
	template: `
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th> Name </th>
							<th> Size </th>
							<th> Type </th>
							<th> Align </th>
							<th> CR </th>
							<th> AC </th>
							<th> HP </th>
							<th> Speed </th>
							<th> Bonuses </th>
							<th> Perception </th>
							<th> Strength </th>
							<th> Dexterity </th>
							<th> Wisdom </th>
							<th> Intelligence </th>
							<th> Charisma </th>
							<th> Constitution </th>
						</tr>
					</thead>
					<tbody>
						<tr *ngFor="let monster of monsters">
							<td> {{ monster.Name }} </td>
							<td> {{ monster.Size }} </td>
							<td> {{ monster.Type }} </td>
							<td> {{ monster.Align }} </td>
							<td> {{ monster.CR }} </td>
							<td> {{ monster.AC }} </td>
							<td> {{ monster.HP }} </td>
							<td> {{ monster.Speed }} </td>
							<td> {{ monster.Bonuses }} </td>
							<td> {{ monster.Perception }} </td>
							<td> {{ monster.Strength }} </td>
							<td> {{ monster.Dexterity }} </td>
							<td> {{ monster.Wisdom }} </td>
							<td> {{ monster.Intelligence }} </td>
							<td> {{ monster.Charisma }} </td>
							<td> {{ monster.Constitution }} </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	`
})

export class MonstersComponent implements OnInit{
	constructor(private monsterService: MonsterService){}
	monsters: Monster[]
	errorMessage: any

	ngOnInit(): void{
		this.monsterService.getMonsters().subscribe(
			monsters => {this.monsters = monsters;},
			error => this.errorMessage = <any>error
		);
	}
}