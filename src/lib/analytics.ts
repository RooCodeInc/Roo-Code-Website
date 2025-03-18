import posthog from 'posthog-js';

/**
 * Track a custom event with optional properties
 * @param eventName The name of the event to track
 * @param properties Optional properties to include with the event
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

/**
 * Identify a user with optional properties
 * @param userId The unique identifier for the user
 * @param properties Optional user properties to set
 */
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties);
  }
};

/**
 * Reset the current user's identity (typically used on logout)
 */
export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset();
  }
};

/**
 * Enable or disable session recording
 * @param enabled Whether session recording should be enabled
 */
export const setSessionRecording = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    if (enabled) {
      posthog.startSessionRecording();
    } else {
      posthog.stopSessionRecording();
    }
  }
};

/**
 * Check if the current user has opted out of tracking
 * @returns Boolean indicating if the user has opted out
 */
export const hasOptedOut = (): boolean => {
  if (typeof window !== 'undefined') {
    return posthog.has_opted_out_capturing();
  }
  return false;
};

/**
 * Opt out of tracking for the current user
 */
export const optOut = () => {
  if (typeof window !== 'undefined') {
    posthog.opt_out_capturing();
  }
};

/**
 * Opt in to tracking for the current user
 */
export const optIn = () => {
  if (typeof window !== 'undefined') {
    posthog.opt_in_capturing();
  }
};