import Link from "next/link";
import { ArrowRight, Check, Shield, Lock, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-[calc(100svh-56px)] bg-gradient-to-b from-background to-muted/40">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 text-center">
          <div className="mx-auto max-w-max">
            <Badge className="gap-2 bg-primary/10 text-primary border-primary/20">
              <Shield className="h-3.5 w-3.5" />
              Enterprise-grade access for everyone
            </Badge>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Ship access controls your users love
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-base sm:text-lg">
            Accessaurus is the easy way to add roles, policies, SSO and audit
            logs to your product. Built for modern Next.js apps.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/app">
              <Button className="gap-2">
                Launch app
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline">Explore features</Button>
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            No credit card required
          </p>
        </div>
      </section>

      <section className="py-6 border-y bg-background/60">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center gap-6 opacity-70">
            {["Acme", "Globex", "Umbrella", "Hooli", "Initech", "Soylent"].map(
              (logo) => (
                <div
                  key={logo}
                  className="text-center text-sm font-medium text-muted-foreground"
                >
                  {logo}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need out of the box
            </h2>
            <p className="mt-3 text-muted-foreground">
              Skip months of plumbing. Drop-in building blocks that scale from
              MVP to enterprise.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Lock className="h-5 w-5" />,
                title: "SSO + MFA",
                desc: "SAML, OAuth, passkeys and magic links included.",
              },
              {
                icon: <ListChecks className="h-5 w-5" />,
                title: "RBAC & ABAC",
                desc: "Roles and fine-grained policies with caching.",
              },
              {
                icon: <Shield className="h-5 w-5" />,
                title: "Audit trails",
                desc: "Immutable logs, alerts and exports for SOC2.",
              },
              {
                icon: <Check className="h-5 w-5" />,
                title: "SDKs",
                desc: "Tiny, typed clients for browser and server.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-medium">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple, usage-based pricing
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start free. Only pay as your users grow.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-lg font-medium">Starter</h3>
                  <p className="text-sm text-muted-foreground">
                    For new products
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">$0</span>
                  <div className="text-xs text-muted-foreground">
                    up to 1k MAU
                  </div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {["Email + OAuth", "Basic roles", "Audit logs (7 days)"].map(
                  (i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> {i}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-6">
                <Link href="/app">
                  <Button className="w-full">Get started</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-lg font-medium">Pro</h3>
                  <p className="text-sm text-muted-foreground">
                    For scaling teams
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">$249</span>
                  <div className="text-xs text-muted-foreground">per month</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "SAML + SCIM",
                  "Advanced policies",
                  "Audit logs (1 year)",
                ].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/app">
                  <Button className="w-full" variant="secondary">
                    Talk to sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have more questions? Reach out to our team any time.
          </p>
          <div className="mt-8 grid gap-6 text-left">
            <div className="rounded-lg border bg-card p-5">
              <h3 className="font-medium">How do I integrate?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Install our SDK and wrap your app. Use our hooks and helpers to
                gate UI and APIs.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <h3 className="font-medium">Do you support SAML?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Yes. Enterprise SSO (SAML) and user provisioning (SCIM) are
                available on Pro.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
