import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fa' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  fa: {
    // Navigation
    'nav.home': 'خانه',
    'nav.products': 'محصولات',
    'nav.services': 'خدمات',
    'nav.about': 'درباره ما',
    'nav.resources': 'منابع',
    'nav.contact': 'تماس با ما',
    
    // Hero Section
    'hero.title': 'تأمین‌کننده برتر تجهیزات آزمایشگاهی و ابزار دقیق',
    'hero.subtitle': 'با استانداردهای جهانی برای صنعت نفت و گاز',
    'hero.description': 'ارائه‌دهنده تجهیزات تحلیلی پیشرفته با استانداردهای بین‌المللی API، ASME، IEC و ATEX با تمرکز بر کیفیت و دقت بالا',
    
    // CTAs
    'cta.viewProducts': 'مشاهده محصولات',
    'cta.quote': 'درخواست قیمت',
    'cta.rfq': 'افزودن به استعلام',
    'cta.contact': 'تماس کارشناسی',
    'cta.getConsultation': 'مشاوره رایگان',
    'cta.learnMore': 'اطلاعات بیشتر',
    'cta.viewAll': 'مشاهده همه',
    
    // Features
    'features.title': 'چرا پتروپالایش کو؟',
    'features.subtitle': 'مزایای همکاری با ما',
    'features.quality.title': 'کیفیت برتر',
    'features.quality.desc': 'تجهیزات با استانداردهای بین‌المللی و گواهینامه‌های معتبر',
    'features.support.title': 'پشتیبانی تخصصی',
    'features.support.desc': 'تیم متخصص برای راهنمایی و پشتیبانی فنی',
    'features.delivery.title': 'تحویل سریع',
    'features.delivery.desc': 'ارسال سریع و ایمن به سراسر کشور',
    'features.warranty.title': 'ضمانت اصالت',
    'features.warranty.desc': 'تضمین اصالت محصولات با گارانتی معتبر',
    
    // Products Section
    'products.featured': 'محصولات برجسته',
    'products.all': 'همه محصولات',
    'products.search': 'جستجوی محصولات...',
    'products.filter': 'فیلتر',
    'products.viewDetails': 'جزئیات بیشتر',
    
    // Categories
    'categories.title': 'دسته‌بندی محصولات',
    'categories.subtitle': 'انتخاب دسته مورد نظر',
    
    // Services
    'services.title': 'خدمات ما',
    'services.subtitle': 'ارائه خدمات جامع در زمینه تجهیزات آزمایشگاهی',
    
    // Testimonials
    'testimonials.title': 'نظر مشتریان',
    'testimonials.subtitle': 'تجربه همکاران ما',
    
    // Stats
    'stats.projects': 'پروژه موفق',
    'stats.clients': 'مشتری راضی',
    'stats.products': 'محصول متنوع',
    'stats.support': 'پشتیبانی شبانه‌روزی',
    
    // Footer
    'footer.about': 'درباره شرکت',
    'footer.quickLinks': 'دسترسی سریع',
    'footer.contact': 'تماس با ما',
    'footer.certifications': 'گواهینامه‌ها',
    'footer.description': 'تأمین‌کننده تجهیزات آزمایشگاهی و ابزار دقیق برای صنایع نفت، گاز و پتروشیمی',
    'footer.rights': 'تمامی حقوق محفوظ است',
    
    // Common
    'common.loading': 'در حال بارگذاری...',
    'common.error': 'خطا',
    'common.success': 'موفق',
    'common.cancel': 'لغو',
    'common.submit': 'ارسال',
    'common.save': 'ذخیره',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.resources': 'Resources',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Leading Provider of Laboratory Equipment & Precision Instruments',
    'hero.subtitle': 'With International Standards for Oil & Gas Industry',
    'hero.description': 'Advanced analytical equipment provider with international standards API, ASME, IEC & ATEX focusing on high quality and accuracy',
    
    // CTAs
    'cta.viewProducts': 'View Products',
    'cta.quote': 'Request Quote',
    'cta.rfq': 'Add to RFQ',
    'cta.contact': 'Contact Expert',
    'cta.getConsultation': 'Free Consultation',
    'cta.learnMore': 'Learn More',
    'cta.viewAll': 'View All',
    
    // Features
    'features.title': 'Why Petro Palayesh Co?',
    'features.subtitle': 'Benefits of Working with Us',
    'features.quality.title': 'Superior Quality',
    'features.quality.desc': 'Equipment with international standards and valid certifications',
    'features.support.title': 'Expert Support',
    'features.support.desc': 'Specialized team for guidance and technical support',
    'features.delivery.title': 'Fast Delivery',
    'features.delivery.desc': 'Fast and secure shipping nationwide',
    'features.warranty.title': 'Authenticity Guarantee',
    'features.warranty.desc': 'Product authenticity guarantee with valid warranty',
    
    // Products Section
    'products.featured': 'Featured Products',
    'products.all': 'All Products',
    'products.search': 'Search products...',
    'products.filter': 'Filter',
    'products.viewDetails': 'View Details',
    
    // Categories
    'categories.title': 'Product Categories',
    'categories.subtitle': 'Choose Your Category',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive laboratory equipment services',
    
    // Testimonials
    'testimonials.title': 'Client Testimonials',
    'testimonials.subtitle': 'Experience of Our Partners',
    
    // Stats
    'stats.projects': 'Successful Projects',
    'stats.clients': 'Satisfied Clients',
    'stats.products': 'Product Variety',
    'stats.support': '24/7 Support',
    
    // Footer
    'footer.about': 'About Company',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.certifications': 'Certifications',
    'footer.description': 'Supplier of laboratory equipment and precision instruments for oil, gas and petrochemical industries',
    'footer.rights': 'All Rights Reserved',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.save': 'Save',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fa');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fa] || key;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      setLanguage('fa');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === 'fa' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
