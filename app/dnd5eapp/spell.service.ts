import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Spell } from './spell';

@Injectable()
export class SpellService{
	constructor(private http: Http){}
	spells : Spell[] = [];
	classes: string[] = [];
	schools: string[] = [];
	

	getSpells(): Observable<Spell[]>{
		if(this.spells.length > 0){
			return Observable.fromPromise(Promise.resolve(this.spells));
		}else{
			return this.http.get('/app/spells.json')
				.map(response => this.extractData(response))
				.catch(this.handleError);
		}
	}
	
	private extractData(resp: Response): Spell[]{
		console.log(resp);
		var data = resp.json();
		console.log(data);

		for(let jSpell of data){
			console.log(jSpell.class);

			let spell: Spell = new Spell;
			spell.name = jSpell.name;
			spell.description = jSpell.desc;
			spell.range = jSpell.range;
			spell.components = jSpell.components;
			spell.material = jSpell.material;
			spell.ritual = jSpell.ritual.indexOf("yes") > -1;
			spell.duration = jSpell.duration;
			spell.concentration = jSpell.duration.indexOf("yes") > -1;
			spell.casting_time = jSpell.casting_time;
			spell.level = jSpell.level;
			spell.school = jSpell.school;
			spell.classes = jSpell.class.split(',');

			this.spells.push(spell);
		}

		return this.spells;
	}

	private handleError(error: any): Promise<any>{
		  console.error('An error occurred', error); // for demo purposes only
		  return Promise.reject(error.message || error);
	}
}