"use client";

import { AuthGuardModal } from "@/components/auth-guard";

export default function SignedOutAppStub() {
  // Public stub: opens Clerk modal and renders nothing
  return <AuthGuardModal>{null}</AuthGuardModal>;
}
