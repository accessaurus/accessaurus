import Link from "next/link";
import { ArrowRight, Check, FileText, Code2, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// (interactive developer/demo components removed per request)

export default function Home() {
  return (
    <div className="min-h-[calc(100svh-56px)] bg-gradient-to-b from-background to-muted/40">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 text-center">
          <div className="mx-auto max-w-max">
            <Badge className="gap-2 bg-primary/10 text-primary border-primary/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Easy for people and search
            </Badge>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Accessible Accessibility
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-base sm:text-lg">Accessaurus helps your website say what it is, so people and search engines get it at a glance.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#features">
              <Button className="gap-2">
                Explore features
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#why">
              <Button variant="outline">Why it matters</Button>
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">No credit card required</p>
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

      <section id="why" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Why it matters</h2>
            <p className="mt-3 text-muted-foreground">Clear for people. Easy to find. Less busywork.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              icon: <FileText className="h-5 w-5" />,
              title: "Clear & friendly",
              desc: "Simple words help everyone, including screen readers.",
            },{
              icon: <Search className="h-5 w-5" />,
              title: "Easier to find",
              desc: "Extra labels help Google understand your pages.",
            },{
              icon: <ShieldCheck className="h-5 w-5" />,
              title: "No guesswork",
              desc: "If we're not sure, we pause instead of guessing.",
            }].map((f) => (
              <div key={f.title} className="rounded-lg border bg-card p-5 shadow-sm">
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

      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What it does</h2>
            <p className="mt-3 text-muted-foreground">Helps explain your pages and keeps things tidy.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FileText className="h-5 w-5" />,
                title: "Writes titles & blurbs",
                desc: "Friendly and the right length.",
              },
              {
                icon: <Code2 className="h-5 w-5" />,
                title: "Adds helpful labels",
                desc: "Tells search what your page is about.",
              },
              {
                icon: <Search className="h-5 w-5" />,
                title: "Synonyms & redirects",
                desc: "Better words for site search.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Built‑in safety",
                desc: "If unsure, we stop and ask for more.",
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

      {null}
    </div>
  );
}
