import { useState, useMemo, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Grid3x3, List, ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';
import { useProducts } from '@/hooks/useProducts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useQuery } from '@tanstack/react-query';
import { API } from '@/strapi';
export default function CategoryProducts() {
  const {
    categorySlug
  } = useParams<{
    categorySlug: string;
  }>();
  const navigate = useNavigate();
  const {
    language
  } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch category data from Strapi
  const {
    data: categoryData,
    isLoading: categoryLoading
  } = useQuery({
    queryKey: ['category', categorySlug],
    queryFn: async () => {
      try {
        const url = new URL('/api/categories', API);
        url.searchParams.set('filters[slug][$eq]', categorySlug || '');
        url.searchParams.set('populate', '*');
        const res = await fetch(url.toString());
        if (!res.ok) return null;
        const json = await res.json();
        const item = json?.data?.[0];
        if (!item) return null;
        const attrs = item.attributes || item;
        return {
          id: item.id,
          documentId: item.documentId,
          slug: attrs.slug,
          name: attrs.nameFa || attrs.name,
          nameEn: attrs.nameEn || attrs.name,
          description: attrs.descriptionFa || attrs.description,
          descriptionEn: attrs.descriptionEn || attrs.description,
          seoTitle: attrs.seoTitleFa || attrs.seoTitle,
          seoTitleEn: attrs.seoTitleEn || attrs.seoTitle,
          seoDescription: attrs.seoDescriptionFa || attrs.seoDescription,
          seoDescriptionEn: attrs.seoDescriptionEn || attrs.seoDescription,
          content: attrs.contentFa || attrs.content,
          contentEn: attrs.contentEn || attrs.content
        };
      } catch (err) {
        console.error('Error fetching category:', err);
        return null;
      }
    },
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 5
  });

  // Fallback to local categories if Strapi fails
  const localCategory = categories.find(c => c.id === categorySlug);
  const category = categoryData || (localCategory ? {
    slug: localCategory.id,
    name: localCategory.name,
    nameEn: localCategory.nameEn,
    description: getCategoryDescription(localCategory.id, 'fa'),
    descriptionEn: getCategoryDescription(localCategory.id, 'en'),
    seoTitle: `${localCategory.name} | پتروپالایش کو`,
    seoTitleEn: `${localCategory.nameEn} | PetroPalayesh Co.`,
    seoDescription: getCategoryDescription(localCategory.id, 'fa'),
    seoDescriptionEn: getCategoryDescription(localCategory.id, 'en'),
    content: '',
    contentEn: ''
  } : null);

  // Fetch products for this category
  const {
    data: productList,
    isLoading,
    error,
    isUsingFallback
  } = useProducts(categorySlug || '', '');
  const safeProductList = Array.isArray(productList) ? productList : [];
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return safeProductList;
    return safeProductList.filter(product => {
      const matchesSearch = (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (product.nameEn || '').toLowerCase().includes(searchQuery.toLowerCase()) || (product.description || '').toLowerCase().includes(searchQuery.toLowerCase()) || (product.descriptionEn || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [safeProductList, searchQuery]);
  if (!category && !categoryLoading) {
    navigate('/products');
    return null;
  }
  const title = language === 'fa' ? category?.seoTitle || category?.name : category?.seoTitleEn || category?.nameEn;
  const description = language === 'fa' ? category?.seoDescription || category?.description : category?.seoDescriptionEn || category?.descriptionEn;
  const categoryName = language === 'fa' ? category?.name : category?.nameEn;
  const categoryDesc = language === 'fa' ? category?.description : category?.descriptionEn;
  return <div className="min-h-screen bg-background" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{title || 'Products'}</title>
        <meta name="description" content={description || ''} />
        <link rel="canonical" href={`https://petropalayeshco.ir/products/${categorySlug}`} />
        <meta property="og:title" content={title || ''} />
        <meta property="og:description" content={description || ''} />
        <meta property="og:url" content={`https://petropalayeshco.ir/products/${categorySlug}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <section className="py-4 border-b bg-card">
          <div className="container-wide">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">{language === 'fa' ? 'خانه' : 'Home'}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/products">{language === 'fa' ? 'محصولات' : 'Products'}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{categoryName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Category Hero */}
        <section className="py-12 lg:py-16 bg-gradient-subtle border-b">
          <div className="container-wide">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="sm" onClick={() => navigate('/products')} className="gap-2">
                {language === 'fa' ? <>
                    <ArrowRight className="w-4 h-4" />
                    بازگشت
                  </> : <>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </>}
              </Button>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              {categoryName}
            </h1>
            
            {categoryDesc && <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p>{categoryDesc}</p>
              </div>}
            
            {category?.content && language === 'fa' && <div className="mt-6 prose prose-lg max-w-none" dangerouslySetInnerHTML={{
            __html: category.content
          }} />}
            {category?.contentEn && language === 'en' && <div className="mt-6 prose prose-lg max-w-none" dangerouslySetInnerHTML={{
            __html: category.contentEn
          }} />}
          </div>
        </section>

        {/* Filter and Search */}
        <section className="py-6 border-b bg-card">
          <div className="container-wide space-y-4">
            {isUsingFallback}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground", language === 'fa' ? 'right-3' : 'left-3')} />
                <Input placeholder={language === 'fa' ? 'جستجوی محصولات...' : 'Search products...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={cn("w-full", language === 'fa' ? 'pr-10' : 'pl-10')} />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {language === 'fa' ? 'نمایش:' : 'View:'}
                </span>
                <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')} className="gap-2">
                  <Grid3x3 className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'fa' ? 'شبکه‌ای' : 'Grid'}</span>
                </Button>
                <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')} className="gap-2">
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'fa' ? 'لیستی' : 'List'}</span>
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {isLoading ? language === 'fa' ? 'در حال بارگذاری...' : 'Loading...' : <>
                  {filteredProducts.length} {language === 'fa' ? 'محصول یافت شد' : 'products found'}
                </>}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-wide">
            {isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg mb-4" />
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>)}
              </div> : filteredProducts.length === 0 ? <div className="text-center py-16">
                <p className="text-muted-foreground">
                  {language === 'fa' ? 'محصولی یافت نشد' : 'No products found'}
                </p>
              </div> : <div className={cn(viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4')}>
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} viewMode={viewMode} />)}
              </div>}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
}

// Helper function for fallback category descriptions
function getCategoryDescription(categoryId: string, lang: 'fa' | 'en'): string {
  const descriptions: Record<string, {
    fa: string;
    en: string;
  }> = {
    analytical: {
      fa: 'دستگاه‌های آنالیز دستگاهی شامل طیف وسیعی از تجهیزات اسپکتروسکوپی (FTIR، UV-Vis)، کروماتوگرافی (GC، HPLC)، آنالیز سطح (BET)، آنالیز حرارتی (DSC، TGA) و اندازه‌گیری سایز ذرات نانو می‌باشند. این دستگاه‌ها برای شناسایی ترکیبات شیمیایی، تعیین خلوص، آنالیز کیفی و کمی نمونه‌های نفتی، پتروشیمیایی و پلیمری استفاده می‌شوند.',
      en: 'Analytical instruments include a wide range of spectroscopy equipment (FTIR, UV-Vis), chromatography (GC, HPLC), surface analysis (BET), thermal analysis (DSC, TGA) and particle size measurement. These instruments are used for chemical compound identification, purity determination, qualitative and quantitative analysis of petroleum, petrochemical and polymer samples.'
    },
    precision: {
      fa: 'ابزار دقیق شامل فلومترهای جرمی کوریولیس، کنترل‌کننده‌های جریان، دتکتورهای گاز چند منظوره، ژنراتورهای گاز آزمایشگاهی و پمپ‌های تزریق شیمیایی هستند. این تجهیزات برای اندازه‌گیری دقیق جریان مایعات و گازها، کنترل فرآیند، ایمنی محیط کار و تزریق دقیق مواد شیمیایی در آزمایشگاه‌ها و واحدهای صنعتی استفاده می‌شوند.',
      en: 'Precision instruments include Coriolis mass flow meters, flow controllers, multi-purpose gas detectors, laboratory gas generators and chemical injection pumps. These equipment are used for accurate measurement of liquid and gas flow, process control, workplace safety and precise chemical injection in laboratories and industrial units.'
    },
    'sample-prep': {
      fa: 'تجهیزات آماده‌سازی نمونه شامل هموژنایزرهای فشار بالا، شیکرهای آزمایشگاهی و سانتریفیوژهای تخصصی می‌باشند. این دستگاه‌ها برای همگن‌سازی نمونه‌های نفتی، امولسیون‌سازی، استخراج، جداسازی فازها و آماده‌سازی نمونه قبل از آنالیز‌های تخصصی ضروری هستند.',
      en: 'Sample preparation equipment includes high-pressure homogenizers, laboratory shakers and specialized centrifuges. These devices are essential for homogenizing petroleum samples, emulsification, extraction, phase separation and sample preparation before specialized analyses.'
    },
    petroleum: {
      fa: 'تجهیزات تست ویژه نفت و گاز شامل دستگاه‌های تست ویسکوزیته سینماتیک، چگالی‌سنج، تعیین نقطه ریزش و ابری، بمب کالریمتر، آنالیزگر باقیمانده کربن و تست محتوای نمک در نفت خام می‌باشند. این آزمون‌ها مطابق با استانداردهای ASTM برای کنترل کیفیت فرآورده‌های نفتی، سوخت‌ها و روانکارها الزامی هستند.',
      en: 'Petroleum testing equipment includes kinematic viscosity testers, densitometers, pour and cloud point testers, bomb calorimeters, carbon residue analyzers and salt content testers in crude oil. These tests are mandatory according to ASTM standards for quality control of petroleum products, fuels and lubricants.'
    }
  };
  return descriptions[categoryId]?.[lang] || '';
}