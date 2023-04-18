export const items_tools = [
  {
    id: 1,
    name: "Stone Axe",
    machine_name: "axe_stone",
    description: "A crude axe made of branches and stones.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:stone-axe",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20002,
        quantity: 3,
      },
      {
        id: 20001,
        quantity: 2,
      },
    ],
  },
  {
    id: 2,
    name: "Wooden Hammer",
    machine_name: "hammer_wooden",
    description: "A basic hammer made of wood and stone.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:3d-hammer",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20003,
        quantity: 2,
      },
      {
        id: 20001,
        quantity: 2,
      },
    ],
  },
  {
    id: 3,
    name: "Furnace",
    machine_name: "furnace",
    description: "A furnace for smelting ores and crafting advanced materials.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:furnace",
    required_bench_id: null,
    recipe: [
      {
        id: 20001,
        quantity: 10,
      },
    ],
  },
  {
    id: 4,
    name: "Drill",
    machine_name: "drill",
    description: "A powerful drill for mining ores and other materials.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:drill",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20012,
        quantity: 3,
      },
      {
        id: 20013,
        quantity: 4,
      },
      {
        id: 20014,
        quantity: 6,
      },
    ],
  },
  {
    id: 5,
    name: "Pump",
    machine_name: "pump",
    description: "A pump for gathering water and other liquid resources.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:oil-pump",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20012,
        quantity: 3,
      },
      {
        id: 20020,
        quantity: 2,
      },
    ],
  },
  {
    id: 6,
    name: "Solar Panel",
    machine_name: "solar_panel",
    description: "A solar panel for generating clean energy.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:solar-power",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20025,
        quantity: 4,
      },
      {
        id: 20020,
        quantity: 8,
      },
    ],
  },
  {
    id: 7,
    name: "Battery",
    machine_name: "battery",
    description: "A battery for storing energy.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:car-battery",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20012,
        quantity: 2,
      },
      {
        id: 20018,
        quantity: 4,
      },
      {
        id: 20020,
        quantity: 6,
      },
    ],
  },
  {
    id: 8,
    name: "Electric Generator",
    machine_name: "electric_generator",
    description: "A generator for converting fuel into electricity.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:power-generator",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20012,
        quantity: 5,
      },
      {
        id: 20020,
        quantity: 4,
      },
    ],
  },
  {
    id: 9,
    name: "Conveyor Belt",
    machine_name: "conveyor_belt",
    description: "A conveyor belt for transporting items.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "material-symbols:conveyor-belt-outline-sharp",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20012,
        quantity: 3,
      },
      {
        id: 20020,
        quantity: 2,
      },
    ],
  },
  {
    id: 10,
    name: "Robotic Arm",
    machine_name: "robotic_arm",
    description: "A robotic arm for automated crafting and resource handling.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:robot-grab",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20012,
        quantity: 4,
      },
      {
        id: 20020,
        quantity: 6,
      },
      {
        id: 20018,
        quantity: 2,
      },
    ],
  },
  {
    id: 11,
    name: "Stone Pickaxe",
    machine_name: "pickaxe_stone",
    description: "A basic pickaxe made of stone and branches.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:war-pick",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20001,
        quantity: 3,
      },
      {
        id: 20002,
        quantity: 2,
      },
    ],
  },
  {
    id: 12,
    name: "Stone Shovel",
    machine_name: "shovel_stone",
    description: "A basic shovel made of stone and branches.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "lucide:shovel",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20001,
        quantity: 2,
      },
      {
        id: 20002,
        quantity: 2,
      },
    ],
  },
  {
    id: 13,
    name: "Fishing Rod",
    machine_name: "fishing_rod",
    description: "A simple fishing rod made of wood and string.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:fishing-pole",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20002,
        quantity: 2,
      },
      {
        id: 20030,
        quantity: 1,
      },
    ],
  },
  {
    id: 14,
    name: "Scissors",
    machine_name: "scissors",
    description: "A basic tool for cutting materials.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:scissors",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20001,
        quantity: 2,
      },
    ],
  },
  {
    id: 15,
    name: "Screwdriver",
    machine_name: "screwdriver",
    description: "A basic tool for tightening and loosening screws.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:screwdriver",
    efficiency: 1,
    required_bench_id: null,
    recipe: [
      {
        id: 20001,
        quantity: 1,
      },
      {
        id: 20002,
        quantity: 1,
      },
    ],
  },
];
