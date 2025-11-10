import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRFQ } from '@/contexts/RFQContext';
import { categories, subcategories } from '@/data/products';
import { cn } from '@/lib/utils';
import { SearchModal } from '@/components/SearchModal';
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const {
    items,
    setIsOpen
  } = useRFQ();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const menuItems = [{
    label: t('nav.home'),
    path: '/'
  }, {
    label: t('nav.products'),
    path: '/products',
    megaMenu: true
  }, {
    label: t('nav.services'),
    path: '/services',
    submenu: [{
      label: language === 'fa' ? 'واردات و تأمین' : 'Import & Supply',
      path: '/services/import'
    }, {
      label: language === 'fa' ? 'نصب و راه‌اندازی' : 'Installation',
      path: '/services/installation'
    }, {
      label: language === 'fa' ? 'تعمیر و نگهداری' : 'Maintenance',
      path: '/services/maintenance'
    }, {
      label: language === 'fa' ? 'مشاوره فنی' : 'Technical Consulting',
      path: '/services/consulting'
    }]
  }, {
    label: t('nav.about'),
    path: '/about'
  }, {
    label: t('nav.resources'),
    path: '/resources',
    submenu: [{
      label: language === 'fa' ? 'راهنماهای فنی' : 'Technical Guides',
      path: '/resources/guides'
    }, {
      label: language === 'fa' ? 'وبلاگ' : 'Blog',
      path: '/resources/blog'
    }, {
      label: language === 'fa' ? 'کاتالوگ‌ها' : 'Catalogs',
      path: '/resources/catalogs'
    }, {
      label: language === 'fa' ? 'سؤالات متداول' : 'FAQ',
      path: '/resources/faq'
    }]
  }, {
    label: t('nav.contact'),
    path: '/contact'
  }];
  return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-smooth', isScrolled ? 'bg-background/95 backdrop-blur-md shadow-elegant' : 'bg-transparent')}>
      <div className="container-wide bg-slate-100">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-xl">PPC</span>
            </div>
            <div className={cn('flex flex-col', language === 'fa' ? 'items-end' : 'items-start')}>
              <span className="font-bold text-sm lg:text-base text-primary">
                {language === 'fa' ? 'پتروپالایش کو' : 'PetroPalayesh Co.'}
              </span>
              <span className="text-xs text-muted-foreground">
                {language === 'fa' ? 'تجهیزات آزمایشگاهی' : 'Lab Equipment'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map(item => <div key={item.path} className="relative" onMouseEnter={() => (item.submenu || item.megaMenu) && setActiveMenu(item.label)} onMouseLeave={() => setActiveMenu(null)}>
                <Link to={item.path} className={cn('px-4 py-2 rounded-md text-sm font-medium transition-smooth flex items-center gap-1', location.pathname === item.path ? 'text-accent' : 'text-foreground hover:text-accent hover:bg-secondary/50')}>
                  {item.label}
                  {(item.submenu || item.megaMenu) && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Submenu */}
                {item.submenu && activeMenu === item.label && <div className="absolute top-full left-0 mt-0.5 w-56 bg-card rounded-lg shadow-elegant-lg border overflow-hidden">
                    {item.submenu.map(subItem => <Link key={subItem.path} to={subItem.path} className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                        {subItem.label}
                      </Link>)}
                  </div>}

                {/* Mega Menu for Products */}
                {item.megaMenu && activeMenu === item.label && <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 w-[900px] max-h-[600px] overflow-y-auto bg-card rounded-lg shadow-elegant-lg border">
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-8">
                        {categories.map(category => {
                    const categorySubcategories = subcategories.filter(sub => sub.categoryId === category.id);
                    return <div key={category.id} className="space-y-4">
                              {/* Category Header */}
                              <Link to={`/products?category=${category.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/80 transition-smooth group border border-transparent hover:border-accent/20">
                                <img src={category.image} alt={language === 'fa' ? category.name : category.nameEn} className="w-14 h-14 object-cover rounded-md shadow-sm" />
                                <div className="flex-1">
                                  <h4 className="font-bold text-sm group-hover:text-accent transition-smooth">
                                    {language === 'fa' ? category.name : category.nameEn}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {categorySubcategories.length} {language === 'fa' ? 'زیر مجموعه' : 'subcategories'}
                                  </p>
                                </div>
                              </Link>
                              
                              {/* Subcategories List */}
                              {categorySubcategories.length > 0 && <div className={cn('space-y-1 border-border', language === 'fa' ? 'border-r-2 pr-3' : 'border-l-2 pl-3')}>
                                  {categorySubcategories.map(subcategory => <Link key={subcategory.id} to={`/products?category=${category.id}&subcategory=${subcategory.id}`} className={cn('block px-3 py-2 text-xs rounded-md hover:bg-accent/10 hover:text-accent transition-smooth', 'border border-transparent hover:border-accent/20', language === 'fa' ? 'text-right' : 'text-left')}>
                                      <span className="font-medium">
                                        {language === 'fa' ? subcategory.name : subcategory.nameEn}
                                      </span>
                                    </Link>)}
                                </div>}
                            </div>;
                  })}
                      </div>
                      
                      {/* Footer */}
                      <div className="mt-6 pt-6 border-t flex justify-center gap-4">
                        <Link to="/products">
                          <Button variant="default" size="sm" className="bg-gradient-accent text-white">
                            {language === 'fa' ? 'مشاهده همه محصولات' : 'View All Products'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>}
              </div>)}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')} className="relative">
              <Globe className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 text-xs font-bold">{language.toUpperCase()}</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  {items.length}
                </span>}
            </Button>

            

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Sheet Drawer */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                    <span className="text-background font-bold text-xl">PPC</span>
                  </div>
                  <div className={cn('flex flex-col', language === 'fa' ? 'items-end' : 'items-start')}>
                    <span className="font-bold text-sm text-primary">
                      {language === 'fa' ? 'پتروپالایش کو' : 'PetroPalayesh Co.'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {language === 'fa' ? 'تجهیزات آزمایشگاهی' : 'Lab Equipment'}
                    </span>
                  </div>
                </Link>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                {menuItems.map(item => <div key={item.path} className="mb-2">
                    {/* Main Menu Item - Clickable to expand */}
                    {item.submenu || item.megaMenu ? <button onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)} className={cn('w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-smooth', activeMenu === item.label ? 'bg-secondary text-accent' : 'hover:bg-secondary/50')}>
                        <span>{item.label}</span>
                        <ChevronDown className={cn('w-4 h-4 transition-transform', activeMenu === item.label && 'rotate-180')} />
                      </button> : <Link to={item.path} className={cn('flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-smooth', location.pathname === item.path ? 'bg-secondary text-accent' : 'hover:bg-secondary/50')} onClick={() => setIsMobileMenuOpen(false)}>
                        <span>{item.label}</span>
                      </Link>}
                    
                    {/* Products Mega Menu - Only shows when expanded */}
                    {item.megaMenu && activeMenu === item.label && <div className="mt-1 space-y-2 animate-accordion-down">
                        {categories.map(category => {
                    const categorySubcategories = subcategories.filter(sub => sub.categoryId === category.id);
                    const isExpanded = expandedCategory === category.id;
                    return <div key={category.id} className="space-y-1">
                              <div className="flex items-center gap-1">
                                <button onClick={() => setExpandedCategory(isExpanded ? null : category.id)} className={cn('flex-1 flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-smooth', language === 'fa' ? 'pr-8' : 'pl-8', 'text-foreground hover:bg-secondary/50')}>
                                  <span>{language === 'fa' ? category.name : category.nameEn}</span>
                                  <ChevronDown className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
                                </button>
                              </div>
                              
                              {isExpanded && categorySubcategories.length > 0 && <div className="space-y-1 animate-accordion-down">
                                  {categorySubcategories.map(subcategory => <Link key={subcategory.id} to={`/products?category=${category.id}&subcategory=${subcategory.id}`} className={cn('block px-4 py-1.5 text-xs rounded-md transition-smooth', language === 'fa' ? 'pr-12' : 'pl-12', 'text-muted-foreground hover:text-foreground hover:bg-secondary/30')} onClick={() => {
                          setIsMobileMenuOpen(false);
                          setExpandedCategory(null);
                          setActiveMenu(null);
                        }}>
                                      {language === 'fa' ? subcategory.name : subcategory.nameEn}
                                    </Link>)}
                                </div>}
                            </div>;
                  })}
                      </div>}

                    {/* Regular Submenu - Only shows when expanded */}
                    {item.submenu && activeMenu === item.label && <div className="mt-1 space-y-1 animate-accordion-down">
                        {item.submenu.map(subItem => <Link key={subItem.path} to={subItem.path} className={cn('block px-4 py-2 text-sm rounded-md transition-smooth', language === 'fa' ? 'pr-8' : 'pl-8', location.pathname === subItem.path ? 'text-accent bg-secondary/50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30')} onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveMenu(null);
                  }}>
                            {subItem.label}
                          </Link>)}
                      </div>}
                  </div>)}
              </nav>

              <div className="p-4 border-t">
                <Button variant="default" className="w-full bg-gradient-accent text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('cta.quote')}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Search Modal */}
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </header>;
};