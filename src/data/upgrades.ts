import { UpgradeItem } from "@/types/Item";

const upgrades: UpgradeItem[] = [
  {
    name: "Stone Furnace",
    id: 30001,
    machine_name: "furnace_stone",
    description:
      "A basic furnace made of stone and wood and used to smelt ores.",
    image: "https://i.imgur.com/1ZQ3w9q.png",
    icon: "game-icons:furnace",
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
];

export default upgrades;
