import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppFloat = () => {
  const { language } = useLanguage();
  
  const phoneNumber = "989123456789"; // Update with actual company WhatsApp number
  const message = language === 'fa' 
    ? "سلام 👋\nاز سایت پترو پالایش تماس می‌گیرم 🔬\nسوال یا درخواست مشاوره دارم..."
    : "Hello 👋\nI'm contacting from Petro Palayesh website 🔬\nI have a question or consultation request...";
  
  const tooltipText = language === 'fa'
    ? "سوال داری؟ همین الان چت کن!"
    : "Have a question? Chat now!";

  return (
    <div className="fixed bottom-6 left-6 z-[9999] font-sans">
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        title={language === 'fa' ? "چت در واتس‌اپ" : "Chat on WhatsApp"}
        className="group relative flex items-center justify-center w-16 h-16 md:w-[65px] md:h-[65px] bg-[#25d366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 animate-pulse-soft"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp"
          className="w-9 h-9 md:w-10 md:h-10 brightness-0 invert"
        />
        
        {/* Tooltip - Desktop Only */}
        <span className="hidden md:block absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-800 text-white px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:left-[85px] transition-all duration-[350ms] shadow-[0_4px_15px_rgba(0,0,0,0.3)] before:content-[''] before:absolute before:right-[-8px] before:top-1/2 before:-translate-y-1/2 before:border-8 before:border-transparent before:border-l-gray-900 dark:before:border-l-gray-800">
          {tooltipText}
        </span>
      </a>
      
      <style>{`
        @keyframes pulse-soft {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        .animate-pulse-soft {
          animation: pulse-soft 2.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppFloat;
