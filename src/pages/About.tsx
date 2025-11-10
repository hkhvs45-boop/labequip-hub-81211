import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export default function About() {
  const { language } = useLanguage();

  const values = [
    {
      icon: Award,
      title: { fa: 'کیفیت برتر', en: 'Premium Quality' },
      description: { fa: 'تأمین تجهیزات با بالاترین استانداردهای جهانی', en: 'Providing equipment with highest global standards' }
    },
    {
      icon: Users,
      title: { fa: 'تیم متخصص', en: 'Expert Team' },
      description: { fa: 'متخصصان مجرب در زمینه تجهیزات آزمایشگاهی', en: 'Experienced specialists in laboratory equipment' }
    },
    {
      icon: Globe,
      title: { fa: 'پوشش جهانی', en: 'Global Coverage' },
      description: { fa: 'ارتباط با برندهای معتبر جهانی', en: 'Connection with reputable global brands' }
    },
    {
      icon: TrendingUp,
      title: { fa: 'رشد پایدار', en: 'Sustainable Growth' },
      description: { fa: 'توسعه مداوم خدمات و محصولات', en: 'Continuous development of services and products' }
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
                  <BreadcrumbPage>{language === 'fa' ? 'درباره ما' : 'About'}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container-wide text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {language === 'fa' ? 'درباره پتروپالایش کو' : 'About PetroPalayesh Co.'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {language === 'fa'
                ? 'ما با بیش از دو دهه تجربه در زمینه تأمین و واردات تجهیزات آزمایشگاهی و ابزار دقیق، خدمات جامعی را به صنایع نفت، گاز و پتروشیمی ارائه می‌دهیم.'
                : 'With over two decades of experience in supplying and importing laboratory equipment and precision instruments, we provide comprehensive services to the oil, gas and petrochemical industries.'}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-card border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'fa' ? 'مأموریت ما' : 'Our Mission'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'fa'
                    ? 'تأمین تجهیزات آزمایشگاهی با کیفیت بالا و ارائه خدمات فنی تخصصی به منظور ارتقای سطح کیفی آزمایشگاه‌های صنعتی کشور و کمک به توسعه پایدار صنایع نفت، گاز و پتروشیمی.'
                    : 'Supplying high-quality laboratory equipment and providing specialized technical services to improve the quality level of industrial laboratories and contribute to sustainable development of oil, gas and petrochemical industries.'}
                </p>
              </div>

              <div className="bg-card border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'fa' ? 'چشم‌انداز ما' : 'Our Vision'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'fa'
                    ? 'تبدیل شدن به پیشرو و مرجع تخصصی در زمینه تأمین تجهیزات آزمایشگاهی و ابزار دقیق در منطقه خاورمیانه و ارائه راهکارهای نوین و جامع به صنایع.'
                    : 'Becoming the leading specialist reference in supplying laboratory equipment and precision instruments in the Middle East region and providing innovative and comprehensive solutions to industries.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'fa' ? 'ارزش‌های ما' : 'Our Values'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-card border rounded-lg p-6 text-center hover:shadow-elegant transition-smooth">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title[language]}</h3>
                  <p className="text-sm text-muted-foreground">{value.description[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'fa' ? 'گواهینامه‌ها' : 'Certifications'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">ISO 9001</div>
                <p className="text-muted-foreground">
                  {language === 'fa' ? 'مدیریت کیفیت' : 'Quality Management'}
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">ISO 17025</div>
                <p className="text-muted-foreground">
                  {language === 'fa' ? 'صلاحیت آزمایشگاه' : 'Laboratory Competence'}
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">ATEX</div>
                <p className="text-muted-foreground">
                  {language === 'fa' ? 'تجهیزات ضد انفجار' : 'Explosion-Proof Equipment'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
