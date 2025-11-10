import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight, ArrowLeft, Package, Award, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';
import { useProducts } from '@/hooks/useProducts';

export default function Products() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all products for search
  const { data: productList, isLoading } = useProducts('', '');
  const safeProductList = Array.isArray(productList) ? productList : [];

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return [];
    
    return safeProductList.filter((product) => {
      const matchesSearch =
        (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.nameEn || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.descriptionEn || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [safeProductList, searchQuery]);

  return (
    <div className="min-h-screen bg-background" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{language === 'fa' ? 'محصولات آزمایشگاهی | پتروپالایش کو' : 'Laboratory Products | PetroPalayesh Co.'}</title>
        <meta name="description" content={language === 'fa' 
          ? 'تجهیزات آزمایشگاهی تخصصی برای صنایع نفت، گاز و پتروشیمی. FTIR، کروماتوگرافی، فلومتر و ابزار دقیق با استانداردهای بین‌المللی'
          : 'Specialized laboratory equipment for oil, gas and petrochemical industries. FTIR, chromatography, flow meters and precision instruments with international standards'} />
        <link rel="canonical" href="https://petropalayeshco.ir/products" />
        <meta property="og:title" content={language === 'fa' ? 'محصولات آزمایشگاهی | پتروپالایش کو' : 'Laboratory Products | PetroPalayesh Co.'} />
        <meta property="og:url" content="https://petropalayeshco.ir/products" />
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
                  <BreadcrumbPage>{language === 'fa' ? 'محصولات' : 'Products'}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-subtle border-b">
          <div className="container-wide">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              {language === 'fa' ? 'دسته‌بندی محصولات' : 'Product Categories'}
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
              {language === 'fa' 
                ? 'پتروپالایش کو با بیش از ۱۰ سال تجربه در تامین تجهیزات آزمایشگاهی تخصصی، طیف کاملی از دستگاه‌های آنالیز دستگاهی، ابزار دقیق اندازه‌گیری و تجهیزات آماده‌سازی نمونه را برای صنایع نفت، گاز و پتروشیمی ارائه می‌دهد. تمامی محصولات ما دارای استانداردهای بین‌المللی ASTM، ISO و API می‌باشند.'
                : 'PetroPalayesh Co. with over 10 years of experience in supplying specialized laboratory equipment, offers a complete range of analytical instruments, precision measuring tools and sample preparation equipment for oil, gas and petrochemical industries. All our products comply with international standards including ASTM, ISO and API.'}
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-6 border-b bg-card">
          <div className="container-wide">
            <div className="relative max-w-2xl mx-auto">
              <Search className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground", language === 'fa' ? 'right-3' : 'left-3')} />
              <Input
                placeholder={language === 'fa' ? 'جستجوی محصولات...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("w-full text-lg py-6", language === 'fa' ? 'pr-10' : 'pl-10')}
              />
            </div>
            {searchQuery && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {isLoading ? (
                  language === 'fa' ? 'در حال جستجو...' : 'Searching...'
                ) : (
                  <>
                    {filteredProducts.length} {language === 'fa' ? 'محصول یافت شد' : 'products found'}
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Search Results or Category Cards */}
        <section className="section-padding">
          <div className="container-wide">
            {searchQuery && filteredProducts.length > 0 ? (
              // Search Results
              <>
                <h2 className="text-2xl font-bold mb-8">
                  {language === 'fa' ? 'نتایج جستجو' : 'Search Results'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode="grid"
                    />
                  ))}
                </div>
              </>
            ) : searchQuery && filteredProducts.length === 0 && !isLoading ? (
              // No Results
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {language === 'fa' ? 'محصولی یافت نشد' : 'No products found'}
                </p>
              </div>
            ) : (
              // Category Cards - Premium Industrial Design
              <>
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-center">
                  {language === 'fa' ? 'دسته‌بندی محصولات' : 'Browse by Category'}
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  {language === 'fa' 
                    ? 'تجهیزات آزمایشگاهی تخصصی با استانداردهای بین‌المللی برای صنایع نفت، گاز و پتروشیمی'
                    : 'Specialized laboratory equipment with international standards for oil, gas and petrochemical industries'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products/category/${category.id}`}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-card shadow-elegant hover:shadow-elegant-xl transition-all duration-500 h-full flex flex-col">
                        {/* Blueprint Grid Pattern Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id={`grid-${category.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#grid-${category.id})`} />
                          </svg>
                        </div>

                        {/* Image Container with Gradient Overlay */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img 
                            src={getCategoryImage(category.id)} 
                            alt={`${language === 'fa' ? category.name : category.nameEn} - Laboratory Equipment`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-white">
                          {/* Icon */}
                          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-blue-orange flex items-center justify-center mb-4 shadow-glow-accent group-hover:scale-110 transition-transform duration-300">
                            <span className="text-3xl lg:text-4xl">
                              {category.id === 'analytical' && '🔬'}
                              {category.id === 'precision' && '⚙️'}
                              {category.id === 'sample-prep' && '🧪'}
                              {category.id === 'petroleum' && '🛢️'}
                            </span>
                          </div>

                          <h3 className="text-xl lg:text-2xl font-bold mb-2 line-clamp-1 group-hover:text-primary-glow transition-colors">
                            {language === 'fa' ? category.name : category.nameEn}
                          </h3>
                          
                          <p className="text-sm opacity-90 mb-4 line-clamp-2 leading-relaxed">
                            {language === 'fa' ? getCategoryShortDesc(category.id, 'fa') : getCategoryShortDesc(category.id, 'en')}
                          </p>

                          {/* Stats */}
                          <div className="flex flex-wrap gap-3 lg:gap-4 text-xs mb-4 opacity-90">
                            <span className="flex items-center gap-1.5">
                              <Package className="w-3.5 h-3.5" />
                              {getCategoryProductCount(category.id)} {language === 'fa' ? 'محصول' : 'Products'}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5" />
                              {language === 'fa' ? 'استاندارد بین‌المللی' : 'ASTM/ISO'}
                            </span>
                          </div>

                          {/* CTA Button */}
                          <div className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-primary-foreground px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-medium text-sm lg:text-base shadow-elegant group-hover:shadow-glow group-hover:gap-3 transition-all duration-300">
                            <span>{language === 'fa' ? 'مشاهده محصولات' : 'Explore Category'}</span>
                            {language === 'fa' ? (
                              <ArrowLeft className="w-4 h-4" />
                            ) : (
                              <ArrowRight className="w-4 h-4" />
                            )}
                          </div>
                        </div>

                        {/* Premium Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-blue-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 pt-12 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
                    <div className="space-y-2">
                      <div className="text-3xl lg:text-4xl font-bold text-primary">10+</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'fa' ? 'سال تجربه' : 'Years Experience'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl lg:text-4xl font-bold text-primary">500+</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'fa' ? 'محصول تخصصی' : 'Specialized Products'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl lg:text-4xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'fa' ? 'استاندارد بین‌المللی' : 'International Standards'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl lg:text-4xl font-bold text-primary">24/7</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'fa' ? 'پشتیبانی فنی' : 'Technical Support'}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Helper function for category short descriptions
function getCategoryShortDesc(categoryId: string, lang: 'fa' | 'en'): string {
  const descriptions: Record<string, { fa: string; en: string }> = {
    analytical: {
      fa: 'دستگاه‌های اسپکتروسکوپی، کروماتوگرافی، آنالیز سطح و حرارتی برای آنالیز دقیق نمونه‌های نفتی و پتروشیمیایی',
      en: 'Spectroscopy, chromatography, surface and thermal analysis instruments for precise petroleum and petrochemical sample analysis'
    },
    precision: {
      fa: 'فلومترهای جرمی، دتکتورهای گاز، کنترل‌کننده‌های جریان و تجهیزات اندازه‌گیری دقیق صنعتی',
      en: 'Mass flow meters, gas detectors, flow controllers and precision industrial measurement equipment'
    },
    'sample-prep': {
      fa: 'هموژنایزرها، سانتریفیوژها و شیکرهای آزمایشگاهی برای آماده‌سازی حرفه‌ای نمونه‌ها',
      en: 'Homogenizers, centrifuges and laboratory shakers for professional sample preparation'
    },
    petroleum: {
      fa: 'تجهیزات تست تخصصی نفت و گاز شامل ویسکومتر، کالریمتر، آنالیزگر CCR و تست نمک',
      en: 'Specialized petroleum testing equipment including viscometers, calorimeters, CCR analyzers and salt testers'
    }
  };

  return descriptions[categoryId]?.[lang] || '';
}

// Helper function for category images
function getCategoryImage(categoryId: string): string {
  const images: Record<string, string> = {
    'analytical': '/analytical-equipment.jpg',
    'precision': '/precision-instruments.jpg',
    'sample-prep': '/sample-prep-professional.jpg',
    'petroleum': '/petroleum-equipment.jpg'
  };
  return images[categoryId] || '/placeholder.svg';
}

// Helper function for product counts
function getCategoryProductCount(categoryId: string): number {
  const counts: Record<string, number> = {
    'analytical': 5,
    'precision': 3,
    'sample-prep': 2,
    'petroleum': 4
  };
  return counts[categoryId] || 0;
}
