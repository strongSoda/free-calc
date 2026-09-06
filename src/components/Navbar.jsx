// src/components/Navbar.jsx
import { MoonIcon, SunIcon, MenuIcon, XIcon, ChevronDownIcon } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import InstallButton from './InstallButton';

// A handful of direct links, then grouped menus. Keeping the bar to four
// items stops it wrapping onto a second line on narrower laptops.
const PRIMARY_LINKS = [
  { name: 'All Calculators', href: '/calculators' },
  { name: 'RREF', href: '/' },
];

const MENUS = [
  {
    name: 'Matrix',
    links: [
      { name: 'RREF Calculator', href: '/' },
      { name: 'Determinant', href: '/calculators/matrix-determinant' },
      { name: 'Transpose', href: '/calculators/matrix-transpose' },
      { name: 'Inverse', href: '/calculators/matrix-inverse' },
      { name: 'Gaussian Elimination', href: '/calculators/gaussian-elimination' },
      { name: 'LU Decomposition', href: '/calculators/lu-decomposition' },
      { name: 'Diagonalize', href: '/calculators/diagonalize-matrix' },
    ],
  },
  {
    name: 'Calculus',
    links: [
      { name: 'Laplace Transform', href: '/calculators/laplace-transform' },
      { name: 'Inverse Laplace', href: '/calculators/inverse-laplace-transform' },
      { name: 'Partial Fractions', href: '/calculators/partial-fraction-decomposition' },
      { name: 'Triple Integral', href: '/calculators/triple-integral' },
      { name: 'Line Integral', href: '/calculators/line-integral' },
      { name: 'Lagrange Multiplier', href: '/calculators/lagrange-multiplier' },
      { name: 'Quadratic Equation', href: '/calculators/quadratic-equation' },
    ],
  },
  {
    name: 'More',
    links: [
      { name: 'GPA to Percentage', href: '/calculators/gpa-to-percentage' },
      { name: 'Percentage to GPA', href: '/calculators/percentage-to-gpa' },
      { name: 'Standard Deviation', href: '/calculators/standard-deviation' },
      { name: 'Volume', href: '/calculators/volume' },
      { name: 'Subnet', href: '/calculators/subnet' },
      { name: 'BMI', href: '/calculators/bmi' },
      { name: 'Arrow FOC', href: '/calculators/foc-calculator' },
      { name: 'Calcolo Codice Fiscale', href: '/it/codice-fiscale', hrefLang: 'it' },
    ],
  },
];

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    setTheme(document.documentElement.className);
  }, []);

  // Close any open dropdown on outside click or Escape.
  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const linkClass =
    'font-medium whitespace-nowrap text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark transition-colors';

  return (
    <nav
      ref={navRef}
      className="w-full bg-surface-light dark:bg-surface-dark border-b border-gray-200/50 dark:border-gray-800/50 fixed top-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <a
            href="/calculators"
            className="font-display text-xl font-bold whitespace-nowrap bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text"
          >
            Free Calculators
          </a>

          {/* Desktop navigation — flex-nowrap keeps it on one line */}
          <div className="hidden lg:flex items-center flex-nowrap gap-6">
            {PRIMARY_LINKS.map((link) => (
              <a key={link.name} href={link.href} className={linkClass}>
                {link.name}
              </a>
            ))}

            {MENUS.map((menu) => (
              <div
                key={menu.name}
                className="relative"
                onMouseEnter={() => setOpenMenu(menu.name)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openMenu === menu.name}
                  onClick={() => setOpenMenu(openMenu === menu.name ? null : menu.name)}
                  className={`${linkClass} inline-flex items-center gap-1`}
                >
                  {menu.name}
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${openMenu === menu.name ? 'rotate-180' : ''}`}
                  />
                </button>

                {/*
                  Always rendered, hidden with CSS rather than unmounted, so the
                  links stay in the HTML for crawlers and are not lost when the
                  menu is closed.
                */}
                <div
                  className={`absolute left-0 top-full pt-2 w-60 transition-opacity duration-150 ${
                    openMenu === menu.name
                      ? 'opacity-100 visible'
                      : 'opacity-0 invisible pointer-events-none'
                  }`}
                >
                  <ul className="rounded-xl border border-gray-200/20 dark:border-gray-800/50 bg-surface-light dark:bg-surface-dark shadow-xl py-2">
                    {menu.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          hrefLang={link.hrefLang}
                          className="block px-4 py-2 text-sm text-content-light-dimmed dark:text-content-dark-dimmed hover:text-accent-primary hover:bg-surface-light-hover dark:hover:bg-surface-dark-hover transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full bg-surface-light-hover dark:bg-surface-dark-hover text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark transition-all"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <InstallButton />
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full bg-surface-light-hover dark:bg-surface-dark-hover text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark transition-all"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              className="p-2 rounded-lg text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu: grouped, scrollable, always in the HTML */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 max-h-[70vh] overflow-y-auto bg-surface-light dark:bg-surface-dark border-t border-gray-200/50 dark:border-gray-800/50">
          {PRIMARY_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark hover:bg-surface-light-hover dark:hover:bg-surface-dark-hover transition-colors"
            >
              {link.name}
            </a>
          ))}

          {MENUS.map((menu) => (
            <div key={menu.name} className="mt-3">
              <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-content-light-dimmed/70 dark:text-content-dark-dimmed/70">
                {menu.name}
              </div>
              {menu.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  hrefLang={link.hrefLang}
                  className="block px-3 py-2 rounded-md text-base font-medium text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark hover:bg-surface-light-hover dark:hover:bg-surface-dark-hover transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          ))}

          <div className="mt-3 px-3">
            <InstallButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
