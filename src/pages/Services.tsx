import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Package, Wrench, Settings, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export default function Services() {
  const { language } = useLanguage();

  const services = [
    {
      icon: Package,
      title: { fa: 'واردات و تأمین', en: 'Import & Supply' },
      description: { fa: 'تأمین و واردات تجهیزات آزمایشگاهی از برندهای معتبر جهانی', en: 'Supplying and importing laboratory equipment from reputable global brands' },
      path: '/services/import'
    },
    {
      icon: Settings,
      title: { fa: 'نصب و راه‌اندازی', en: 'Installation' },
      description: { fa: 'نصب حرفه‌ای و راه‌اندازی تجهیزات توسط تیم متخصص', en: 'Professional installation and commissioning by expert team' },
      path: '/services/installation'
    },
    {
      icon: Wrench,
      title: { fa: 'تعمیر و نگهداری', en: 'Maintenance' },
      description: { fa: 'خدمات پس از فروش و نگهداری دوره‌ای تجهیزات', en: 'After-sales services and periodic equipment maintenance' },
      path: '/services/maintenance'
    },
    {
      icon: MessageSquare,
      title: { fa: 'مشاوره فنی', en: 'Technical Consulting' },
      description: { fa: 'مشاوره تخصصی برای انتخاب بهترین تجهیزات', en: 'Expert consulting for selecting the best equipment' },
      path: '/services/consulting'
    }
  ];

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
                  <BreadcrumbPage>{language === 'fa' ? 'خدمات' : 'Services'}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container-wide text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {language === 'fa' ? 'خدمات ما' : 'Our Services'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {language === 'fa'
                ? 'ارائه خدمات جامع از تأمین تا نصب، راه‌اندازی و پشتیبانی تجهیزات آزمایشگاهی'
                : 'Comprehensive services from supply to installation, commissioning and laboratory equipment support'}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-card border rounded-lg p-8 hover:shadow-elegant transition-smooth"
                >
                  <div className="w-16 h-16 bg-gradient-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title[language]}</h3>
                  <p className="text-muted-foreground mb-6">{service.description[language]}</p>
                  <Link to={service.path}>
                    <Button variant="outline" className="group-hover:bg-accent group-hover:text-white transition-smooth">
                      {language === 'fa' ? 'اطلاعات بیشتر' : 'Learn More'}
                      <ArrowRight className={cn("w-4 h-4", language === 'fa' ? 'mr-2 rotate-180' : 'ml-2')} />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'fa' ? 'آیا سوالی دارید؟' : 'Have a Question?'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'fa'
                ? 'تیم ما آماده است تا بهترین راهکار را برای نیازهای شما ارائه دهد'
                : 'Our team is ready to provide the best solution for your needs'}
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-accent text-white">
                {language === 'fa' ? 'تماس با ما' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
