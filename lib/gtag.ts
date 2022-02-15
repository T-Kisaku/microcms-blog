import { Event } from '../src/types/googleAnalytics/event'
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''

// IDが取得できない場合を想定する
export const
  existsGaId = GA_ID !== '',
  isOkFirePageView = existsGaId && process.env.NODE_ENV === 'production'

// PVを測定する
export const pageview = (url: string) => {
  window.gtag('config', GA_ID, {
    page_path: url,
  })
}

// GAイベントを発火させる
export const event = ({ action, category, label }: Event) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  })
}
