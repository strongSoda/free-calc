// src/components/Navbar.jsx
import { MoonIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import InstallButton from './InstallButton';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.className);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const navLinks = [
    { name: 'All Calculators', href: '/calculators' },
    { name: 'GPA to %', href: '/calculators/gpa-to-percentage' },
    { name: 'RREF', href: '/' },
    { name: 'Volume', href: '/calculators/volume' },
    { name: "Subnet", href: "/calculators/subnet" },
    { name: "BMI", href: "/calculators/bmi" },
    { name: 'Tip', href: '/calculators/tip-calculator' },
    { name: 'Love', href: '/calculators/love-calculator' },
  ];

  return (
    <nav className="w-full bg-surface-light dark:bg-surface-dark border-b border-gray-200/50 dark:border-gray-800/50 fixed top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/calculators" className="font-display text-xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
              Free Calculators
            </a>
          </div>

          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="font-medium text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface-light-hover dark:bg-surface-dark-hover text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark transition-all"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <InstallButton />

          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button 
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface-light-hover dark:bg-surface-dark-hover text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark transition-all"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-surface-light dark:bg-surface-dark border-t border-gray-200/50 dark:border-gray-800/50">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark hover:bg-surface-light-hover dark:hover:bg-surface-dark-hover transition-colors"
            >
              {link.name}
            </a>
          ))}
            <InstallButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;