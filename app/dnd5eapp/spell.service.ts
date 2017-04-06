import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Spell } from './spell';

@Injectable()
export class SpellService{
	constructor(private http: Http){
		let mappingFunction : (response: Response) => Spell[] = this.extractData.bind(this);
		this.spellObserv = this.http.get('/app/spells.json').share().map(mappingFunction);		
	}
	
	processed : boolean = false;
	spells : Spell[] = [];
	classes: string[] = ["All"];
	levels: string[] = [
		"All",
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
		if(this.processed){ return this.spells; }
		var data = resp.json();

		for(let jSpell of data){
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
		
		this.processed = true;
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