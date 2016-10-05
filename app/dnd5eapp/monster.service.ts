import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Monster } from './monster';

declare var xml2json: any;

@Injectable()
export class MonsterService{
	constructor(private http: Http){}
	monsters : Monster[] = [];

	getMonsters(): Observable<Monster[]>{
		if(this.monsters.length > 0){
			return Observable.fromPromise(Promise.resolve(this.monsters));
		}else{
			return this.http.get('/app/monsters.xml')
				.map(response => this.extractData(response))
				.catch(this.handleError);
		}
	}

	private extractData(res: Response): Monster[]{
		console.log(res);
		let doc: any = JSON.parse(xml2json(res.text(), "  "));

		let monsters = doc.compendium.monster;

		for (var i = monsters.length - 1; i >= 0; i--) {
			console.log(monsters[i]);

			let monster: Monster = new Monster();
			monster.Name = monsters[i].name;
			monster.Size = monsters[i].size;
			monster.Type = monsters[i].type.replace(", monster manual", "");
			monster.Align = monsters[i].alignment;
			if(monsters[i].cr.indexOf("/") != -1) {
				monster.CR = eval(monsters[i].cr);
			}else{
				monster.CR = parseInt(monsters[i].cr);
			}
			monster.AC = monsters[i].ac;
			monster.HP = monsters[i].hp;
			monster.Speed = monsters[i].speed;
			
			if(monsters[i].hasOwnProperty("skill")){
				monster.Bonuses = monsters[i].skill.split(',')
			}

			monster.Perception = monsters[i].passive;
			monster.Strength = monsters[i].str;
			monster.Dexterity = monsters[i].dex;
			monster.Wisdom = monsters[i].wis;
			monster.Intelligence = monsters[i].int;
			monster.Charisma = monsters[i].cha;
			monster.Constitution = monsters[i].con;

			this.monsters.push(monster);
		}
		return this.monsters;
	}

	private handleError(error: any): Promise<any>{
		  console.error('An error occurred', error); // for demo purposes only
		  return Promise.reject(error.message || error);
	}
}