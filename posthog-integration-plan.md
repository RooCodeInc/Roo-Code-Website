# PostHog Integration Plan

## Current Status
- `posthog-js` package is already installed (v1.231.0)
- No existing PostHog or analytics implementations in the codebase
- Empty `analytics` directory exists in `src/components/`
- Environment variables for development are provided:
  ```
  NEXT_PUBLIC_POSTHOG_KEY=phc_eB6GssOUUixeMfOhTWAY7d1zFKB9w89lW9IRt6peOdr
  NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
  ```

## Implementation Plan

### 1. Create PostHog Provider Component
Create a PostHog provider component in the analytics directory that:
- Initializes PostHog with the provided key and host
- Handles client-side only initialization (to avoid server-side rendering issues)
- Captures page views automatically
- Respects Do Not Track settings

File: `src/components/analytics/posthog-provider.tsx`

### 2. Add PostHog Provider to App Layout
Update the root layout to include the PostHog provider, ensuring it only runs on the client side.

File: `src/app/layout.tsx`

### 3. Create PostHog Utility Functions (Optional)
Create utility functions to make it easier to track custom events throughout the application.

File: `src/lib/analytics.ts`

### 4. Test the Implementation
Verify that PostHog is correctly capturing page views and events by:
- Checking the PostHog dashboard
- Using browser developer tools to confirm network requests to PostHog

## Code Implementation Details

### PostHog Provider Component
```tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as OriginalPostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize PostHog
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        capture_pageview: false, // We'll handle this manually
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            // Log to console in development
            posthog.debug();
          }
        },
        respect_dnt: true, // Respect Do Not Track
      });
    }

    return () => {
      // Cleanup
      posthog.shutdown();
    };
  }, []);

  // Track page views
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return <OriginalPostHogProvider client={posthog}>{children}</OriginalPostHogProvider>;
}
```

### Update to App Layout
```tsx
// In src/app/layout.tsx
import { PostHogProvider } from '@/components/analytics/posthog-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* google site name: https://developers.google.com/search/docs/appearance/site-names */}
        <div itemScope itemType="https://schema.org/WebSite">
          <link itemProp="url" href="https://roocode.com" />
          <meta itemProp="name" content="Roo Code" />
        </div>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
```

### Analytics Utility Functions (Optional)
```typescript
// In src/lib/analytics.ts
import posthog from 'posthog-js';

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  posthog.capture(eventName, properties);
};

// Identify users (if you have user authentication)
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  posthog.identify(userId, properties);
};

// Reset user identity (for logout)
export const resetUser = () => {
  posthog.reset();
};
```

## Next Steps After Implementation
1. Add production environment variables when ready
2. Consider adding more advanced features as needed:
   - Feature flags
   - A/B testing
   - User identification (if you have authentication)
   - Custom event tracking for specific user actions