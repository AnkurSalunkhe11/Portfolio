'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';
import { Github, Linkedin, Mail, Heart, Twitter, Globe, Phone, MapPin } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { analytics } from '@/lib/analytics';
import { memo, useCallback } from 'react';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = useCallback((platform: string, url: string) => {
    analytics.trackSocialClick(platform);
    window.open(url, '_blank');
  }, []);

  const handleNavigation = useCallback((section: string) => {
    analytics.trackNavigation(section);
  }, []);

  const socialLinks = [
    {
      icon: Github,
      url: portfolioData.personal.github,
      platform: 'github',
      color: 'hover:bg-slate-700'
    },
    {
      icon: Linkedin,
      url: portfolioData.personal.linkedin,
      platform: 'linkedin',
      color: 'hover:bg-blue-600'
    },
    {
      icon: SiLeetcode,
      url: portfolioData.personal.leetcode,
      platform: 'leetcode',
      color: 'hover:bg-orange-500'
    },
    {
      icon: Twitter,
      url: portfolioData.personal.twitter,
      platform: 'twitter',
      color: 'hover:bg-blue-400'
    },
    {
      icon: Globe,
      url: portfolioData.personal.website,
      platform: 'website',
      color: 'hover:bg-emerald-600'
    },
    {
      icon: Mail,
      url: `mailto:${portfolioData.personal.email}`,
      platform: 'email',
      color: 'hover:bg-red-600'
    }
  ];

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AT</span>
              </div>
              <span className="text-white font-semibold text-lg">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              {portfolioData.personal.bio}
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{portfolioData.personal.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a 
                  href={`mailto:${portfolioData.personal.email}`}
                  className="hover:text-white transition-colors"
                  onClick={() => analytics.trackSocialClick('email')}
                >
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="block text-slate-400 hover:text-white transition-colors focus-ring rounded"
                  onClick={() => handleNavigation(link.label.toLowerCase())}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.platform}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick(social.platform, social.url)}
                  className={`w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white ${social.color} transition-colors focus-ring`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
            <div className="space-y-2 text-sm text-slate-400">
              <p>Available for freelance projects</p>
              <p>Remote or {portfolioData.personal.location}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm flex items-center space-x-2">
              <span>© {currentYear} {portfolioData.personal.name}. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>using Next.js & Tailwind CSS</span>
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/admin" className="hover:text-white transition-colors">
                Admin
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;