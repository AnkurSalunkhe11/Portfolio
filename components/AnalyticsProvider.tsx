'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { 
  initGA, 
  trackPageView, 
  initScrollTracking, 
  initTimeTracking, 
  initPerformanceTracking 
} from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    
    // Initialize performance tracking
    initPerformanceTracking();
  }, []);

  useEffect(() => {
    // Track page views for SPA routing
    if (typeof window !== 'undefined') {
      trackPageView(window.location.href);
    }
    
    // Initialize scroll tracking for each page
    const cleanupScroll = initScrollTracking();
    
    // Initialize time tracking for each page
    const cleanupTime = initTimeTracking(pathname);

    return () => {
      cleanupScroll?.();
      cleanupTime?.();
    };
  }, [pathname]);

  return (
    <>
      {children}
      {/* Vercel Analytics Component */}
      <Analytics />
    </>
  );
}