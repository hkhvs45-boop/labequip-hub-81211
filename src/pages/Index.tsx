import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Award, 
  Clock, 
  HeadphonesIcon, 
  Shield, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, categories } from '@/data/products';
import heroImage from '@/assets/hero-lab-equipment.jpg';

const Index = () => {
  const { language, t } = useLanguage();
  
  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);
  
  // Define features/benefits
  const features = [
    {
      icon: Award,
      titleKey: 'features.quality.title',
      descKey: 'features.quality.desc',
      color: 'text-primary',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'features.support.title',
      descKey: 'features.support.desc',
      color: 'text-secondary',
    },
    {
      icon: Clock,
      titleKey: 'features.delivery.title',
      descKey: 'features.delivery.desc',
      color: 'text-primary',
    },
    {
      icon: Shield,
      titleKey: 'features.warranty.title',
      descKey: 'features.warranty.desc',
      color: 'text-secondary',
    },
  ];

  // Stats/Counters
  const stats = [
    { value: '100+', labelKey: 'stats.projects' },
    { value: '500+', labelKey: 'stats.clients' },
    { value: '1000+', labelKey: 'stats.products' },
    { value: '24/7', labelKey: 'stats.support' },
  ];

  // Certifications
  const certifications = [
    'ISO 9001',
    'ISO 14001',
    'OHSAS 18001',
    'API',
    'ASME',
    'IEC',
    'ATEX'
  ];

  return (
    <>
      <Helmet>
        <title>
          {language === 'fa' 
            ? 'پتروپالایش کو - تأمین تجهیزات آزمایشگاهی و ابزار دقیق' 
            : 'Petro Palayesh Co - Laboratory Equipment & Precision Instruments'}
        </title>
        <meta 
          name="description" 
          content={language === 'fa'
            ? 'تأمین‌کننده برتر تجهیزات آزمایشگاهی و ابزار دقیق برای صنایع نفت، گاز و پتروشیمی با استانداردهای جهانی'
            : 'Leading provider of laboratory equipment and precision instruments for oil, gas and petrochemical industries with international standards'}
        />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section - Full Width with Modern Gradient Overlay */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={heroImage}
              alt={language === 'fa' ? 'تجهیزات آزمایشگاهی' : 'Laboratory Equipment'}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 gradient-hero-overlay" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container-wide text-center text-white pt-32 pb-20 px-4">
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
              {certifications.slice(0, 4).map((cert) => (
                <Badge 
                  key={cert}
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-smooth px-4 py-1.5"
                >
                  {cert}
                </Badge>
              ))}
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-white/90 font-medium animate-fade-in">
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-12 text-white/80 leading-relaxed animate-fade-in">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="gradient-accent text-white shadow-glow-accent hover:shadow-elegant-xl hover:scale-105 transition-smooth text-lg px-8 py-6 min-w-[200px]"
                >
                  {t('cta.viewProducts')}
                  <ArrowRight className={`w-5 h-5 ${language === 'fa' ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-smooth text-lg px-8 py-6 min-w-[200px]"
                >
                  {t('cta.getConsultation')}
                  <Play className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-white/70 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-gradient-subtle">
          <div className="container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-card hover-lift border border-border/50"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="section-title">{t('features.title')}</h2>
              <p className="section-subtitle">{t('features.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift shadow-elegant-sm"
                >
                  <div className={`w-16 h-16 rounded-xl ${feature.color} bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="section-padding bg-gradient-subtle">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="section-title">{t('categories.title')}</h2>
              <p className="section-subtitle">{t('categories.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-elegant hover:shadow-elegant-xl transition-smooth"
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src={category.image}
                      alt={language === 'fa' ? category.name : category.nameEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/50 to-transparent opacity-80 group-hover:opacity-90 transition-smooth" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-smooth">
                      {language === 'fa' ? category.name : category.nameEn}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <span>{language === 'fa' ? 'مشاهده محصولات' : 'View Products'}</span>
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-smooth ${language === 'fa' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">{t('products.featured')}</h2>
                <p className="text-muted-foreground">
                  {language === 'fa' 
                    ? 'محصولات منتخب با بالاترین کیفیت'
                    : 'Selected products with highest quality'}
                </p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="group">
                  {t('cta.viewAll')}
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-smooth ${language === 'fa' ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-hero text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          </div>

          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {language === 'fa' 
                  ? 'آماده شروع همکاری با ما هستید؟'
                  : 'Ready to Start Working with Us?'}
              </h2>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                {language === 'fa'
                  ? 'تیم متخصص ما آماده است تا بهترین راهکارها را برای نیازهای شما ارائه دهد. همین حالا با ما تماس بگیرید و از مشاوره رایگان بهره‌مند شوید.'
                  : 'Our expert team is ready to provide the best solutions for your needs. Contact us now and benefit from free consultation.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="gradient-accent text-white shadow-glow-accent hover:shadow-elegant-xl hover:scale-105 transition-smooth text-lg px-10 py-6"
                  >
                    {t('cta.getConsultation')}
                    <CheckCircle className="w-5 h-5" />
                  </Button>
                </Link>
                
                <Link to="/products">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white text-primary border-white hover:bg-white/90 hover:text-primary-dark transition-smooth text-lg px-10 py-6"
                  >
                    {t('cta.viewProducts')}
                    <TrendingUp className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;
