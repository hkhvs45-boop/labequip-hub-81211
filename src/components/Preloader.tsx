import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Hide preloader after page loads
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Show for 2 seconds minimum

    // Also hide when window fully loads
    window.addEventListener('load', () => {
      setTimeout(() => setIsLoaded(true), 500);
    });

    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999999] flex items-center justify-center overflow-hidden transition-opacity duration-[1200ms] ${
        isLoaded ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}
      style={{
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      }}
    >
      <div 
        className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[8px] uppercase"
        style={{
          fontFamily: "'Montserrat', 'Vazirmatn', sans-serif",
          textShadow: `
            0 0 10px rgba(0, 255, 255, 0.8),
            0 0 20px rgba(0, 255, 255, 0.6),
            0 0 40px rgba(0, 255, 255, 0.4)
          `,
          animation: 'petroRotate 3.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        }}
      >
        Petropalayesco
      </div>

      <style>{`
        @keyframes petroRotate {
          0%, 100% {
            transform: perspective(800px) rotateY(0deg) rotateX(0deg);
            text-shadow: 
              0 0 10px rgba(0, 255, 255, 0.8),
              0 0 20px rgba(0, 255, 255, 0.6),
              0 0 40px rgba(0, 255, 255, 0.4);
          }
          25% {
            transform: perspective(800px) rotateY(15deg) rotateX(10deg);
            text-shadow: 
              10px 5px 15px rgba(255, 0, 255, 0.7),
              20px 10px 30px rgba(255, 0, 255, 0.5);
          }
          50% {
            transform: perspective(800px) rotateY(0deg) rotateX(0deg);
            text-shadow: 
              0 0 15px rgba(255, 255, 0, 0.8),
              0 0 30px rgba(255, 255, 0, 0.6);
          }
          75% {
            transform: perspective(800px) rotateY(-15deg) rotateX(-10deg);
            text-shadow: 
              -10px -5px 15px rgba(0, 255, 128, 0.7),
              -20px -10px 30px rgba(0, 255, 128, 0.5);
          }
        }

        @media (max-width: 768px) {
          .petro-3d-text {
            font-size: 36px;
            letter-spacing: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
