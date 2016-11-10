import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Spell } from './spell';

@Injectable()
export class SpellService{
	constructor(private http: Http){}
	spells : Spell[] = [];
	classes: string[] = [];
	levels: string[] = [
		"Cantrip",
		"1st-level",
		"2nd-level",
		"3rd-level",
		"4th-level",
		"5th-level",
		"6th-level",
		"7th-level",
		"8th-level",
		"9th-level"		
	];
	spellObserv: Observable<Spell[]>;
	

	getSpells(): Observable<Spell[]>{
		if(this.spellObserv == undefined){
			this.spellObserv = this.http.get('/app/spells.json')
				.map(response => this.extractData(response))
				.catch(this.handleError);
		}
		
		return this.spellObserv;
	}
	
	getClasses(): Observable<string[]>{
		let mappingFunction : (spells: Spell[]) => string[] = (spells: Spell[]) => {
			spells.forEach(this.addClasses.bind(this));
			
			return this.classes;
		};
		
		return this.getSpells().map(mappingFunction);
	}
	
	getLevels(): Promise<string[]>{
		return Promise.resolve(this.levels);
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
			spell.ritual = jSpell.ritual === "yes";
			spell.duration = jSpell.duration;
			spell.concentration = jSpell.concentration.toUpperCase();
			spell.casting_time = jSpell.casting_time;
			spell.level = jSpell.level.trim();
			spell.school = jSpell.school;
			spell.classes = jSpell.class.split(',');
			
			for(var i = spell.classes.length-1; i >= 0; i--){
				spell.classes[i] = spell.classes[i].trim();
			}

			this.spells.push(spell);
		}
		
		return this.spells;
	}

	private handleError(error: any): Promise<any>{
		  console.error('An error occurred', error); // for demo purposes only
		  return Promise.reject(error.message || error);
	}
	
	private addClasses(spell: Spell){		
		for(var cls of spell.classes){
			if(this.classes.indexOf(cls.trim()) === -1){
				this.classes.push(cls.trim());
			}
		}
	}
}