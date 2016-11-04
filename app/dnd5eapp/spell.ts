export class Spell {
	name: string;
	description: string;
	range: string;
	components: string;
	material: string;
	ritual: boolean;
	duration: string;
	concentration: string;
	casting_time: string;
	school: string;
	classes: string[] = [];
	level: string;
}