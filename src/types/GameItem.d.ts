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

export interface RecipeEntity {
  id: number;
  quantity: number;
}