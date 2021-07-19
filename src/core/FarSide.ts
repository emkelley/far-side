export function GameInstance(name: String, level: Number = 1) {
  this.name = name;
  this.level = level;
}

GameInstance.prototype.greet = function () {
  return `${this.name} says hello.`;
};

export const GameItem = class {
  constructor(
    id: String,
    name: String,
    displayName: String,
    description: String,
    type: String,
    core: Boolean,
    defaultCap: Number,
    traderValue: Number,
    craftable: Boolean,
    craftingCost: Object
  ) {
    this.id = id;
    this.name = name;
    this.displayName = displayName;
    this.type = type;
    this.core = core;
    this.defaultCap = defaultCap;
    this.description = description;
    this.traderValue = traderValue;
    this.craftable = craftable;
    this.craftingCost = craftingCost;
  }
  getDetails() {
    console.log('getDetails');
    return `${this.name} - ${this.description}`;
  }
};
