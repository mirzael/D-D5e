import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Monster } from './monster';


@Injectable()
export class MonsterService{
	constructor(private http: Http){}
	monsters : Monster[] = [];

	getMonsters(): Observable<Monster[]>{
		if(this.monsters.length > 0){
			return Observable.fromPromise(Promise.resolve(this.monsters));
		}else{
			return this.http.get('/app/5e-monsters.csv')
				.map(response => this.extractData(response))
				.catch(this.handleError);
		}
	}

	private extractData(res: Response): Monster[]{
		console.log(res);
		let body = res.text()
		var allTextLines = body.split(/\r\n|\n/);
		var lines = [];

		for( var i = 1; i < allTextLines.length; i++){
			var data = allTextLines[i].split(/,(?=([^\"]*\"[^\"]*\")*[^\"]*$)/);
			console.log(data);

			for(var j = 0; j < data.length; j++){
				if(data[j] === undefined){
					data.splice(j, 1);
				}
			}

			if(data.length >= 8){
				let monster = new Monster;
				//Monster,CR,Type,Subtype,Size,Align,Legendary?,Lair?
				monster.Name = data[0].replace(/"/g, "");
				if(data[1].indexOf('/') > 0){
					monster.CR = eval(data[1]);	
				}else{
					monster.CR = parseInt(data[1]);
				}
				
				monster.Type = data[2];
				monster.SubType = data[3];
				monster.Size = data[4];
				monster.Align = data[5];
				monster.Legendary = data[6] === 'Y';
				monster.Lair = data[7].indexOf('Y') !== -1;
				console.log(monster);
				this.monsters.push(monster);
			}
		}
		
		return this.monsters;
	}

	private handleError(error: any): Promise<any>{
		  console.error('An error occurred', error); // for demo purposes only
		  return Promise.reject(error.message || error);
	}
}