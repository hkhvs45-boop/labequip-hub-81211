import { X, Minus, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRFQ } from '@/contexts/RFQContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

export const RFQDrawer = () => {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen } = useRFQ();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleSubmitRequest = () => {
    navigate('/contact', { state: { rfqItems: items } });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
     <SheetContent side={language === 'fa' ? 'right' : 'left'} className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            {language === 'fa' ? 'لیست استعلام (RFQ)' : 'Request for Quote'}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Send className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {language === 'fa'
                ? 'لیست استعلام خالی است'
                : 'Your RFQ list is empty'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {language === 'fa'
                ? 'محصولات مورد نظر خود را اضافه کنید'
                : 'Add products to request a quote'}
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-280px)] mt-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="h-7 w-14 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
              <div className="mb-3 text-sm">
                <span className="text-muted-foreground">
                  {language === 'fa' ? 'تعداد اقلام:' : 'Total items:'}
                </span>
                <span className="font-bold mr-2">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <Button className="w-full bg-gradient-accent text-white" size="lg" onClick={handleSubmitRequest}>
                <Send className="w-4 h-4 mr-2" />
                {language === 'fa' ? 'ارسال درخواست' : 'Submit Request'}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
