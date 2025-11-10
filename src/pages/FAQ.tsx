import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQ() {
  const { language } = useLanguage();

  const faqs = [
    {
      question: { fa: 'چگونه می‌توانم سفارش دهم؟', en: 'How can I place an order?' },
      answer: { fa: 'می‌توانید محصولات مورد نظر را به سبد استعلام اضافه کرده و فرم درخواست قیمت را تکمیل کنید.', en: 'You can add desired products to RFQ cart and complete the quote request form.' }
    },
    {
      question: { fa: 'زمان تحویل چقدر است؟', en: 'What is the delivery time?' },
      answer: { fa: 'زمان تحویل بسته به نوع محصول و موجودی بین ۲ تا ۱۲ هفته متغیر است.', en: 'Delivery time varies between 2 to 12 weeks depending on product type and availability.' }
    },
    {
      question: { fa: 'آیا گارانتی ارائه می‌شود؟', en: 'Is warranty provided?' },
      answer: { fa: 'تمام محصولات دارای گارانتی معتبر از سازنده می‌باشند.', en: 'All products come with valid manufacturer warranty.' }
    },
    {
      question: { fa: 'آیا خدمات پس از فروش دارید؟', en: 'Do you provide after-sales services?' },
      answer: { fa: 'بله، ما خدمات نصب، راه‌اندازی، آموزش و نگهداری ارائه می‌دهیم.', en: 'Yes, we provide installation, commissioning, training and maintenance services.' }
    },
    {
      question: { fa: 'آیا امکان بازدید از دفتر وجود دارد؟', en: 'Is it possible to visit the office?' },
      answer: { fa: 'بله، با هماهنگی قبلی می‌توانید از دفتر و نمایشگاه ما بازدید کنید.', en: 'Yes, you can visit our office and showroom with prior arrangement.' }
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
                  <BreadcrumbPage>{language === 'fa' ? 'سؤالات متداول' : 'FAQ'}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        <section className="py-16 bg-gradient-subtle">
          <div className="container-wide text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {language === 'fa' ? 'سؤالات متداول' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'پاسخ سؤالات رایج در مورد محصولات و خدمات ما'
                : 'Answers to common questions about our products and services'}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-wide max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card border rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    {faq.question[language]}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer[language]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
