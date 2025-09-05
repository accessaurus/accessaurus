"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function AuthGuardModal({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const openedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn && !openedRef.current) {
      openedRef.current = true;
      const redirectUrl =
        typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : "/app";
      openSignIn({ redirectUrl });
    }
  }, [isLoaded, isSignedIn, openSignIn]);

  if (!isLoaded) return null;
  if (!isSignedIn) return null;
  return <>{children}</>;
}
