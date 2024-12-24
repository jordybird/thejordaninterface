import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      links: [
        { name: 'Content', href: '/content' },
        { name: 'Projects', href: '/projects' },
        { name: 'Podcast', href: '/show' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
      ]
    }
  ];

  const socialLinks = [
    { icon: '/icons/youtube.svg', href: 'https://www.youtube.com/@TheJordanInterface', label: 'YouTube' },
    { icon: '/icons/instagram.svg', href: 'https://www.instagram.com/jordanncoxx/', label: 'Instagram' },
    { icon: '/icons/linkedin.svg', href: 'https://www.linkedin.com/in/jordanncoxx/', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Logo Section */}
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <img 
                src="/Logo.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-8 flex-grow">
            {footerLinks.map((section) => (
              <div key="main-links" className="grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-6">
                {section.links.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className="text-lg text-[#28282B] hover:text-[#00bfff] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright and Social Links */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#28282B]/70">
              © {currentYear} All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#28282B] hover:text-[#00bfff] transition-colors"
                  aria-label={social.label}
                >
                  <img 
                    src={social.icon}
                    alt={social.label}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;