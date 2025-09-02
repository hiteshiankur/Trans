// Landing Page Data Types for API Integration

export interface HeroSectionData {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServicesSectionData {
  title: string;
  description: string;
  services: ServiceItem[];
}

export interface SafetySectionData {
  title: string;
  description: string;
  buttonText: string;
  vanImage: string;
  quoteIcon: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface StatsSectionData {
  stats: StatItem[];
}

export interface CTASectionData {
  title: string;
  description: string;
  buttonText: string;
  truckImage: string;
}

export interface LandingPageData {
  hero: HeroSectionData;
  services: ServicesSectionData;
  safety: SafetySectionData;
  stats: StatsSectionData;
  cta: CTASectionData;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// API Endpoints
export const LANDING_PAGE_ENDPOINTS = {
  GET_ALL: '/api/landing-page',
  UPDATE_HERO: '/api/landing-page/hero',
  UPDATE_SERVICES: '/api/landing-page/services',
  UPDATE_SAFETY: '/api/landing-page/safety',
  UPDATE_STATS: '/api/landing-page/stats',
  UPDATE_CTA: '/api/landing-page/cta',
} as const;
