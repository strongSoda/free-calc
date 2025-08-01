// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Math Calculators",
      links: [
        { name: "GPA to Percentage", url: "/calculators/gpa-to-percentage" },
        { name: "Percentage to GPA", url: "/calculators/percentage-to-gpa" },
        { name: "Matrix RREF", url: "/" },
        { name: "Shape Volume", url: "/calculators/volume" },        
        { name: "Standard Deviation", url: "/calculators/standard-deviation" },        
        { name: "Number to Roman", url: "/calculators/roman-numerals" },        
      ]
    },
    {
      title: "Utility Calculators",
      links: [
        { name: "Subnet ipv4/6", url: "/calculators/subnet" },
        { name: "BMI", url: "/calculators/bmi" },
        { name: "Tip & Bill Split", url: "/calculators/tip-calculator" },  
        { name: "Love Percentage", url: "/calculators/love-calculator" }, 
        { name: "Pregnancy Due Date", url: "/calculators/pregnancy" },        
        { name: "Period", url: "/calculators/period" },        
        { name: "Body Fat", url: "/calculators/body-fat" },        
      ]
    },
    {
      title: "Tools",
      links: [        
        { name: "Dice Roller", url: "/calculators/dice-roller" },        
        { name: "Zip Code Lookup", url: "/calculators/zip-lookup" },        
        { name: "IP Lookup", url: "/calculators/ip-lookup" },        
        { name: "QR Maker", url: "/calculators/qr-code" },        
        { name: "Color Picker", url: "/calculators/color-picker" },        
        { name: "Binary Translator", url: "/calculators/binary-translator" },        
      ]
    },
    {
      title: "Algebra Calculators",
      links: [
        { name: "Quadratic Equation", url: "/calculators/quadratic-equation" },        
        { name: "Fraction to Decimal", url: "/calculators/fractions" },        
      ]
    },
    {
      title: "Chemistry Calculators",
      links: [
        { name: "Half Life", url: "/calculators/half-life" },
        { name: "Power Converter", url: "/calculators/power" },
      ]
    },
    {
      title: "Finance Calculators",
      links: [
        { name: "Mortgage", url: "/calculators/mortgage" },        
      ]
    },
    {
      title: "About",
      links: [
        { name: "Blog", url: "/blog" },
        { name: "About Us", url: "/calculators" },
        { name: "Monthly Hackathon", url: "/hackathon" },
        { name: "Sitemap", url: "/sitemap" },
        { name: "Contact", url: "mailto:contact@rref-calculator.com" },
      ]
    },
    {
      title: "Cool Websites",
      external: true,
      links: [
        { name: "Anime Wallpapers", url: "https://anime-pfp.com" },
        { name: "Link In Bio", url: "https://worldclass.domains" },
        { name: "AI Shorts", url: "https://aivideo.to" },
        { name: "Coding Tutorials", url: "https://jutsupoint.com" },
        { name: "AI Directory", url: "https://spiff.store" },
        { name: "Shop Pebble Ice Maker", url: "https://shoppebbleicemaker.com/" },
        { name: "PDF to JPG", url: "https://formatfile.com/pdf-to-jpg/" },
        { name: "JPG to PDF", url: "https://formatfile.com/jpg-to-pdf/" },
        // { name: "Grading Systems", url: "#" },
        // { name: "Academic Scales", url: "#" },
        // { name: "Grade Conversion", url: "#" }
      ]
    },
  ];

  return (
    <footer className="mt-24 border-t border-gray-100 dark:border-gray-700 bg-surface-light-hover dark:bg-surface-dark-hover">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
              Free Calculators
            </h2>
            <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
              Free online academic calculators and conversion tools for students and educators.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a href="https://twitter.com/ehthing" target="_blank" className="text-content-light-dimmed hover:text-accent-primary dark:text-content-dark-dimmed dark:hover:text-accent-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="https://github.com/strongSoda/" target="_blank"  className="text-content-light-dimmed hover:text-accent-primary dark:text-content-dark-dimmed dark:hover:text-accent-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@JutsuPoint" target="_blank" className="text-content-light-dimmed hover:text-accent-primary dark:text-content-dark-dimmed dark:hover:text-accent-primary transition-colors">
  <span className="sr-only">YouTube</span>
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
</a>
            </div>

            <a href="https://www.buymeacoffee.com/h2G9AoyC6" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{height: "auto", width: "150px"}} className="mt-5" /></a>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-lg text-content-light dark:text-content-dark mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-content-light-dimmed hover:text-accent-primary dark:text-content-dark-dimmed dark:hover:text-accent-primary transition-colors"
                      {...(section.external ? { target: "_blank" } : {})}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/10 dark:border-gray-800/10">
          <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-content-light-dimmed dark:text-content-dark-dimmed text-sm">
              © {currentYear} Free Calculators. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm text-content-light-dimmed hover:text-accent-primary dark:text-content-dark-dimmed dark:hover:text-accent-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;