import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useRFQ } from '@/contexts/RFQContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const { items, addItem } = useRFQ();
  const { language } = useLanguage();
  const isInRFQ = items.some(item => item.id === product.id);

  const handleAddToRFQ = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isInRFQ) {
      addItem({
        id: product.id,
        name: language === 'fa' ? product.name : product.nameEn,
        category: product.category,
        image: product.image,
      });
    }
  };

  if (viewMode === 'list') {
    return (
      <Link
        to={`/products/${product.id}`}
        className="group block bg-card border rounded-lg p-6 hover:shadow-elegant transition-smooth"
      >
        <div className="flex gap-6">
          <div className="w-48 h-48 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={language === 'fa' ? product.name : product.nameEn} 
              className="w-full h-full object-contain p-4" 
              loading="lazy"
              width="192"
              height="192"
            />
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-smooth">{language === 'fa' ? product.name : product.nameEn}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-2">{language === 'fa' ? product.description : product.descriptionEn}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.standards.slice(0, 3).map((standard) => (
                <Badge key={standard} variant="outline" className="text-xs">{standard}</Badge>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                size="sm"
                variant={isInRFQ ? 'outline' : 'default'}
                onClick={handleAddToRFQ}
                disabled={isInRFQ}
                className={isInRFQ ? '' : 'bg-gradient-accent text-white'}
              >
                {isInRFQ ? (language === 'fa' ? 'در استعلام' : 'In RFQ') : (language === 'fa' ? 'افزودن به استعلام' : 'Add to RFQ')}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-card rounded-xl border border-border hover:border-accent/30 shadow-elegant hover:shadow-elegant-lg transition-smooth overflow-hidden relative"
    >
      {/* Stock Status Badge */}
      {!product.inStock && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="destructive" className="text-xs">
            {language === 'fa' ? 'ناموجود' : 'Out of Stock'}
          </Badge>
        </div>
      )}

      {/* Image Container with Gradient Overlay */}
      <div className="relative aspect-square overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        <img
          src={product.image}
          alt={language === 'fa' ? product.name : product.nameEn}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-all duration-500"
          loading="lazy"
          width="400"
          height="400"
        />
        
        {/* Floating Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            size="sm"
            className="bg-card/95 backdrop-blur-sm text-foreground hover:bg-accent hover:text-white shadow-elegant"
            onClick={handleAddToRFQ}
            disabled={isInRFQ}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="bg-gradient-accent text-white shadow-glow"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Standards Badges */}
        <div className="flex flex-wrap gap-1.5">
          {product.standards.slice(0, 2).map((standard) => (
            <Badge 
              key={standard} 
              variant="secondary" 
              className="text-xs px-2 py-0.5 bg-secondary/50 hover:bg-accent/10 transition-smooth"
            >
              {standard}
            </Badge>
          ))}
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-base leading-tight min-h-[3rem] group-hover:text-accent transition-smooth line-clamp-2">
          {language === 'fa' ? product.name : product.nameEn}
        </h3>

        {/* Category */}
        <p className="text-xs text-muted-foreground font-medium">
          {product.category}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-foreground hover:bg-accent hover:text-white hover:border-accent transition-smooth"
            onClick={handleAddToRFQ}
            disabled={isInRFQ}
          >
            <ShoppingCart className={`w-4 h-4 ${language === 'fa' ? 'ml-1' : 'mr-1'}`} />
            <span className="text-xs font-medium">
              {isInRFQ ? (language === 'fa' ? 'در استعلام' : 'In RFQ') : (language === 'fa' ? 'استعلام' : 'RFQ')}
            </span>
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-accent hover:brightness-110 text-white shadow-sm hover:shadow-glow transition-all"
          >
            <Eye className={`w-4 h-4 ${language === 'fa' ? 'ml-1' : 'mr-1'}`} />
            <span className="text-xs font-medium text-white">
              {language === 'fa' ? 'جزئیات' : 'Details'}
            </span>
          </Button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Link>
  );
};
