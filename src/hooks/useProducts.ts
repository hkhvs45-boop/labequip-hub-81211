// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProductsBySlug } from "@/strapi";
import { products as localProducts } from "@/data/products";

export function useProducts(category = '', subcategory = '') {
  const q = useQuery({
    queryKey: ['products', { category, subcategory }],
    queryFn: () => fetchProductsBySlug(category, subcategory),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
  
  // Filter local products based on category/subcategory
  const getFilteredLocalProducts = () => {
    let filtered = localProducts;
    
    if (category) {
      filtered = filtered.filter(p => {
        const cat = p.category.toLowerCase();
        return cat.includes(category.toLowerCase()) || 
               category === 'analytical' && cat.includes('آنالیز') ||
               category === 'precision' && cat.includes('ابزار دقیق') ||
               category === 'sample-prep' && cat.includes('آماده') ||
               category === 'petroleum' && cat.includes('نفت');
      });
    }
    
    if (subcategory && subcategory !== 'all') {
      filtered = filtered.filter(p => {
        const sub = (p.subcategory || '').toLowerCase();
        const subEn = (p.subcategoryEn || '').toLowerCase();
        return sub.includes(subcategory.toLowerCase()) || 
               subEn.includes(subcategory.toLowerCase());
      });
    }
    
    return filtered;
  };
  
  // Use Strapi data if available, otherwise fallback to local products
  const strapiList = Array.isArray(q.data) ? q.data : [];
  const fallbackList = getFilteredLocalProducts();
  
  // If Strapi returns data, use it; otherwise use local products as fallback
  const finalList = strapiList.length > 0 ? strapiList : fallbackList;
  
  return { 
    ...q, 
    data: finalList,
    isUsingFallback: strapiList.length === 0 && fallbackList.length > 0
  };
}
