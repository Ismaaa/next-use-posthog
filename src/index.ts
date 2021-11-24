import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export const usePostHog = (apiKey: string, config?: posthog.Config, name?: string): void => {
  const router = useRouter()

  useEffect((): () => void => {
    const capturePageView = () => posthog.capture('$pageview')
    // Init PostHog
    posthog.init(
      apiKey,
      // disable posthog's default pageview capturing since we already capture on every load
      { capture_pageview: false, ...config },
      name
    )

    // onRouteChangeComplete triggers twice on page loads with query parameters
    // https://github.com/vercel/next.js/issues/11639
    // https://github.com/vercel/next.js/pull/17710/files
    if (!router.asPath.includes('?')) {
      capturePageView()
    }

    router.events.on('routeChangeComplete', capturePageView)
    return () => {
      router.events.off('routeChangeComplete', capturePageView)
    }
  }, [router.events])
}
