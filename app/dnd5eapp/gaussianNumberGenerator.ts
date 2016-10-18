import { Injectable } from '@angular/core';

@Injectable()
export class gaussianRandomNumberGenerator{
	two_pi: number = 2.0*Math.PI;
	epsilon: number = Number.MIN_VALUE;
	generate: boolean;
	z0: number;
	z1: number;

	public generateGaussianNoise(mean: number, std: number): number{
		this.generate = !this.generate;
		
		if(!this.generate)
			return this.z1 * std + mean;
		
		let u1: number;
		let u2: number;	
		
		u1 = Math.random();
		u2 = Math.random();
		
		this.z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(this.two_pi * u2);
		this.z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(this.two_pi * u2);
		
		console.log(this.z0 * std + mean);
		console.log(this.z1 * std + mean);

		return this.z0 * std + mean;
	}
}