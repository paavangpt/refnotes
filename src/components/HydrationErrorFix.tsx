'use client';

import React, { useEffect, useState } from 'react';

interface HydrationErrorFixProps {
  children: React.ReactNode;
}

/**
 * This component helps prevent hydration errors by ensuring client-side only rendering
 * for components that might have hydration issues due to browser extensions or other factors.
 */
export default function HydrationErrorFix({ children }: HydrationErrorFixProps) {
  // Use this state to track if we're mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true when component mounts (only happens client-side)
    setIsMounted(true);

    // Clean up browser extension attributes that cause hydration errors
    const attribute = document.body.getAttribute('cz-shortcut-listen');
    if (attribute) {
      document.body.removeAttribute('cz-shortcut-listen');
    }
  }, []);

  // Only render children once we're on the client side
  // This prevents hydration mismatch errors
  if (!isMounted) {
    // Return a placeholder with similar structure to avoid layout shifts
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <>{children}</>;
} 