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
	
	private extractData(resp: Response){
		console.log(resp);
		var data = resp.json();
		console.log(data);
		let spell: Spell = new Spell;
	}

	private handleError(error: any): Promise<any>{
		  console.error('An error occurred', error); // for demo purposes only
		  return Promise.reject(error.message || error);
	}
}