export class PagedList<T> extends Array<T> {
	private filteredArray: T[] = [];
	private currentPage: number = 1;
	private elementsPerPage: number = 10;
	
	constructor(){
		super()
	}
	
	public push(...items: T[]): number{	
		this.filteredArray.push(...items);
		return super.push(...items);
	}
	
	public applyFilter(filterFunc: (a: T) => boolean){
		this.filteredArray = super.filter(filterFunc);
		this.currentPage = 1;
	}
	
	public getElements(): T[]{
		return this.filteredArray.slice(this.elementsPerPage * (this.currentPage-1), Math.min(this.elementsPerPage * this.currentPage, this.filteredArray.length));
	}
	
	public setPage(pageNum: number): void {
		if(pageNum >= 1 && pageNum <= this.getMaxPages()) {
			this.currentPage = pageNum;
		}
	}
	
	public getMaxPages(): number {
		return Math.ceil(this.filteredArray.length / this.elementsPerPage);
	}
	
	public getCurrentPage(): number {
		return this.currentPage;
	}
	
	public getPageNumbers(): number[]{
		let maxPages: number = this.getMaxPages();
		let numbers: number[] = [];
		let i = 0;
		
		while(i < maxPages){
			numbers.push(++i);
		}
		
		return numbers;
	}
}