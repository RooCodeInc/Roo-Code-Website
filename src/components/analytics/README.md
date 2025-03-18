# PostHog Analytics Integration

This directory contains the implementation of PostHog analytics for the Roo Code website.

## Overview

PostHog is an open-source product analytics platform that helps track user behavior on websites and applications. This implementation provides:

1. Automatic page view tracking
2. Utility functions for custom event tracking
3. User identification capabilities (when needed)

## Files

- `posthog-provider.tsx`: A React provider component that initializes PostHog and handles page view tracking
- `../lib/analytics.ts`: Utility functions for working with PostHog throughout the application

## Usage

### Page Views

Page views are automatically tracked by the PostHog provider component, which is included in the root layout.

### Custom Events

To track custom events, import the utility functions from `src/lib/analytics.ts`:

```tsx
import { trackEvent } from '@/lib/analytics';

// Track a simple event
trackEvent('button_clicked');

// Track an event with properties
trackEvent('form_submitted', {
  formType: 'contact',
  success: true,
  timeToComplete: 45
});
```

### User Identification

If you have user authentication, you can identify users:

```tsx
import { identifyUser } from '@/lib/analytics';

// When a user logs in
identifyUser('user-123', {
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'premium'
});

// When a user logs out
import { resetUser } from '@/lib/analytics';
resetUser();
```

### Privacy Controls

The implementation respects Do Not Track settings by default. You can also provide additional opt-out functionality:

```tsx
import { optOut, optIn, hasOptedOut } from '@/lib/analytics';

// Check if user has opted out
if (hasOptedOut()) {
  console.log('User has opted out of analytics');
}

// Let users opt out
optOut();

// Let users opt back in
optIn();
```

## Environment Variables

The implementation uses the following environment variables:

- `NEXT_PUBLIC_POSTHOG_KEY`: Your PostHog API key
- `NEXT_PUBLIC_POSTHOG_HOST`: Your PostHog host URL

For development, these are hardcoded in the provider component. For production, you should set these environment variables in your deployment environment.

## PostHog Dashboard

You can view analytics data in the PostHog dashboard at [https://us.i.posthog.com](https://us.i.posthog.com).