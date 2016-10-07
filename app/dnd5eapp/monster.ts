export class Monster {
	ID: number;
	Name: string;
	Size: string;
	Type: string;
	Align: string;
	AC: number;
	HP: string;
	Speed: string;
	Strength: number;
	Dexterity: number;
	Constitution: number;
	Intelligence: number;
	Wisdom: number;
	Charisma: number;
	Saves: string[] = [];
	Bonuses: string[] = [];
	Perception: number;
	Senses: string[] = [];
	Languages: string[] = [];
	Immunities: string[] = [];
	Resistances: string[] = [];
	Vulnerabilities: string[] = [];
	CR: number;
	Traits: MonsterProperty[] = [];
	Actions: MonsterProperty[] = [];
	Legendaries: MonsterProperty[] = [];
	Reactions: MonsterProperty[] = []
	Description: string;
	Spells: string[] = [];
}

export class MonsterProperty {
	Name: string;
	Description: string[] = [];
	Attacks: Attack[] = [];
}

export class Attack {
	Name: string;
	ToHitBonus: number;
	Damage: string;
}