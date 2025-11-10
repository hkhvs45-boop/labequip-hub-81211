import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import type { RFQItem } from '@/contexts/RFQContext';
import { postRFQ } from '@/strapi';

export default function Contact() {
  const { language } = useLanguage();
  const location = useLocation();
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const rfqItems = location.state?.rfqItems as RFQItem[] | undefined;
    if (rfqItems && rfqItems.length > 0) {
      const itemsList = rfqItems.map(item => `${item.name} (${language === 'fa' ? 'تعداد' : 'Qty'}: ${item.quantity})`).join(', ');
      const subjectText = language === 'fa' 
        ? `استعلام قیمت: ${itemsList}`
        : `Price Quote Request: ${itemsList}`;
      setSubject(subjectText);
    }
  }, [location.state, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const rfqItems = location.state?.rfqItems as RFQItem[] | undefined;
      await postRFQ({
        company: formData.company || undefined,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        items: rfqItems?.map(item => ({
          product: item.name,
          qty: item.quantity,
        })) || [],
      });

      toast.success(language === 'fa' ? 'درخواست شما با موفقیت ارسال شد' : 'Your request has been submitted successfully');
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      setSubject('');
    } catch (error) {
      console.error('Failed to submit RFQ:', error);
      toast.error(language === 'fa' ? 'خطا در ارسال درخواست' : 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{language === 'fa' ? 'تماس با ما | پتروپالایش کو' : 'Contact Us | PetroPalayesh Co.'}</title>
        <meta name="description" content={language === 'fa' 
          ? 'با تیم پتروپالایش کو تماس بگیرید. مشاوره تخصصی، استعلام قیمت تجهیزات آزمایشگاهی'
          : 'Contact PetroPalayesh Co. team. Expert consultation, laboratory equipment quotation'} />
        <link rel="canonical" href="https://YOURDOMAIN.com/contact" />
        <meta property="og:title" content={language === 'fa' ? 'تماس با ما | پتروپالایش کو' : 'Contact Us | PetroPalayesh Co.'} />
        <meta property="og:url" content="https://YOURDOMAIN.com/contact" />
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
                  <BreadcrumbPage>{language === 'fa' ? 'تماس با ما' : 'Contact'}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container-wide text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {language === 'fa' ? 'تماس با ما' : 'Contact Us'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'تیم ما آماده پاسخگویی به سؤالات شما و ارائه مشاوره تخصصی است'
                : 'Our team is ready to answer your questions and provide expert consultation'}
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {language === 'fa' ? 'اطلاعات تماس' : 'Contact Information'}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {language === 'fa' ? 'تلفن' : 'Phone'}
                      </h3>
                      <p className="text-muted-foreground">+98 21 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {language === 'fa' ? 'ایمیل' : 'Email'}
                      </h3>
                      <p className="text-muted-foreground">info@petrotech.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {language === 'fa' ? 'آدرس' : 'Address'}
                      </h3>
                      <p className="text-muted-foreground">
                        {language === 'fa'
                          ? 'تهران، خیابان ولیعصر، پلاک ۱۲۳'
                          : 'Tehran, Vali-e-Asr St., No. 123'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        {language === 'fa' ? 'ساعات کاری' : 'Working Hours'}
                      </h3>
                      <p className="text-muted-foreground">
                        {language === 'fa'
                          ? 'شنبه تا چهارشنبه: ۸-۱۷'
                          : 'Sat - Wed: 8AM - 5PM'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card border rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    {language === 'fa' ? 'فرم تماس' : 'Contact Form'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {language === 'fa' ? 'نام' : 'Name'}
                        </label>
                        <Input 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {language === 'fa' ? 'ایمیل' : 'Email'}
                        </label>
                        <Input 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {language === 'fa' ? 'شرکت' : 'Company'}
                        </label>
                        <Input 
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {language === 'fa' ? 'تلفن' : 'Phone'}
                        </label>
                        <Input 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {language === 'fa' ? 'موضوع' : 'Subject'}
                      </label>
                      <Input 
                        required 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {language === 'fa' ? 'پیام' : 'Message'}
                      </label>
                      <Textarea 
                        rows={6} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-accent text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? (language === 'fa' ? 'در حال ارسال...' : 'Submitting...') 
                        : (language === 'fa' ? 'ارسال پیام' : 'Send Message')}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
