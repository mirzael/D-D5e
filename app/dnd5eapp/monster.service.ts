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

			this.monsters.push(monster);
		}
		return this.monsters;
	}

	private processTraits(monster: any): MonsterProperty[]{
		let traits: MonsterProperty[] = []
		if(monster.hasOwnProperty("trait")){
			if(Array.isArray(monster.trait)){
				for( var j = monster.trait.length - 1; j >= 0; j--){
					let trait: MonsterProperty = new MonsterProperty();
					let xmlTrait : any = monster.trait[j];
					trait.Name = xmlTrait.name;

					if(Array.isArray(xmlTrait.text)){
						for(var k = xmlTrait.text.length - 1; k >= 0; k--){
							trait.Description.push(xmlTrait.text[k]);
						}
					}else{
						trait.Description.push(xmlTrait.text);
					}

					traits.push(trait);
				}
			}else{
				let trait: MonsterProperty = new MonsterProperty();
				let xmlTrait : any = monster.trait;
				trait.Name = xmlTrait.name;

				if(Array.isArray(xmlTrait.text)){
					for(var k = xmlTrait.text.length - 1; k >= 0; k--){
						trait.Description.push(xmlTrait.text[k]);
					}
				}else{
					trait.Description.push(xmlTrait.text);
				}

				traits.push(trait);
			}
		}
		return traits;
	}

	private processActions(monster: any): MonsterProperty[]{
		let actions: MonsterProperty[] = []
		if(monster.hasOwnProperty("action")){
			if(Array.isArray(monster.action)){
				for( var j = monster.action.length - 1; j >= 0; j--){
					let action: MonsterProperty = new MonsterProperty();
					let xmlaction : any = monster.action[j];
					action.Name = xmlaction.name;

					if(Array.isArray(xmlaction.text)){
						for(var k = xmlaction.text.length - 1; k >= 0; k--){
							action.Description.push(xmlaction.text[k]);
						}
					}else{
						action.Description.push(xmlaction.text);
					}

					if(xmlaction.hasOwnProperty("attack")){
						if(Array.isArray(xmlaction.attack)){
							for(var k = xmlaction.attack.length - 1; k >= 0; k--){
								let attack:Attack = new Attack();
								let actAttrs = xmlaction.attack[k].split("|");
								attack.Name = actAttrs[0];
								attack.ToHitBonus = parseInt(actAttrs[1]);
								attack.Damage = actAttrs[1];

								action.Attacks.push(attack);
							}
						}else{
							let attack:Attack = new Attack();
							let actAttrs = xmlaction.attack.split("|");
							attack.Name = actAttrs[0];
							attack.ToHitBonus = parseInt(actAttrs[1]);
							attack.Damage = actAttrs[1];

							action.Attacks.push(attack);
						}
					}

					actions.push(action);
				}
			}else{
				let action: MonsterProperty = new MonsterProperty();
				let xmlaction : any = monster.action;
				action.Name = xmlaction.name;

				if(Array.isArray(xmlaction.text)){
					for(var k = xmlaction.text.length - 1; k >= 0; k--){
						action.Description.push(xmlaction.text[k]);
					}
				}else{
					action.Description.push(xmlaction.text);
				}

				if(xmlaction.hasOwnProperty("attack")){
					if(Array.isArray(xmlaction.attack)){
						for(var k = xmlaction.attack.length - 1; k >= 0; k--){
							let attack:Attack = new Attack();
							let actAttrs = xmlaction.attack[k].split("|");
							attack.Name = actAttrs[0];
							attack.ToHitBonus = parseInt(actAttrs[1]);
							attack.Damage = actAttrs[1];

							action.Attacks.push(attack);
						}
					}else{
						let attack:Attack = new Attack();
						let actAttrs = xmlaction.attack.split("|");
						attack.Name = actAttrs[0];
						attack.ToHitBonus = parseInt(actAttrs[1]);
						attack.Damage = actAttrs[1];

						action.Attacks.push(attack);
					}
				}

				actions.push(action);
			}
		}

		return actions;
	}

	private processLegendaries(monster: any): MonsterProperty[]{
	let legendaries: MonsterProperty[] = []
	if(monster.hasOwnProperty("legendary")){
		if(Array.isArray(monster.legendary)){
			for( var j = monster.legendary.length - 1; j >= 0; j--){
				let legendary: MonsterProperty = new MonsterProperty();
				let xmllegendary : any = monster.legendary[j];
				legendary.Name = xmllegendary.name;

				if(Array.isArray(xmllegendary.text)){
					for(var k = xmllegendary.text.length - 1; k >= 0; k--){
						legendary.Description.push(xmllegendary.text[k]);
					}
				}else{
					legendary.Description.push(xmllegendary.text);
				}

				if(xmllegendary.hasOwnProperty("attack")){
					if(Array.isArray(xmllegendary.attack)){
						for(var k = xmllegendary.attack.length - 1; k >= 0; k--){
							let attack:Attack = new Attack();
							let actAttrs = xmllegendary.attack[k].split("|");
							attack.Name = actAttrs[0];
							attack.ToHitBonus = parseInt(actAttrs[1]);
							attack.Damage = actAttrs[1];

							legendary.Attacks.push(attack);
						}
					}else{
						let attack:Attack = new Attack();
						let actAttrs = xmllegendary.attack.split("|");
						attack.Name = actAttrs[0];
						attack.ToHitBonus = parseInt(actAttrs[1]);
						attack.Damage = actAttrs[1];

						legendary.Attacks.push(attack);
					}
				}

				legendaries.push(legendary);
			}
		}else{
			let legendary: MonsterProperty = new MonsterProperty();
			let xmllegendary : any = monster.legendary;
			legendary.Name = xmllegendary.name;

			if(Array.isArray(xmllegendary.text)){
				for(var k = xmllegendary.text.length - 1; k >= 0; k--){
					legendary.Description.push(xmllegendary.text[k]);
				}
			}else{
				legendary.Description.push(xmllegendary.text);
			}

			if(xmllegendary.hasOwnProperty("attack")){
				if(Array.isArray(xmllegendary.attack)){
					for(var k = xmllegendary.attack.length - 1; k >= 0; k--){
						let attack:Attack = new Attack();
						let actAttrs = xmllegendary.attack[k].split("|");
						attack.Name = actAttrs[0];
						attack.ToHitBonus = parseInt(actAttrs[1]);
						attack.Damage = actAttrs[1];

						legendary.Attacks.push(attack);
					}
				}else{
					let attack:Attack = new Attack();
					let actAttrs = xmllegendary.attack.split("|");
					attack.Name = actAttrs[0];
					attack.ToHitBonus = parseInt(actAttrs[1]);
					attack.Damage = actAttrs[1];

					legendary.Attacks.push(attack);
				}
			}

			legendaries.push(legendary);
		}
	}

	return legendaries;
}



	private handleError(error: any): Promise<any>{
		  console.error('An error occurred', error); // for demo purposes only
		  return Promise.reject(error.message || error);
	}
}