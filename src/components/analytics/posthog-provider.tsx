'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as OriginalPostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize PostHog only on the client side
    if (typeof window !== 'undefined') {
      posthog.init(
        process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_eB6GssOUUixeMfOhTWAY7d1zFKB9w89lW9IRt6peOdr',
        {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
          capture_pageview: false, // We'll handle this manually
          loaded: (posthogInstance) => {
            if (process.env.NODE_ENV === 'development') {
              // Log to console in development
              posthogInstance.debug();
            }
          },
          respect_dnt: true, // Respect Do Not Track
        }
      );
    }

    // No explicit cleanup needed for posthog-js v1.231.0
  }, []);

  // Track page views
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return <OriginalPostHogProvider client={posthog}>{children}</OriginalPostHogProvider>;
}