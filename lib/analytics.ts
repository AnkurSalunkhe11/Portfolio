'use client';

import { track } from '@vercel/analytics';

// Google Analytics 4 Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views for SPA routing
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title || document.title,
      page_location: url,
    });
  }
};

// Custom event tracking for portfolio interactions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  // Track with Vercel Analytics - only include properties that have values
  const trackingData: Record<string, string | number> = {
    category,
  };
  
  if (label) {
    trackingData.label = label;
  }
  
  if (value !== undefined) {
    trackingData.value = value;
  }

  track(action, trackingData);

  // Track with Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label || undefined,
      value: value,
    });
  }
};

// Portfolio-specific tracking functions
export const analytics = {
  // Export trackEvent as part of analytics object
  trackEvent,

  // Project interactions
  trackProjectView: (projectTitle: string, domain: string) => {
    trackEvent('project_view', 'engagement', `${domain}_${projectTitle}`);
  },

  trackProjectDemo: (projectTitle: string) => {
    trackEvent('project_demo_click', 'engagement', projectTitle);
  },

  trackProjectCode: (projectTitle: string) => {
    trackEvent('project_code_click', 'engagement', projectTitle);
  },

  // Contact form interactions
  trackContactFormStart: () => {
    trackEvent('contact_form_start', 'engagement');
  },

  trackContactFormSubmit: () => {
    trackEvent('contact_form_submit', 'conversion');
  },

  // Resume downloads
  trackResumeDownload: (type: 'cs' | 'mechanical') => {
    trackEvent('resume_download', 'conversion', type);
  },

  trackResumeView: (type: 'cs' | 'mechanical') => {
    trackEvent('resume_view', 'engagement', type);
  },

  // Social media clicks
  trackSocialClick: (platform: string) => {
    trackEvent('social_click', 'engagement', platform);
  },

  // Domain switching
  trackDomainSwitch: (from: string, to: string) => {
    trackEvent('domain_switch', 'engagement', `${from}_to_${to}`);
  },

  // Navigation
  trackNavigation: (section: string) => {
    trackEvent('navigation_click', 'engagement', section);
  },

  // Scroll depth tracking
  trackScrollDepth: (percentage: number) => {
    trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage);
  },

  // Time on page tracking
  trackTimeOnPage: (seconds: number, page: string) => {
    trackEvent('time_on_page', 'engagement', page, seconds);
  },

  // Skills section interaction
  trackSkillHover: (skill: string, domain: string) => {
    trackEvent('skill_hover', 'engagement', `${domain}_${skill}`);
  },

  // Publication/Patent clicks
  trackPublicationClick: (title: string) => {
    trackEvent('publication_click', 'engagement', title);
  },

  trackPatentClick: (title: string) => {
    trackEvent('patent_click', 'engagement', title);
  },

  // Error tracking
  trackError: (error: string, page: string) => {
    trackEvent('error', 'technical', `${page}_${error}`);
  },

  // Performance tracking
  trackPerformance: (metric: string, value: number) => {
    trackEvent('performance', 'technical', metric, value);
  },
};

// Optimized scroll depth tracking utility with throttling
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  let ticking = false;
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          
          thresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !tracked.has(threshold)) {
              tracked.add(threshold);
              analytics.trackScrollDepth(threshold);
            }
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Optimized time tracking utility
export const initTimeTracking = (pageName: string) => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  let lastTrackedTime = 0;
  
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent > lastTrackedTime) {
      analytics.trackTimeOnPage(timeSpent, pageName);
      lastTrackedTime = timeSpent;
    }
  };

  // Track time when user leaves the page
  const handleBeforeUnload = () => trackTime();
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      trackTime();
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Track time at intervals for long sessions (reduced frequency)
  const interval = setInterval(() => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent > 0 && timeSpent % 120 === 0) { // Every 2 minutes instead of 1
      trackTime();
    }
  }, 120000); // 2 minutes

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    clearInterval(interval);
    trackTime(); // Final tracking
  };
};

// Optimized performance monitoring with error handling
export const initPerformanceTracking = () => {
  if (typeof window === 'undefined') return;

  try {
    // Track Core Web Vitals with error handling
    const observer = new PerformanceObserver((list) => {
      try {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            analytics.trackPerformance('LCP', Math.round(entry.startTime));
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEventTiming;
            analytics.trackPerformance('FID', Math.round(fidEntry.processingStart - fidEntry.startTime));
          }
          if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as LayoutShift;
            if (!clsEntry.hadRecentInput) {
              analytics.trackPerformance('CLS', Math.round(clsEntry.value * 1000));
            }
          }
        });
      } catch (error) {
        console.warn('Performance tracking error:', error);
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Track page load time with fallback
    const trackPageLoad = () => {
      try {
        if (performance.timing) {
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
          if (loadTime > 0) {
            analytics.trackPerformance('page_load_time', loadTime);
          }
        }
      } catch (error) {
        console.warn('Page load tracking error:', error);
      }
    };

    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
    }
  } catch (error) {
    console.warn('Performance observer initialization error:', error);
  }
};

// Type declarations for global gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
  
  interface LayoutShift extends PerformanceEntry {
    value: number;
    hadRecentInput: boolean;
  }
}