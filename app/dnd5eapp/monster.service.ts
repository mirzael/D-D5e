import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Monster, MonsterProperty, Attack } from './monster';

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
			monster.Traits = this.processTraits(monsters[i]);
			monster.Actions = this.processActions(monsters[i]);
			monster.Legendaries = this.processLegendaries(monsters[i]);

			if(monsters[i].hasOwnProperty("languages")){
				monster.Languages = monsters[i].languages.split(",");
			}

			if(monsters[i].hasOwnProperty("immune")){
				monster.Immunities = monsters[i].immune;
			}

			if(monsters[i].hasOwnProperty("spells")){
				monster.Spells = monsters[i].spells.split(",");
			}

			this.monsters.push(monster);
		}
		return this.monsters;
	}

	private processSingleMonsterProperty(property: any): MonsterProperty{
		let newProp: MonsterProperty = new MonsterProperty();
		newProp.Name = property.name;

		if(Array.isArray(property.text)){
			for(var k = 0; k < property.text.length; k++){
				newProp.Description.push(property.text[k]);
			}
		}else{
			newProp.Description.push(property.text);
		}

		if(property.hasOwnProperty("attack")){
			if(Array.isArray(property.attack)){
				for(var k = property.attack.length - 1; k >= 0; k--){
					let attack:Attack = new Attack();
					let actAttrs = property.attack[k].split("|");
					attack.Name = actAttrs[0];
					attack.ToHitBonus = parseInt(actAttrs[1]);
					attack.Damage = actAttrs[2];

					newProp.Attacks.push(attack);
				}
			}else{
				let attack:Attack = new Attack();
				let actAttrs = property.attack.split("|");
				attack.Name = actAttrs[0];
				attack.ToHitBonus = parseInt(actAttrs[1]);
				attack.Damage = actAttrs[2];

				newProp.Attacks.push(attack);
			}
		}

		return newProp
	}

	private processMonsterProperty(property: any): MonsterProperty[]{
		let properties: MonsterProperty[] = [];
		if(property !== undefined){
			if(Array.isArray(property)){
				for(var i = property.length - 1; i >= 0; i--){
					properties.push(this.processSingleMonsterProperty(property[i]));
				}
			}else{
				properties.push(this.processSingleMonsterProperty(property));
			}
		}
		return properties;
	}

	private processTraits(monster: any): MonsterProperty[]{
		return this.processMonsterProperty(monster.trait);
	}

	private processActions(monster: any): MonsterProperty[]{
		return this.processMonsterProperty(monster.action);
	}

	private processLegendaries(monster: any): MonsterProperty[]{
		return this.processMonsterProperty(monster.legendary);
	}

	private handleError(error: any): Promise<any>{
		  console.error('An error occurred', error); // for demo purposes only
		  return Promise.reject(error.message || error);
	}
}