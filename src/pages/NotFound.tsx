import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background" dir={language === 'fa' ? 'rtl' : 'ltr'}>
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
                  <BreadcrumbPage>404</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        <section className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center px-4">
            <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
            <p className="mb-8 text-2xl text-muted-foreground">
              {language === 'fa' ? 'صفحه مورد نظر یافت نشد' : 'Page not found'}
            </p>
            <Link to="/" className="inline-block px-8 py-3 bg-gradient-accent text-white rounded-lg hover:opacity-90 transition-smooth">
              {language === 'fa' ? 'بازگشت به صفحه اصلی' : 'Return to Home'}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
