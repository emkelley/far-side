export const gameItems = [
  {
    id: 1001,
    name: 'workbench',
    displayName: 'Workbench',
    type: 'core-tool',
    defaultCap: 1,
    description: "Let's you build basic tools.",
    traderValue: 5,
    craftable: true,
    craftingCost: {
      2002: 25,
    },
  },
  {
    id: 1002,
    name: 'forge',
    displayName: 'Metal Forge',
    type: 'core-too',
    defaultCap: 1,
    description: "Let's you build basic tools.",
    traderValue: 5,
    craftable: true,
    craftingCost: {
      2002: 25,
    },
  },
  {
    id: 1011,
    name: 'woodaxe',
    displayName: 'Wood Axe',
    type: 'tool',
    defaultCap: 1,
    description: "Does about as good as you'd expect.",
    traderValue: 5,
    effectiveness: 3,
    craftable: true,
    prerequisite: 1001,
    craftingCost: {
      2002: 5,
    },
  },
  {
    id: 2001,
    name: 'wood',
    displayName: 'Wood',
    type: 'earth-resource',
    defaultCap: 250,
    description: 'A plank of wood that magically fell from hitting a tree.',
    traderValue: 5,
    craftable: true,
    craftingCost: {},
  },
  {
    id: 2002,
    name: 'hardwood',
    displayName: 'Hardwood',
    type: 'earth-resource',
    defaultCap: 100,
    description: 'A strong, compressed piece of wood.',
    traderValue: 25,
    craftable: true,
    craftingCost: {
      2001: 15,
    },
  },
  {
    id: 4001,
    name: 'basic-worker',
    type: 'worker',
    displayName: 'Lowly Worker',
    defaultCap: 10,
    description: 'A worker that will gather wood for you - albeit slowly.',
    traderValue: 5,
    craftable: true,
    craftingCost: {
      2002: 20,
    },
  },
  {
    id: 9001,
    name: 'shed',
    type: 'storage',
    upgradeModifier: 250,
    displayName: 'Small Shed',
    defaultCap: 5,
    description: 'Increases wood storage slightly.',
    traderValue: 100,
    craftable: true,
    craftingCost: {
      2002: 250,
    },
    storage: [
      {
        id: 2001,
        amount: 250,
      },
      {
        id: 2002,
        amount: 50,
      },
    ],
  },
  {
    id: 9002,
    name: 'woodshop',
    type: 'machine',
    displayName: 'Wood Shop',
    defaultCap: 5,
    description: 'Automatically convert Wood to Hardwood.',
    traderValue: 100,
    craftable: true,
    craftingCost: {
      2002: 10,
    },
  },
];
export const getItemByID = (id) => gameItems.find((x) => x.id === id);
export const getItemByName = (name) => gameItems.find((x) => x.name === name);
