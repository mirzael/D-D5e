export class Monster {
	ID: number;
	Name: string;
	Size: string;
	Type: string;
	Align: string;
	AC: number;
	HP: string;
	CurrentHP: number = null;
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
	
	public generateHP(){
		let generateString: string = this.HP.split("(")[1].replace(")","");
		let diceInfo: string[] = generateString.replace(/(\d+)d(\d+)([\+\-]\d+)?/, "$1,$2,$3").split(",");
		let numDice: number = +diceInfo[0];
		let dieSides: number = +diceInfo[1];
		let additionalHP: number = +diceInfo[2];
		
		let generatedHP = additionalHP;
		for(let i = 1; i <= numDice; i++){
			generatedHP += Math.floor(Math.random() * dieSides) + 1;
		}
		
		//Monster needs at least 1 HP
		this.CurrentHP = Math.max(generatedHP,1);
	}
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