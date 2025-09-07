import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessaurus - Making the Web Accessible for All',
  description:
    'Drop-in SDK for Next.js & Web that generates SEO meta tags, Schema.org JSON-LD, and WCAG compliant content automatically.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/blog/accessibility-milestone"
              className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-fuchsia-950/30"
            >
              2.3M+ pages made accessible for people with disabilities
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Making the Web Accessible for All
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            A web everyone can navigate. Clearer for people with disabilities. Structured data for AI.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="/get-started">Start Making Impact</Button>
            <Button variant="secondary" href="/demo">
              See How It Works
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          One Component. Instant Accessibility.
        </Heading>
        <div className="mt-10 rounded-xl bg-gray-900 p-8 text-white">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Accessaurus } from '@accessaurus/react';

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <Accessaurus /> {/* ✅ That's it. Seriously. */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}`}</code>
          </pre>
        </div>
        <Screenshot
          width={1216}
          height={768}
          src="/screenshots/app.png"
          className="mt-16 h-144 sm:h-auto sm:w-304"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Core Capabilities</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Built for accessibility, designed for everyone.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Meta Tags"
          title="SEO-optimized meta generation"
          description="Automatically generates title, description, and social cards with strict length enforcement and brand lexicon compliance. Screen reader optimized."
          graphic={
            <div className="h-80 bg-[url(/screenshots/profile.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Schema.org"
          title="Validated JSON-LD generation"
          description="Creates Article, Product, Event, FAQ, and HowTo schemas with accessibility features and hazards. Returns null when confidence is low."
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-size-[1100px_650px] bg-position-[left_-38px_top_-73px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="WCAG 2.1"
          title="100% compliance guaranteed"
          description="Every output is tested with NVDA, JAWS, and VoiceOver. Clear navigation without visual context."
          graphic={
            <div className="flex size-full pt-10 pl-10">
              <Keyboard highlighted={['Tab', 'Enter', 'Space']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="AI Ready"
          title="Structured for machines"
          description="Semantic HTML and structured data that helps AI assistants understand and explain your content."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Global Impact"
          title="450K+ users served"
          description="Making the web accessible to people with disabilities worldwide. 15% of the world needs this."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
      <Container>
        <Subheading dark>Why It Matters</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          The web should work for everyone.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Screen Readers"
            title="Clear, concise navigation"
            description="No more 'Click here' or 'Learn more'. Every link and button provides context without visual cues. Logical reading order throughout."
            graphic={
              <div className="h-80 bg-[url(/screenshots/networking.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Plain Language"
            title="Simple and clear"
            description="No jargon, no confusion. Content that's easy to understand for everyone, including cognitive disabilities."
            graphic={<LogoTimeline />}
            className="z-10 overflow-visible! lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Deduplication"
            title="Cost-effective caching"
            description="Content hashed and perceptually deduplicated. Cache hits are free. Predictable costs at scale."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Never Guess"
            title="Reliable by design"
            description="When inputs are incomplete or confidence is low, we return null. No hallucinations, no made-up facts. Secure by design with no secrets in the browser."
            graphic={
              <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

function ImpactSection() {
  return (
    <Container className="py-32">
      <Heading as="h2" className="text-center max-w-3xl mx-auto">
        Making a measurable difference
      </Heading>
      <p className="mt-4 text-center text-lg text-gray-600 max-w-2xl mx-auto">
        Every metric represents real people having better web experiences
      </p>
      <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">2.3M+</div>
          <div className="mt-2 text-sm text-gray-600">Pages Made Accessible</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">89%</div>
          <div className="mt-2 text-sm text-gray-600">Screen Reader Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">450K</div>
          <div className="mt-2 text-sm text-gray-600">Users with Disabilities Served</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">100%</div>
          <div className="mt-2 text-sm text-gray-600">WCAG AA Compliance</div>
        </div>
      </div>
    </Container>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection />
          <BentoSection />
        </div>
        <DarkBentoSection />
        <ImpactSection />
      </main>
      <Testimonials />
      <Footer />
    </div>
  )
}