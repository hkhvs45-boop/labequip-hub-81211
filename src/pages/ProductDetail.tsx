import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Download, FileText, Plus, Check } from 'lucide-react';
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
              <div className="grid lg:grid-cols-2 gap-12">
                <Skeleton className="aspect-square rounded-xl border" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton key={index} className="h-12 w-full" />
                    ))}
                  </div>
                 <Skeleton className="h-40 w-full" />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Skeleton className="h-12" />
                    <Skeleton className="h-12" />
                  </div>
                </div>
              </div>
              ) : (
              <>
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Images */}
                  <div>
                    <div className="bg-card rounded-lg p-8 border aspect-square flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={localizedName}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        width="800"
                        height="800"
                      />
                    </div>
                  </div>
               
                  {/* Info */}
                  <div>
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground uppercase tracking-wide">
                        {localizedCategory}
                      </span>
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                      {localizedName}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-6">
                      {localizedDescription || (language === 'fa'
                        ? 'توضیحات محصول در دسترس نیست.'
                        : 'Product description is not available.')}
                    </p>
                 {/* Standards */}
                    {product.standards.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.standards.map((standard) => (
                          <Badge key={standard} variant="outline" className="text-sm">
                            {standard}
                          </Badge>
                        ))}
                      </div>
                      )}

                    {/* Key Specs */}
                    {Object.keys(product.specs).length > 0 && (
                      <div className="bg-card border rounded-lg p-6 mb-6">
                        <h3 className="font-bold mb-4">
                          {language === 'fa' ? 'مشخصات کلیدی' : 'Key Specifications'}
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">{key}:</span>
                              <span className="font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                     )}

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="flex-1 bg-gradient-accent text-white"
                        onClick={handleAddToRFQ}
                        disabled={isInRFQ}
                      >
                        {isInRFQ ? (
                          <>
                            <Check className="w-5 h-5 mr-2" />
                            {language === 'fa' ? 'در استعلام موجود است' : 'Added to RFQ'}
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-2" />
                            {language === 'fa' ? 'افزودن به استعلام' : 'Add to RFQ'}
                          </>
                        )}
                      </Button>
                      <Button size="lg" variant="outline" className="flex-1">
                        <FileText className="w-5 h-5 mr-2" />
                        {language === 'fa' ? 'دانلود کاتالوگ' : 'Download Catalog'}
                      </Button>
                    </div>
                  </div>
               </div>

                {/* Tabs */}
                <div className="mt-12">
                  <Tabs defaultValue="specs" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                      <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent">
                        {language === 'fa' ? 'مشخصات فنی' : 'Technical Specifications'}
                      </TabsTrigger>
                      <TabsTrigger value="applications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent">
                        {language === 'fa' ? 'کاربردها' : 'Applications'}
                      </TabsTrigger>
                      <TabsTrigger value="documents" className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent">
                        {language === 'fa' ? 'اسناد' : 'Documents'}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="specs" className="py-6">
                      {Object.keys(product.specs).length > 0 ? (
                        <div className="bg-card border rounded-lg p-6">
                          <table className="w-full">
                            <tbody className="divide-y">
                              {Object.entries(product.specs).map(([key, value]) => (
                                <tr key={key}>
                                  <td className="py-3 font-medium text-muted-foreground w-1/3">{key}</td>
                                  <td className="py-3">{String(value)}</td>
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
                    </TabsContent>

                    <TabsContent value="applications" className="py-6">
                      {localizedApplications.length > 0 ? (
                        <ul className="space-y-2">
                          {localizedApplications.map((application) => (
                            <li key={application} className="flex items-start gap-2 text-muted-foreground">
                              <Check className="w-4 h-4 mt-0.5 text-accent" />
                              <span>{application}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">
                          {language === 'fa' ? 'کاربردهای محصول ثبت نشده است.' : 'No product applications have been provided yet.'}
                        </p>
                      )}
                    </TabsContent>

                    <TabsContent value="documents" className="py-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start h-auto py-4">
                          <Download className="w-5 h-5 mr-2" />
                          <div className={cn('text-start', language === 'fa' ? 'text-right' : 'text-left')}>
                            <div className="font-medium">
                              {language === 'fa' ? 'کاتالوگ محصول' : 'Product Catalog'}
                            </div>
                            <div className="text-sm text-muted-foreground">PDF</div>
                          </div>
                        </Button>
                        <Button variant="outline" className="justify-start h-auto py-4">
                          <Download className="w-5 h-5 mr-2" />
                          <div className={cn('text-start', language === 'fa' ? 'text-right' : 'text-left')}>
                            <div className="font-medium">
                              {language === 'fa' ? 'راهنمای فنی' : 'Technical Manual'}
                            </div>
                            <div className="text-sm text-muted-foreground">PDF</div>
                          </div>
                        </Button>
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
