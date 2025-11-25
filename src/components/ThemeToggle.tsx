import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'enabled' || (!savedTheme && prefersDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  return (
    <div className="fixed bottom-[25px] left-[25px] z-[99999] w-[60px] h-[60px] md:w-[60px] md:h-[60px]">
      <input 
        type="checkbox" 
        id="darkmode-switch" 
        checked={isDark}
        onChange={toggleTheme}
        className="hidden"
      />
      <label 
        htmlFor="darkmode-switch"
        className="flex items-center justify-center w-full h-full bg-white/15 backdrop-blur-[10px] rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.25)] cursor-pointer transition-all duration-400 hover:scale-110 hover:bg-white/25"
      >
        {/* Sun Icon */}
        <svg 
          className={`w-8 h-8 fill-white absolute transition-all duration-600 ${
            isDark ? 'opacity-0 rotate-90 scale-[0.4]' : 'opacity-100 rotate-0 scale-100'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m11.32 11.32l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m11.32-11.32l1.42-1.42"/>
        </svg>
        
        {/* Moon Icon */}
        <svg 
          className={`w-8 h-8 fill-white absolute transition-all duration-600 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-[0.4]'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </label>
    </div>
  );
};

export default ThemeToggle;
