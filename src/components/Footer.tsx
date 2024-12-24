import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      links: [
        { name: 'Content', href: '#' },
        { name: 'Projects', href: '#' },
        { name: 'Podcast', href: '#' },
        { name: 'Newsletter', href: '#' },
        { name: 'Companies', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Library', href: '/library' },
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
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={120} 
                height={32} 
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
                    className="text-lg text-[#28282B] hover:text-[#28282B]/70 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-start space-x-6">
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#28282B] hover:text-[#28282B]/70 transition-colors"
                aria-label={social.label}
              >
                <Image 
                  src={social.icon} 
                  alt={social.label}
                  width={24} 
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-[#28282B]/70">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;