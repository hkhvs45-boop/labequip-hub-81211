// src/strapi.ts - Compatible with Strapi v5
import { Product } from '@/data/products';

export const API = import.meta.env.VITE_STRAPI_URL ?? 'https://api.khavasmelk.ir';
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

const normalizeItem = (item: any) => {
  // Compatible with v4 and v5
  const a = item?.attributes ?? item ?? {};
  return { id: item?.id ?? a?.id, documentId: item?.documentId ?? a?.documentId, ...a };
};

type StrapiImage = { url?: string; formats?: any } | null | undefined;
type StrapiRel = { 
  name?: string; 
  nameEn?: string;
  nameFa?: string;
  slug?: string;
  documentId?: string;
} | null | undefined;

function absUrl(u?: string) {
  if (!u) return '';
  try { 
    // If URL is already absolute, return it
    if (u.startsWith('http://') || u.startsWith('https://')) return u;
    return new URL(u, API).toString(); 
  } catch { 
    return u; 
  }
}

export async function fetchProducts(params: Record<string, string> = {}) {
  const url = new URL('/api/products', API);
  url.searchParams.set('populate', 'image,category,subcategory');
  
  if (!url.searchParams.has('pagination[pageSize]')) {
    url.searchParams.set('pagination[pageSize]', '100');
  }
  
  Object.entries(params).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });

  try {
    const headers: HeadersInit = { 
      'Accept': 'application/json',
    };
    
    if (TOKEN) {
      headers['Authorization'] = `Bearer ${TOKEN}`;
    }
    
    const res = await fetch(url.toString(), { 
      headers,
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      console.error(`Strapi fetch error: HTTP ${res.status} ${res.statusText}`);
      if (res.status === 403) {
        console.error('403 Forbidden: Check Strapi permissions or add VITE_STRAPI_TOKEN');
      }
      return [];
    }

    const json = await res.json().catch(() => ({}));
    const raw = Array.isArray(json?.data) ? json.data : (json?.data ? [json.data] : []);
    const normalized = raw.map(normalizeItem);

    return normalized.map((p: any): Product => {
      const img: StrapiImage = p?.image;
      const cat: StrapiRel = p?.category;
      const sub: StrapiRel = p?.subcategory;
      
      const imgUrl =
        img?.formats?.medium?.url ||
        img?.formats?.small?.url ||
        img?.url ||
        '';

      return {
        id: p?.slug || p?.documentId || String(p?.id) || '',
        name: p?.nameFa || p?.title || p?.name || '',
        nameEn: p?.nameEn || p?.titleEn || p?.name || '',
        category: cat?.nameFa || cat?.name || '',
        categoryEn: cat?.nameEn || cat?.name || '',
        subcategory: sub?.nameFa || sub?.name || '',
        subcategoryEn: sub?.nameEn || sub?.name || '',
        image: absUrl(imgUrl),
        description: p?.descriptionFa || p?.description || '',
        descriptionEn: p?.descriptionEn || p?.description || '',
        specs: p?.specs || {},
        standards: Array.isArray(p?.standards) ? p.standards : [],
        applications: Array.isArray(p?.applicationsFa) ? p.applicationsFa : (Array.isArray(p?.applications) ? p.applications : []),
        applicationsEn: Array.isArray(p?.applicationsEn) ? p.applicationsEn : (Array.isArray(p?.applications) ? p.applications : []),
        price: p?.price,
        inStock: p?.inStock ?? true,
      };
    });
  } catch (err) {
    console.error('Strapi fetch error:', err);
    return [];
  }
}

export async function fetchProductsBySlug(categorySlug = '', subcategorySlug = '') {
  const params: Record<string, string> = {};
  if (categorySlug && categorySlug !== 'all') {
    params['filters[category][slug][$eq]'] = categorySlug;
  }
  if (subcategorySlug && subcategorySlug !== 'all') {
    params['filters[subcategory][slug][$eq]'] = subcategorySlug;
  }
  return fetchProducts(params);
}

export async function fetchProduct(slug: string) {
  const items = await fetchProducts({ 
    'filters[slug][$eq]': slug, 
    'pagination[pageSize]': '1' 
  });
  return items[0] || null;
}

export interface RFQSubmission {
  company?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  items: Array<{
    product: string;
    qty: number;
    note?: string;
  }>;
}

export const postRFQ = async (data: RFQSubmission): Promise<void> => {
  const url = new URL('/api/rfqs', API);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
  if (TOKEN) {
    headers['Authorization'] = `Bearer ${TOKEN}`;
  }
  
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: {
        ...data,
        status: 'new',
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit RFQ: ${res.status} ${res.statusText}`);
  }
};
