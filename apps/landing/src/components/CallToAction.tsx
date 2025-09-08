import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-teal-600 py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Ready to make the web better for everyone?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white/90">
            Join thousands making their content accessible to people with
            disabilities and preparing for an AI‑powered future. It’s the right
            thing to do — and it’s good for business.
          </p>
          <Button href="/register" color="white" className="mt-10">
            Start Your Impact Journey
          </Button>
        </div>
      </Container>
    </section>
  )
}
