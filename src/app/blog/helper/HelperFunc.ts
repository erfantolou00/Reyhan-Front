import { Category } from "@/types";
import COLOR_MAP from "../constant";

const getCategory = (
  categories: Category[],
  categoryId?: number | null
) => {
  if (categoryId == null) return undefined;
  return categories?.find((c) => c.id === categoryId);
};

const getCategoryName = (
  categories: Category[],
  categoryId?: number | null
) => {
  return getCategory(categories, categoryId)?.name || "دسته‌بندی نشده";
};

const getColorClasses = (
  categories: Category[],
  categoryId?: number | null
) => {
  const category = getCategory(categories, categoryId);
  const color = category?.color || "primary";
  return COLOR_MAP[color] || COLOR_MAP.primary;
};

export { getCategory, getCategoryName, getColorClasses };