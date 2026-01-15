// lib/analytics.ts
interface AnalyticsEvent {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

class AnalyticsService {
  private static instance: AnalyticsService
  
  private constructor() {}
  
  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }
  
  trackEvent(event: AnalyticsEvent) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event
      })
    }
  }
  
  trackPageView(path: string, language: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_language: language,
        page_title: document.title
      })
    }
  }
  
  trackLanguageSelection(language: string, source: 'auto' | 'manual' = 'manual') {
    this.trackEvent({
      action: 'language_selection',
      category: 'engagement',
      label: language,
      selection_source: source,
      language: language
    })
  }
  
  trackDemoRequest(source: string) {
    this.trackEvent({
      action: 'demo_request',
      category: 'conversion',
      label: source,
      conversion_type: 'demo_request'
    })
  }
  
  trackPricingPlanClick(plan: string, billing: 'monthly' | 'yearly') {
    this.trackEvent({
      action: 'pricing_plan_click',
      category: 'engagement',
      label: plan,
      plan_type: plan,
      billing_cycle: billing
    })
  }
}

export const analytics = AnalyticsService.getInstance()