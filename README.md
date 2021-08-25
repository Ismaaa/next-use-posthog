# next-use-posthog

This is just a convenience wrapper around [posthog-js](https://github.com/PostHog/posthog-js) for [Next.js](https://nextjs.org)

## Install

`yarn add next-use-posthog`

## Usage

In `pages/_app.js` or `pages/_app.tsx`

### JavaScript

```typescript
import { usePostHog } from 'next-use-posthog'

const App = ({ Component, pageProps }) => {
  usePostHog('API_KEY', {
    api_host: 'https://app.posthog.com',
  })

  return <Component {...pageProps} />
}

export default App
```

### TypeScript

```typescript
import { usePostHog } from 'next-use-posthog'
import { AppProps } from 'next/app'
import { FC } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  usePostHog('API_KEY', {
    api_host: 'https://app.posthog.com',
  })

  return <Component {...pageProps} />
}

export default App
```

### Disable in development

```typescript
import { usePostHog } from 'next-use-posthog'
import { AppProps } from 'next/app'
import { FC } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  usePostHog('API_KEY', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing();
    },
  });

  return <Component {...pageProps} />
}

export default App
```

## Dependencies

- React
- Next.js
