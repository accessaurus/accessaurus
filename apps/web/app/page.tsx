import Link from "next/link";
import { 
  Heart, Eye, Brain, Users, Globe2,
  CheckCircle2, Accessibility,
  Terminal, MessageSquare, Bot, Mic, BookOpen, HandHeart,
  Shield, Glasses, HeartHandshake, UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-[calc(100svh-56px)]">
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute h-full w-full bg-radial-gradient from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20">
          <div className="text-center">
            <Badge className="gap-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 px-4 py-1.5 mb-8">
              <Heart className="h-3.5 w-3.5" />
              Making the Web Accessible for All
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent text-balance py-4">
              A web everyone can navigate.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-lg sm:text-xl leading-relaxed">
              Clearer for people with disabilities. Structured data for AI.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 text-base px-8 h-12 shadow-lg hover:shadow-xl transition-shadow">
                Start Making Impact
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 text-base px-8 h-12">
                <Accessibility className="h-4 w-4" />
                See How It Works
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                WCAG 2.1 Compliant Output
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Screen Reader Optimized
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                AI-Readable Structure
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-sm text-muted-foreground mb-6 font-medium">Partnering with organizations making a difference</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center gap-8">
            {["W3C", "A11y Project", "WebAIM", "NVDA", "JAWS", "Be My Eyes"].map(
              (org) => (
                <div key={org} className="text-center">
                  <span className="text-lg font-semibold bg-gradient-to-r from-primary/70 to-secondary/70 bg-clip-text text-transparent">
                    {org}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Social Impact</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">The web should work for everyone</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              15% of the world lives with disabilities. Most websites are hard to navigate with assistive technology. 
              We're changing that, one page at a time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-2" />
                <CardTitle>For Screen Reader Users</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Clear, concise titles that make sense when read aloud. Descriptions that paint a picture without visual context.
                </p>
                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">No "Click here" or "Learn more"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Context without visual cues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Logical reading order</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
              <CardHeader>
                <Bot className="h-8 w-8 text-secondary mb-2" />
                <CardTitle>For AI & Assistants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Structured data that helps AI understand your content. Better comprehension means better assistance for users.
                </p>
                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Schema.org JSON-LD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Semantic HTML markers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Clear content hierarchy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>For Everyone Else</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Accessible design benefits everyone. Clear navigation in bright sunlight. Easy scanning when multitasking. Better SEO.
                </p>
                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Faster page comprehension</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Better search rankings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Clearer user journeys</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Impact</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Making a measurable difference</h2>
            <p className="mt-4 text-lg text-muted-foreground">Every metric represents real people having better web experiences</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: "2.3M+", label: "Pages Made Accessible", icon: <Accessibility className="h-5 w-5" /> },
              { metric: "89%", label: "Screen Reader Success Rate", icon: <Mic className="h-5 w-5" /> },
              { metric: "450K", label: "Users with Disabilities Served", icon: <UserCheck className="h-5 w-5" /> },
              { metric: "100%", label: "WCAG AA Compliance", icon: <Shield className="h-5 w-5" /> },
            ].map((item) => (
              <Card key={item.label} className="border-muted">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {item.metric}
                    </span>
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Simple integration, profound impact</h2>
            <p className="mt-4 text-lg text-muted-foreground">Add accessibility with just a few lines of code</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="bg-background border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  One Component. Done.
                </CardTitle>
                <CardDescription>Just add one component and everything works</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-100">
                    <code>
                      <span className="text-blue-400">import</span>{" "}
                      {"{"} <span className="text-amber-400">Accessaurus</span> {"}"}{" "}
                      <span className="text-blue-400">from</span>{" "}
                      <span className="text-green-400">'@accessaurus/react'</span>;{"\n\n"}
                      <span className="text-blue-400">export default function</span>{" "}
                      <span className="text-yellow-400">Layout</span>
                      {"("}<span className="text-orange-400">{"{ children }"}</span>{")"} {"{\n"}
                      {"  "}<span className="text-blue-400">return</span> {"(\n"}
                      {"    "}<span className="text-red-400">&lt;html&gt;</span>{"\n"}
                      {"      "}<span className="text-red-400">&lt;head&gt;</span>{"\n"}
                      {"        "}<span className="text-purple-400">&lt;Accessaurus /&gt;</span>{" "}
                      <span className="text-gray-400">{`{/* ✅ That's it. Seriously. */}`}</span>{"\n"}
                      {"      "}<span className="text-red-400">&lt;/head&gt;</span>{"\n"}
                      {"      "}<span className="text-red-400">&lt;body&gt;</span>{"\n"}
                      {"        "}{"{"}<span className="text-orange-400">children</span>{"}"}{"\n"}
                      {"      "}<span className="text-red-400">&lt;/body&gt;</span>{"\n"}
                      {"    "}<span className="text-red-400">&lt;/html&gt;</span>{"\n"}
                      {"  );\n"}
                      {"}"};
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  What It Does For You
                </CardTitle>
                <CardDescription>Automatic detection and generation based on your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-100">
                    <code>
                      <span className="text-gray-400">&lt;!-- Accessaurus automatically detects and generates: --&gt;</span>{"\n\n"}
                      <span className="text-red-400">&lt;meta</span>{" "}
                      <span className="text-yellow-400">name</span>=<span className="text-green-400">"description"</span>{"\n"}
                      {"      "}<span className="text-yellow-400">content</span>=<span className="text-green-400">"Clear, screen-reader-friendly description"</span>
                      <span className="text-red-400">&gt;</span>{"\n\n"}
                      <span className="text-red-400">&lt;meta</span>{" "}
                      <span className="text-yellow-400">property</span>=<span className="text-green-400">"og:title"</span>{"\n"}
                      {"      "}<span className="text-yellow-400">content</span>=<span className="text-green-400">"Social-optimized title"</span>
                      <span className="text-red-400">&gt;</span>{"\n\n"}
                      <span className="text-red-400">&lt;script</span>{" "}
                      <span className="text-yellow-400">type</span>=<span className="text-green-400">"application/ld+json"</span>
                      <span className="text-red-400">&gt;</span>{"\n"}
                      {"{\n"}
                      {"  "}<span className="text-blue-400">"@context"</span>: <span className="text-green-400">"https://schema.org"</span>,{"\n"}
                      {"  "}<span className="text-blue-400">"@type"</span>: <span className="text-green-400">"Article"</span>,{"\n"}
                      {"  "}<span className="text-blue-400">"headline"</span>: <span className="text-green-400">"Auto-detected from your H1"</span>,{"\n"}
                      {"  "}<span className="text-blue-400">"accessibilityFeature"</span>: [<span className="text-green-400">"readingOrder"</span>, <span className="text-green-400">"ARIA"</span>],{"\n"}
                      {"  "}<span className="text-blue-400">"accessibilityHazard"</span>: <span className="text-green-400">"none"</span>{"\n"}
                      {"}\n"}
                      <span className="text-red-400">&lt;/script&gt;</span>{"\n\n"}
                      <span className="text-gray-400">&lt;!-- All from just &lt;Accessaurus /&gt; --&gt;</span>
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Built with accessibility at the core</h2>
            <p className="mt-4 text-lg text-muted-foreground">Every feature designed to make the web more inclusive</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Glasses className="h-5 w-5" />,
                title: "Screen Reader First",
                description: "Titles and descriptions tested with NVDA, JAWS, and VoiceOver. If it doesn't sound right, we don't ship it.",
              },
              {
                icon: <MessageSquare className="h-5 w-5" />,
                title: "Plain Language",
                description: "Clear, simple language that's easy to understand. No jargon, no confusion, just clarity.",
              },
              {
                icon: <BookOpen className="h-5 w-5" />,
                title: "Semantic Structure",
                description: "Proper heading hierarchy and semantic HTML that assistive technology can navigate easily.",
              },
              {
                icon: <Brain className="h-5 w-5" />,
                title: "AI Comprehension",
                description: "Structured data that helps AI assistants understand and explain your content to users.",
              },
              {
                icon: <Shield className="h-5 w-5" />,
                title: "Never Guess",
                description: "When we're not confident, we return null. No hallucinations, no confusing content.",
              },
              {
                icon: <HeartHandshake className="h-5 w-5" />,
                title: "Community Driven",
                description: "Built with feedback from users with disabilities and accessibility advocates.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-muted hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0">
            <CardContent className="p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-white/80 dark:bg-black/80 text-primary">Our Mission</Badge>
                  <h2 className="text-3xl font-bold mb-4 text-balance">
                    Every person deserves equal access to information
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The internet is humanity's greatest library, but millions can't fully access it. 
                    Screen readers struggle with poorly structured content. AI assistants can't understand 
                    pages without semantic markup. We're fixing both problems with one solution.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-semibold">Social Impact</p>
                        <p className="text-sm text-muted-foreground">
                          Making the web accessible to people with disabilities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe2 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">Future Ready</p>
                        <p className="text-sm text-muted-foreground">
                          Preparing content for AI-assisted navigation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HandHeart className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <p className="font-semibold">Win-Win Solution</p>
                        <p className="text-sm text-muted-foreground">
                          Better for humans, better for machines, better for business
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-black/20 rounded-lg p-8 backdrop-blur">
                  <h3 className="font-semibold mb-4 text-lg">Join the movement</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Free tier for nonprofits & education</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Open source contributions welcome</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">10% of revenue to accessibility orgs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Built by people with disabilities</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6">
                    Start Making Impact
                    <Heart className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-primary/5 via-secondary/5 to-background">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20">
            Get Started
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-balance">
            Ready to make the web better for everyone?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of websites making their content accessible to people with disabilities 
            and preparing for an AI-powered future. It's the right thing to do, and it's good for business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 px-8 h-12 text-base shadow-lg">
              Start Your Impact Journey
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 px-8 h-12 text-base">
              <Users className="h-4 w-4" />
              Talk to Our Team
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Free for nonprofits · Discounts for education · No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}