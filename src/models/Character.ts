interface Ability {
  modifier: number;
  score: number;
  autoCalc: boolean;
}

interface Abilities {
  strength: Ability;
  dexterity: Ability;
  constitution: Ability;
  intelligence: Ability;
  wisdom: Ability;
  charisma: Ability;
}

interface SavingThrow {
  bonus: number;
  proficient: boolean;
}

interface SavingThrows {
  strength: SavingThrow;
  dexterity: SavingThrow;
  constitution: SavingThrow;
  intelligence: SavingThrow;
  wisdom: SavingThrow;
  charisma: SavingThrow;
}

interface Health {
  current: number;
  max: number;
}

interface Skill {
  bonus: number;
  attribute: string;
  proficient: boolean;
  expertise: boolean;
}

interface Skills {
  autoCalc: boolean;
  athletics: Skill;
  acrobatics: Skill;
  sleightOfHand: Skill;
  stealth: Skill;
  arcana: Skill;
  history: Skill;
  investigation: Skill;
  nature: Skill;
  religion: Skill;
  animalHandling: Skill;
  insight: Skill;
  medicine: Skill;
  perception: Skill;
  survival: Skill;
  deception: Skill;
  intimidation: Skill;
  performance: Skill;
  persuasion: Skill;
}

export class Character {
  name: string;
  class: string;
  race: string;
  health: Health;
  armorClass: number;
  abilities: Abilities;
  level: number;
  proficiencyBonus: number;
  savingThrows: SavingThrows;
  skills: Skills;
  initiative: number;

  constructor(name: string) {
    this.name = name;
    this.class = "";
    this.race = "";
    this.health = { current: 10, max: 10 };
    this.armorClass = 10;
    this.level = 1;
    this.abilities = {
      strength: { modifier: 0, score: 10, autoCalc: true },
      dexterity: { modifier: 0, score: 10, autoCalc: true },
      constitution: { modifier: 0, score: 10, autoCalc: true },
      intelligence: { modifier: 0, score: 10, autoCalc: true },
      wisdom: { modifier: 0, score: 10, autoCalc: true },
      charisma: { modifier: 0, score: 10, autoCalc: true },
    };
    this.proficiencyBonus = 2;
    this.savingThrows = {
      strength: { bonus: 0, proficient: false },
      dexterity: { bonus: 0, proficient: false },
      constitution: { bonus: 0, proficient: false },
      intelligence: { bonus: 0, proficient: false },
      wisdom: { bonus: 0, proficient: false },
      charisma: { bonus: 0, proficient: false },
    };
    this.skills = {
      autoCalc: true,
      athletics: {
        bonus: 0,
        attribute: "strength",
        proficient: false,
        expertise: false,
      },
      acrobatics: {
        bonus: 0,
        attribute: "dexterity",
        proficient: false,
        expertise: false,
      },
      sleightOfHand: {
        bonus: 0,
        attribute: "dexterity",
        proficient: false,
        expertise: false,
      },
      stealth: {
        bonus: 0,
        attribute: "dexterity",
        proficient: false,
        expertise: false,
      },
      arcana: {
        bonus: 0,
        attribute: "intelligence",
        proficient: false,
        expertise: false,
      },
      history: {
        bonus: 0,
        attribute: "intelligence",
        proficient: false,
        expertise: false,
      },
      investigation: {
        bonus: 0,
        attribute: "intelligence",
        proficient: false,
        expertise: false,
      },
      nature: {
        bonus: 0,
        attribute: "intelligence",
        proficient: false,
        expertise: false,
      },
      religion: {
        bonus: 0,
        attribute: "intelligence",
        proficient: false,
        expertise: false,
      },
      animalHandling: {
        bonus: 0,
        attribute: "wisdom",
        proficient: false,
        expertise: false,
      },
      insight: {
        bonus: 0,
        attribute: "wisdom",
        proficient: false,
        expertise: false,
      },
      medicine: {
        bonus: 0,
        attribute: "wisdom",
        proficient: false,
        expertise: false,
      },
      perception: {
        bonus: 0,
        attribute: "wisdom",
        proficient: false,
        expertise: false,
      },
      survival: {
        bonus: 0,
        attribute: "wisdom",
        proficient: false,
        expertise: false,
      },
      deception: {
        bonus: 0,
        attribute: "charisma",
        proficient: false,
        expertise: false,
      },
      intimidation: {
        bonus: 0,
        attribute: "charisma",
        proficient: false,
        expertise: false,
      },
      performance: {
        bonus: 0,
        attribute: "charisma",
        proficient: false,
        expertise: false,
      },
      persuasion: {
        bonus: 0,
        attribute: "charisma",
        proficient: false,
        expertise: false,
      },
    };
    this.initiative = 0;
  }

  updateModifiers() {
    Object.keys(this.abilities).forEach((key) => {
      const ability = this.abilities[key as keyof Abilities];
      if (ability.autoCalc) {
        ability.modifier = Math.floor((ability.score - 10) / 2);
      }
    });
  }

  updateProficiencyBonus() {
    this.proficiencyBonus = 2 + Math.floor((this.level - 1) / 4);
  }

  updateSavingThrows() {
    Object.keys(this.savingThrows).forEach((key) => {
      const abilityKey = key as keyof Abilities;
      const savingThrow = this.savingThrows[key as keyof SavingThrows];
      savingThrow.bonus = this.abilities[abilityKey].modifier;

      if (savingThrow.proficient) {
        savingThrow.bonus += this.proficiencyBonus;
      }
    });
  }
  updateSkills() {
    Object.keys(this.skills).forEach((key) => {
      if (key === "autoCalc") return;

      const skill = this.skills[key as keyof Omit<Skills, "autoCalc">];
      const abilityModifier =
        this.abilities[skill.attribute as keyof Abilities].modifier;

      if (this.skills.autoCalc) {
        skill.bonus = abilityModifier;
        if (skill.proficient) skill.bonus += this.proficiencyBonus;
        if (skill.expertise) skill.bonus += this.proficiencyBonus;
      }
    });
  }

  changeSkillAttribute(skill: string, attribute: string) {
    const validAttributes = [
      "strength",
      "dexterity",
      "intelligence",
      "wisdom",
      "charisma",
      "constitution",
    ];
    const selectedSkill = this.skills[skill as keyof Omit<Skills, "autoCalc">];

    if (selectedSkill && validAttributes.includes(attribute)) {
      selectedSkill.attribute = attribute;
      if (this.skills.autoCalc) {
        this.updateSkills();
      }
    }
  }
}
