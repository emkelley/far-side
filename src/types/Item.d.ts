export interface GameItem {
  id: number;
  name: string;
  machine_name: string;
  description: string;
  image: string;
  icon: string;
  efficiency?: number | null;
  required_bench_id?: number | null;
  recipe?: RecipeEntity[] | null;
}
export interface InventoryItem extends GameItem {
  quantity: number;
}
export interface UpgradeItem extends GameItem {
  recipe: RecipeEntity[];
}
export interface RecipeEntity {
  id: number;
  quantity: number;
}
