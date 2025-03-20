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
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
      
      // Check if environment variables are set
      if (!posthogKey) {
        console.warn(
          'PostHog API key is missing. Analytics will be disabled. ' +
          'Please set NEXT_PUBLIC_POSTHOG_KEY in your .env file.'
        );
        return;
      }
      
      if (!posthogHost) {
        console.warn(
          'PostHog host URL is missing. Using default host. ' +
          'Please set NEXT_PUBLIC_POSTHOG_HOST in your .env file.'
        );
      }
      
      posthog.init(
        posthogKey,
        {
          api_host: posthogHost || 'https://us.i.posthog.com',
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
    // Only track page views if PostHog is properly initialized
    if (pathname && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
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