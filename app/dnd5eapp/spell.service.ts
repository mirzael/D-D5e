import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Spell } from './spell';

@Injectable()
export class SpellService{
	constructor(private http: Http){}
	spells : Spell[] = [];
	classes: string[] = [];
	levels: string[] = [];
	completedProcessing: boolean = false;
	

	getSpells(): Observable<Spell[]>{
		if(this.spells.length > 0){
			return Observable.fromPromise(Promise.resolve(this.spells));
		}else{
			return this.http.get('/app/spells.json')
				.map(response => this.extractData(response))
				.catch(this.handleError);
		}
	}
	
	getClasses(): Promise<string[]>{
		return new Promise<string[]>(resolve =>	
			setTimeout(resolve, 1500))
		.then(() => this.classes);
	}
	
	getLevels(): Promise<string[]>{
		return new Promise<string[]>(resolve =>	
			setTimeout(resolve, 1500))
		.then(() => this.levels);
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
			spell.ritual = jSpell.ritual.toUpperCase();
			spell.duration = jSpell.duration;
			spell.concentration = jSpell.concentration.toUpperCase();
			spell.casting_time = jSpell.casting_time;
			spell.level = jSpell.level.trim();
			spell.school = jSpell.school;
			spell.classes = jSpell.class.split(',');
			
			for(var i = spell.classes.length-1; i >= 0; i--){
				spell.classes[i] = spell.classes[i].trim();
			}
			
			this.addClasses(spell.classes);
			this.addLevels(spell.level);

			this.spells.push(spell);
		}
		
		this.completedProcessing = true;
		return this.spells;
	}

	private handleError(error: any): Promise<any>{
		  console.error('An error occurred', error); // for demo purposes only
		  return Promise.reject(error.message || error);
	}
	
	private addClasses(classes: string[]){
		for(var cls of classes){
			if(this.classes.indexOf(cls.trim()) === -1){
				this.classes.push(cls.trim());
			}
		}
	}
	
	private addLevels(level: string){
		if(this.levels.indexOf(level.trim()) === -1){
			this.levels.push(level.trim());
		}
	}
}