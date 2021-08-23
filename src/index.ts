import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export const usePostHog = (apiKey: string, config?: posthog.Config, name?: string): void => {
  const router = useRouter()

  useEffect((): () => void => {
    // Init PostHog
    posthog.init(apiKey, config, name)

    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
}
