import { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Download, FileText, Plus, Check, ShoppingCart, Package, Award, Shield, Truck } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRFQ } from '@/contexts/RFQContext';
import { useProduct } from '@/hooks/useProduct';
import { useProducts } from '@/hooks/useProducts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';


export default function ProductDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { items, addItem } = useRFQ();
  const { data: product, isLoading, error } = useProduct(id);
  const { data: allProducts } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [allProducts, product]);

 if (!id) {
    return <Navigate to="/products" replace />;
  }

 if (!isLoading && !product) {
    return <Navigate to="/products" replace />;
   }

  const isInRFQ = product ? items.some(item => item.id === product.id) : false;

  const handleAddToRFQ = () => {
     if (!product) return;
    addItem({
      id: product.id,
      name: language === 'fa' ? product.name : product.nameEn,
      category: product.category,
      image: product.image,
    });
  };
  const localizedName = product ? (language === 'fa' ? product.name : product.nameEn) : '';
  const localizedDescription = product ? (language === 'fa' ? product.description : product.descriptionEn) : '';
  const localizedCategory = product ? (language === 'fa' ? product.category : product.categoryEn) : '';
  const localizedApplications = product ? (language === 'fa' ? product.applications : product.applicationsEn) : [];

  const productJsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": localizedName,
    "description": localizedDescription,
    "category": localizedCategory,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "PetroPalayesh Co."
    },
    "offers": {
      "@type": "Offer",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceCurrency": "IRR"
    }
  } : null;


  return (
    <div className="min-h-screen bg-background" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      {product && (
        <Helmet>
          <title>{`${localizedName} | ${language === 'fa' ? 'پتروپالایش کو' : 'PetroPalayesh Co.'}`}</title>
          <meta name="description" content={localizedDescription.substring(0, 160)} />
          <link rel="canonical" href={`https://YOURDOMAIN.com/products/${product.id}`} />
          <meta property="og:title" content={localizedName} />
          <meta property="og:description" content={localizedDescription.substring(0, 160)} />
          <meta property="og:url" content={`https://YOURDOMAIN.com/products/${product.id}`} />
          <meta property="og:image" content={product.image} />
          <meta property="og:type" content="product" />
          {productJsonLd && (
            <script type="application/ld+json">
              {JSON.stringify(productJsonLd)}
            </script>
          )}
        </Helmet>
      )}
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <section className="py-4 border-b bg-card">
          <div className="container-wide">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-smooth">
                {language === 'fa' ? 'خانه' : 'Home'}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/products" className="hover:text-foreground transition-smooth">
                {language === 'fa' ? 'محصولات' : 'Products'}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">
                {localizedName || (language === 'fa' ? '...' : '...')}
              </span>
            </nav>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-12">
          <div className="container-wide space-y-10">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>{language === 'fa' ? 'خطا در دریافت اطلاعات محصول' : 'Failed to load product from Strapi'}</AlertTitle>
                <AlertDescription>
                  {language === 'fa'
                    ? 'اطلاعات محصول از استرپی دریافت نشد. در صورت وجود داده نمونه، نمایش داده خواهد شد.'
                    : 'Product data could not be loaded from Strapi. Fallback demo data will be used when available.'}
                </AlertDescription>
              </Alert>
            )}

            {isLoading || !product ? (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Skeleton className="aspect-square rounded-2xl" />
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-lg" />
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/4" />
                  <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-32 w-full" />
                  <div className="flex gap-4">
                    <Skeleton className="h-14 flex-1" />
                    <Skeleton className="h-14 w-14" />
                  </div>
                  <Skeleton className="h-48 w-full rounded-xl" />
                </div>
              </div>
            ) : (
              <>
                {/* Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg">
                      <img 
                        src={product.image} 
                        alt={localizedName}
                        className="w-full h-full object-contain p-8 transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    {/* Thumbnail Grid - simulate multiple images */}
                    <div className="grid grid-cols-4 gap-2">
                      {[product.image, product.image, product.image, product.image].map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={cn(
                            "aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-md",
                            selectedImage === idx 
                              ? "border-primary shadow-lg scale-105" 
                              : "border-transparent hover:border-primary/50"
                          )}
                        >
                          <img src={img} className="w-full h-full object-cover" alt={`${localizedName} view ${idx + 1}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    {/* Title & Model */}
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {localizedName}
                      </h1>
                      <p className="text-lg text-muted-foreground flex items-center gap-2">
                        <span>{language === 'fa' ? 'مدل' : 'Model'}: {product.id.toUpperCase()}</span>
                        <span>•</span>
                        <span>SKU: {product.id}</span>
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 shadow-sm",
                        product.inStock 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      )}>
                        <Package className="w-3.5 h-3.5" />
                        {product.inStock 
                          ? (language === 'fa' ? 'موجود در انبار' : 'In Stock')
                          : (language === 'fa' ? 'ناموجود' : 'Out of Stock')
                        }
                      </span>
                      {product.standards.slice(0, 2).map((standard) => (
                        <span key={standard} className="px-3 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 shadow-sm">
                          <Award className="w-3.5 h-3.5" />
                          {standard}
                        </span>
                      ))}
                      <span className="px-3 py-1.5 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 shadow-sm">
                        <Shield className="w-3.5 h-3.5" />
                        {language === 'fa' ? 'گارانتی اصالت' : 'Authenticity Guarantee'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {localizedDescription}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                      <Button
                        size="lg"
                        className={cn(
                          "flex-1 w-full sm:w-auto text-lg font-semibold shadow-xl transition-all duration-300",
                          "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
                          "hover:shadow-2xl hover:scale-105"
                        )}
                        onClick={handleAddToRFQ}
                        disabled={isInRFQ}
                      >
                        {isInRFQ ? (
                          <>
                            <Check className="w-5 h-5" />
                            {language === 'fa' ? 'در استعلام موجود است' : 'Added to RFQ'}
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            {language === 'fa' ? 'درخواست قیمت' : 'Request Quote'}
                          </>
                        )}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="flex-1 w-full sm:w-auto text-lg font-semibold hover:bg-primary/5 transition-all duration-300"
                      >
                        <Download className="w-5 h-5" />
                        {language === 'fa' ? 'دانلود کاتالوگ' : 'Download'}
                      </Button>
                    </div>

                    {/* Quick Specs Grid */}
                    {Object.keys(product.specs).length > 0 && (
                      <div className="grid grid-cols-2 gap-4 p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border shadow-sm">
                        {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <p className="text-sm text-muted-foreground font-medium">{key}</p>
                            <p className="font-bold text-lg">{String(value)}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Truck className="w-5 h-5 text-primary" />
                        <span className="font-medium">{language === 'fa' ? 'ارسال سریع' : 'Fast Shipping'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="font-medium">{language === 'fa' ? 'پشتیبانی فنی' : 'Technical Support'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-medium">{language === 'fa' ? 'کیفیت تضمینی' : 'Quality Assured'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7 Tabs Section */}
                <div className="mt-16">
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent flex-wrap gap-1">
                      <TabsTrigger 
                        value="general" 
                        className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 px-6 py-3 font-semibold transition-all duration-300"
                      >
                        {language === 'fa' ? 'مشخصات کلی' : 'General Specs'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="introduction" 
                        className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 px-6 py-3 font-semibold transition-all duration-300"
                      >
                        {language === 'fa' ? 'معرفی محصول' : 'Introduction'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="features" 
                        className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 px-6 py-3 font-semibold transition-all duration-300"
                      >
                        {language === 'fa' ? 'ویژگی‌ها' : 'Features'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="applications" 
                        className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 px-6 py-3 font-semibold transition-all duration-300"
                      >
                        {language === 'fa' ? 'کاربردها' : 'Applications'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="technical" 
                        className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 px-6 py-3 font-semibold transition-all duration-300"
                      >
                        {language === 'fa' ? 'مشخصات فنی' : 'Technical Specs'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="accessories" 
                        className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 px-6 py-3 font-semibold transition-all duration-300"
                      >
                        {language === 'fa' ? 'لوازم جانبی' : 'Accessories'}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="downloads" 
                        className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5 px-6 py-3 font-semibold transition-all duration-300"
                      >
                        {language === 'fa' ? 'دانلودها' : 'Downloads'}
                      </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: General Specifications */}
                    <TabsContent value="general" className="py-8 animate-fade-in">
                      <div className="bg-card border rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          <Package className="w-6 h-6 text-primary" />
                          {language === 'fa' ? 'مشخصات عمومی' : 'General Specifications'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="pb-3 border-b">
                              <p className="text-sm text-muted-foreground mb-1">{language === 'fa' ? 'دسته‌بندی' : 'Category'}</p>
                              <p className="font-semibold text-lg">{localizedCategory}</p>
                            </div>
                            <div className="pb-3 border-b">
                              <p className="text-sm text-muted-foreground mb-1">{language === 'fa' ? 'مدل' : 'Model'}</p>
                              <p className="font-semibold text-lg">{product.id.toUpperCase()}</p>
                            </div>
                            <div className="pb-3 border-b">
                              <p className="text-sm text-muted-foreground mb-1">{language === 'fa' ? 'وضعیت موجودی' : 'Stock Status'}</p>
                              <p className={cn(
                                "font-semibold text-lg",
                                product.inStock ? "text-green-600" : "text-red-600"
                              )}>
                                {product.inStock 
                                  ? (language === 'fa' ? 'موجود' : 'In Stock')
                                  : (language === 'fa' ? 'ناموجود' : 'Out of Stock')
                                }
                              </p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="pb-3 border-b">
                              <p className="text-sm text-muted-foreground mb-1">{language === 'fa' ? 'استانداردها' : 'Standards'}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {product.standards.map((std) => (
                                  <Badge key={std} variant="secondary" className="text-sm">{std}</Badge>
                                ))}
                              </div>
                            </div>
                            <div className="pb-3 border-b">
                              <p className="text-sm text-muted-foreground mb-1">{language === 'fa' ? 'برند' : 'Brand'}</p>
                              <p className="font-semibold text-lg">PetroPalayesh Co.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab 2: Product Introduction */}
                    <TabsContent value="introduction" className="py-8 animate-fade-in">
                      <div className="bg-card border rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          <FileText className="w-6 h-6 text-primary" />
                          {language === 'fa' ? 'معرفی محصول' : 'Product Introduction'}
                        </h2>
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-lg leading-relaxed mb-6">{localizedDescription}</p>
                          <div className="bg-muted/50 rounded-lg p-6 mt-6">
                            <h3 className="text-xl font-bold mb-4">
                              {language === 'fa' ? 'کاربرد اصلی' : 'Primary Application'}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {language === 'fa' 
                                ? 'این محصول برای استفاده در صنایع نفت، گاز و پتروشیمی طراحی شده است و دقت و قابلیت اطمینان بالایی را در محیط‌های صنعتی ارائه می‌دهد.'
                                : 'This product is designed for use in oil, gas and petrochemical industries, providing high accuracy and reliability in industrial environments.'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab 3: Features */}
                    <TabsContent value="features" className="py-8 animate-fade-in">
                      <div className="bg-card border rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          <Award className="w-6 h-6 text-primary" />
                          {language === 'fa' ? 'ویژگی‌های برجسته' : 'Key Features'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-semibold mb-1">{key}</p>
                                <p className="text-sm text-muted-foreground">{String(value)}</p>
                              </div>
                            </div>
                          ))}
                          {product.standards.map((std) => (
                            <div key={std} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-semibold mb-1">{language === 'fa' ? 'مطابق با استاندارد' : 'Compliant with'}</p>
                                <p className="text-sm text-muted-foreground">{std}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Tab 4: Applications */}
                    <TabsContent value="applications" className="py-8 animate-fade-in">
                      <div className="bg-card border rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">
                          {language === 'fa' ? 'کاربردهای صنعتی' : 'Industrial Applications'}
                        </h2>
                        {localizedApplications.length > 0 ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {localizedApplications.map((application, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary/50 transition-all hover:shadow-md">
                                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground leading-relaxed">{application}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">
                            {language === 'fa' ? 'کاربردهای محصول به زودی اضافه خواهد شد.' : 'Product applications will be added soon.'}
                          </p>
                        )}
                      </div>
                    </TabsContent>

                    {/* Tab 5: Technical Specifications */}
                    <TabsContent value="technical" className="py-8 animate-fade-in">
                      <div className="bg-card border rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">
                          {language === 'fa' ? 'مشخصات فنی کامل' : 'Complete Technical Specifications'}
                        </h2>
                        {Object.keys(product.specs).length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b-2">
                                  <th className="text-start py-4 px-4 font-bold bg-muted/50">
                                    {language === 'fa' ? 'پارامتر' : 'Parameter'}
                                  </th>
                                  <th className="text-start py-4 px-4 font-bold bg-muted/50">
                                    {language === 'fa' ? 'مقدار' : 'Value'}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {Object.entries(product.specs).map(([key, value]) => (
                                  <tr key={key} className="hover:bg-muted/30 transition-colors">
                                    <td className="py-4 px-4 font-medium text-muted-foreground">{key}</td>
                                    <td className="py-4 px-4 font-semibold">{String(value)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">
                            {language === 'fa' ? 'مشخصات فنی در دسترس نیست.' : 'Technical specifications are not available.'}
                          </p>
                        )}
                      </div>
                    </TabsContent>

                    {/* Tab 6: Accessories */}
                    <TabsContent value="accessories" className="py-8 animate-fade-in">
                      <div className="bg-card border rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          <Package className="w-6 h-6 text-primary" />
                          {language === 'fa' ? 'لوازم جانبی و متعلقات' : 'Accessories & Components'}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            { name: language === 'fa' ? 'کابل اتصال' : 'Connection Cable', code: 'ACC-001' },
                            { name: language === 'fa' ? 'کیت نصب' : 'Installation Kit', code: 'ACC-002' },
                            { name: language === 'fa' ? 'آداپتور برق' : 'Power Adapter', code: 'ACC-003' },
                            { name: language === 'fa' ? 'راهنمای کاربر' : 'User Manual', code: 'DOC-001' },
                            { name: language === 'fa' ? 'گواهی کالیبراسیون' : 'Calibration Certificate', code: 'DOC-002' },
                            { name: language === 'fa' ? 'نرم‌افزار تحلیل' : 'Analysis Software', code: 'SW-001' },
                          ].map((item) => (
                            <div key={item.code} className="p-4 rounded-lg border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Package className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">{item.code}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-6 p-4 bg-muted/30 rounded-lg">
                          {language === 'fa' 
                            ? 'برای اطلاعات بیشتر در مورد لوازم جانبی و قیمت‌گذاری، لطفاً با تیم فروش تماس بگیرید.'
                            : 'For more information about accessories and pricing, please contact our sales team.'
                          }
                        </p>
                      </div>
                    </TabsContent>

                    {/* Tab 7: Downloads */}
                    <TabsContent value="downloads" className="py-8 animate-fade-in">
                      <div className="bg-card border rounded-xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          <Download className="w-6 h-6 text-primary" />
                          {language === 'fa' ? 'فایل‌های قابل دانلود' : 'Downloadable Files'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { 
                              title: language === 'fa' ? 'کاتالوگ محصول' : 'Product Catalog',
                              type: 'PDF',
                              size: '2.4 MB',
                              icon: FileText
                            },
                            { 
                              title: language === 'fa' ? 'راهنمای فنی' : 'Technical Manual',
                              type: 'PDF',
                              size: '5.1 MB',
                              icon: FileText
                            },
                            { 
                              title: language === 'fa' ? 'راهنمای نصب' : 'Installation Guide',
                              type: 'PDF',
                              size: '1.8 MB',
                              icon: FileText
                            },
                            { 
                              title: language === 'fa' ? 'گواهینامه‌ها' : 'Certificates',
                              type: 'PDF',
                              size: '890 KB',
                              icon: Award
                            },
                            { 
                              title: language === 'fa' ? 'نقشه‌های CAD' : 'CAD Drawings',
                              type: 'DWG',
                              size: '1.2 MB',
                              icon: FileText
                            },
                            { 
                              title: language === 'fa' ? 'نرم‌افزار کالیبراسیون' : 'Calibration Software',
                              type: 'ZIP',
                              size: '12.5 MB',
                              icon: Download
                            },
                          ].map((doc, idx) => (
                            <Button 
                              key={idx}
                              variant="outline" 
                              className="justify-start h-auto py-4 hover:bg-primary/5 hover:border-primary/50 transition-all group"
                            >
                              <doc.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                              <div className={cn('flex-1', language === 'fa' ? 'text-right' : 'text-left')}>
                                <div className="font-semibold text-base mb-1">{doc.title}</div>
                                <div className="text-sm text-muted-foreground">{doc.type} • {doc.size}</div>
                              </div>
                              <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </Button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}

            {/* Related Products */}
             {product && relatedProducts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">
                  {language === 'fa' ? 'محصولات مرتبط' : 'Related Products'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
