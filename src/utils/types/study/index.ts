import { PageIdAndUrl } from "@/app/api/notion/pages/route";

export interface CategorySection {
  id: number;
  name: string;
  categories: PageIdAndUrl[];
}
