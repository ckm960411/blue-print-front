export interface SectionCategory {
  title: string;
  page_id: string;
  url: string;
}

export interface CategorySection {
  id: number;
  name: string;
  categories: SectionCategory[];
}
