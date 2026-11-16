export interface SpecItem {
  label: string;
  value: string;
}

export interface SubCategoryDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  specs?: SpecItem[];
  color?: string;
  badge?: string;
}

export interface SectorItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  heroCopy: string;
  overview: string;
  stats: { label: string; value: string }[];
  applications: string[];
  icon: string;
  subCategories: SubCategoryDetail[];
  bgVideo?: string;
}
