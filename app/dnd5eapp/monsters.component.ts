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
							<th> Type </th>
						</tr>
					</thead>
					<tbody>
						<tr *ngFor="let monster of monsters">
							<td> {{monster.Name }} </td>
							<td> {{monster.Type }} </td>
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