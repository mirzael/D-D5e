export class Monster {
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
	Saves: string[];
	Bonuses: string[];
	Perception: number;
	Languages: string[];
	Immunities: string[];
	CR: number;
	Traits: MonsterProperty[];
	Actions: MonsterProperty[];
	Legendary: MonsterProperty[];
	Description: string;
	Spells: string[];
}

export class MonsterProperty {
	Name: string;
	Description: string;
	Attack: Attack;
}

export class Attack {
	Name: string;
	ToHitBonus: number;
	Damage: string;
}