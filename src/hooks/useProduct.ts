// src/hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/strapi';

export const useProduct = (slug?: string) => {
  return useQuery({
    enabled: Boolean(slug),
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug!),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
