export interface Category {
  id: number;
  title: string;
  thumbnail: string;
  totalPostCount: number;
}
export interface CategorySection {
  id: number;
  name: string;
  categories: Category[];
}
