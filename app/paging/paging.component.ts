import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PagedList } from './pagingList';
import { SimplePageScroll } from 'ng2-simple-page-scroll';

@Component ({
	selector: 'paging',
	moduleId: module.id,
	templateUrl: "paging.component.html",
})

export class PagingComponent implements OnInit, OnChanges {
	constructor(){}
	@Input() pagedList: PagedList<any>;
	
	ngOnInit(): void{
		console.log(this.pagedList);
	}
		
	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}
	
	public getCurrentPage(): number{
		return +this.pagedList.getCurrentPage();
	}
}