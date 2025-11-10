import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { language, t } = useLanguage();

  const quickLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.about'), path: '/about' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg">PPC</span>
              </div>
              <span className="font-bold text-lg">
                {language === 'fa' ? 'پتروپالایش کو' : 'PetroPalayesh Co.'}
              </span>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              {language === 'fa'
                ? 'تأمین‌کننده تجهیزات آزمایشگاهی و ابزار دقیق برای صنایع نفت، گاز و پتروشیمی'
                : 'Supplier of laboratory equipment and precision instruments for oil, gas and petrochemical industries'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <div>+98 21 1234 5678</div>
                  <div>+98 912 345 6789</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="mailto:info@petrotech.ir" className="hover:text-accent transition-smooth">
                  info@petrotech.ir
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  {language === 'fa'
                    ? 'تهران، خیابان ولیعصر، پلاک ۱۲۳۴'
                    : 'Tehran, Valiasr St., No. 1234'}
                </span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-bold mb-4">
              {language === 'fa' ? 'گواهینامه‌ها' : 'Certifications'}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {['ISO 9001', 'ISO 14001', 'OHSAS 18001'].map((cert) => (
                <div
                  key={cert}
                  className="px-3 py-1 bg-primary-foreground/10 rounded text-xs font-medium"
                >
                  {cert}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-smooth"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-smooth"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-smooth"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mb-8">
          <div className="rounded-lg overflow-hidden border border-primary-foreground/20 shadow-elegant">
            <iframe
              src="https://maps.google.com/maps?ll=35.704071,51.378513&z=15&t=m&hl=en&gl=US&mapclient=embed&output=embed"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'fa' ? 'موقعیت مکانی' : 'Location Map'}
            />
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6">
          <p className="text-center text-sm text-primary-foreground/60">
            {language === 'fa'
              ? `© ${new Date().getFullYear()} پترو تک. تمامی حقوق محفوظ است.`
              : `© ${new Date().getFullYear()} PetroTech. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
};
