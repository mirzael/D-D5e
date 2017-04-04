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
	Reactions: MonsterProperty[] = [];
	Description: string;
	Spells: string[] = [];
	
	public generateHP(){
		let generateString: string = this.HP.split("(")[1].replace(")","");
		//7d6+5 (example HP string)
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
		console.log("MY HP: " + this.CurrentHP);
	}
	
	public copy(): Monster{
		let copy = new Monster();
		
		copy.ID = this.ID;
		copy.Name = this.Name;
		copy.Size = this.Size;
		copy.Type = this.Type;
		copy.Align = this.Align;
		copy.AC = this.AC;
		copy.HP = this.HP;
		copy.Speed = this.Speed;
		copy.Strength = this.Strength;
		copy.Dexterity = this.Dexterity;
		copy.Constitution = this.Constitution;
		copy.Intelligence = this.Intelligence;
		copy.Wisdom = this.Wisdom;
		copy.Charisma = this.Charisma;
		copy.Saves = this.Saves;
		copy.Bonuses = this.Bonuses;
		copy.Perception = this.Perception;
		copy.Senses = this.Senses;
		copy.Languages = this.Languages;
		copy.Immunities = this.Immunities;
		copy.Resistances = this.Resistances;
		copy.Vulnerabilities = this.Vulnerabilities;
		copy.CR = this.CR;
		copy.Traits = this.Traits;
		copy.Actions = this.Actions;
		copy.Legendaries = this.Legendaries;
		copy.Reactions = this.Reactions;
		copy.Description = this.Description;
		copy.Spells = this.Spells;
		
		return copy;
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