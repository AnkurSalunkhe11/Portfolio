import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PortfolioDomain = 'cs' | 'mechanical';

interface PortfolioState {
  domain: PortfolioDomain;
  setDomain: (domain: PortfolioDomain) => void;
  getDefaultLanding: () => PortfolioDomain;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      domain: 'cs',
      setDomain: (domain) => set({ domain }),
      getDefaultLanding: () => {
        // Check for admin-configured default landing
        if (typeof window !== 'undefined') {
          const savedLanding = localStorage.getItem('default-landing-domain');
          if (savedLanding && (savedLanding === 'cs' || savedLanding === 'mechanical')) {
            return savedLanding as PortfolioDomain;
          }
        }
        return 'cs'; // fallback default
      },
    }),
    {
      name: 'portfolio-domain',
    }
  )
);