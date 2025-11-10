import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Mic, X, Package, Award, TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const SearchModal = ({
  isOpen,
  onClose
}: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const {
    language
  } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // AI-powered suggestions based on popular searches
  const aiSuggestions = language === 'fa' ? ['سنسورهای ATEX', 'کالیبراسیون NJ', 'تجهیزات آنالیز', 'ابزار دقیق'] : ['ATEX sensors', 'NJ calibration', 'Analytical equipment', 'Precision instruments'];

  // Enhanced search results filtering - searches in multiple fields
  const searchResults = query.trim() ? products.filter(product => {
    const searchTerm = query.toLowerCase();
    
    // Search in both Persian and English names
    const nameFa = product.name.toLowerCase();
    const nameEn = product.nameEn.toLowerCase();
    
    // Search in categories and subcategories
    const category = product.category.toLowerCase();
    const subcategoryFa = (product.subcategory || '').toLowerCase();
    const subcategoryEn = (product.subcategoryEn || '').toLowerCase();
    
    // Search in description if available
    const description = (product.description || '').toLowerCase();
    
    // Convert specs object to searchable string
    const specsStr = product.specs ? Object.values(product.specs).filter(Boolean).join(' ').toLowerCase() : '';
    
    // Search in all fields for comprehensive results
    return nameFa.includes(searchTerm) || 
           nameEn.includes(searchTerm) || 
           category.includes(searchTerm) || 
           subcategoryFa.includes(searchTerm) ||
           subcategoryEn.includes(searchTerm) ||
           description.includes(searchTerm) ||
           specsStr.includes(searchTerm);
  }).slice(0, 8) : [];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Trigger open from parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Voice search setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'fa' ? 'fa-IR' : 'en-US';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results).map((result: any) => result[0]).map((result: any) => result.transcript).join('');
        setQuery(transcript);
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);
  const toggleVoiceSearch = useCallback(() => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4" onClick={e => e.stopPropagation()}>
        {/* Search Bar */}
        <div className="relative">
          <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={language === 'fa' ? 'جستجوی سنسورها، مشخصات، گواهینامه‌ها... (مثال: "سنسور فشار ATEX با دقت 0.1%")' : 'Search sensors, specs, certifications... (e.g., "ATEX pressure 0.1%")'} className={cn('w-full px-6 py-4 text-lg rounded-2xl', 'bg-background border-2 border-primary/20', 'focus:border-primary focus:ring-4 ring-primary/10', 'shadow-2xl transition-all outline-none', language === 'fa' ? 'text-right pr-14 pl-24' : 'pl-14 pr-24')} />
          <Search className={cn('absolute top-1/2 -translate-y-1/2 w-6 h-6 text-primary', language === 'fa' ? 'right-5' : 'left-5')} />
          
          {recognitionRef.current && <button onClick={toggleVoiceSearch} className={cn('absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-colors', isListening ? 'text-accent animate-pulse' : 'text-muted-foreground hover:text-secondary', language === 'fa' ? 'left-16' : 'right-16')}>
              <Mic />
            </button>}
          
          <button onClick={onClose} className={cn('absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-colors text-muted-foreground hover:text-destructive', language === 'fa' ? 'left-5' : 'right-5')}>
            <X />
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-4 bg-background rounded-2xl shadow-2xl overflow-hidden border border-border/50">
          {/* AI Suggestions */}
          {!query && <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">
                {language === 'fa' ? 'پیشنهادات هوشمند:' : 'AI Suggestions:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((suggestion, idx) => <button key={idx} onClick={() => handleSuggestionClick(suggestion)} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors">
                    {suggestion}
                  </button>)}
              </div>
            </div>}

          {/* Search Results */}
          {query && <div className="max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? searchResults.map(product => <Link key={product.id} to={`/products/${product.id}`} onClick={onClose} className="flex items-center gap-4 p-4 hover:bg-secondary/20 border-b border-border/50 transition-colors group">
                    <img src={product.image} alt={language === 'fa' ? product.name : product.nameEn} className="w-16 h-16 rounded-lg object-cover shadow-md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">
                        {language === 'fa' ? product.name : product.nameEn}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {product.specs?.range || product.specs?.accuracy || product.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Award className="w-3 h-3 text-accent" />
                        <p className="text-xs text-accent">
                          {language === 'fa' ? 'موجود در انبار' : 'In Stock'}
                        </p>
                      </div>
                    </div>
                    <ArrowLeft className={cn('w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors', language === 'fa' ? 'rotate-180' : '')} />
                  </Link>) : <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>
                    {language === 'fa' ? 'نتیجه‌ای یافت نشد. "خدمات کالیبراسیون" را امتحان کنید' : 'No results found. Try "calibration services"'}
                  </p>
                </div>}
            </div>}

          {/* Popular Categories */}
          {!query && <div className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                {language === 'fa' ? 'دسته‌بندی‌های محبوب:' : 'Popular Categories:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 4).map(category => <Link key={category.id} to={`/products/category/${category.id}`} onClick={onClose} className="flex items-center gap-2 p-3 rounded-lg hover:bg-secondary/20 transition-colors group">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium truncate">
                      {language === 'fa' ? category.name : category.nameEn}
                    </span>
                  </Link>)}
              </div>
            </div>}
        </div>
      </div>
    </div>;
};