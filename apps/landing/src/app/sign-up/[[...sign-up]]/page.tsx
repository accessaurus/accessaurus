import { SignUp } from '@clerk/nextjs'
import { Container } from '@/components/container'
import { GradientBackground } from '@/components/gradient'
import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Logo } from '@/components/logo'
import { getAppUrl } from '@/lib/config'

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <GradientBackground />
      
      <Container className="relative flex-1 flex flex-col">
        <div className="flex justify-center pt-12 sm:pt-16">
          <Link href="/" title="Home">
            <Logo className="h-10" />
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-center py-12">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-gray-900 hover:bg-gray-800 text-sm normal-case',
                card: 'shadow-xl bg-white',
                headerTitle: 'Create your account',
                headerSubtitle: 'Start making the web accessible with Accessaurus',
                formFieldInput: 'rounded-lg',
                footerActionLink: 'text-gray-900 hover:text-gray-700',
              },
            }}
            afterSignUpUrl={getAppUrl()}
            signInUrl="/sign-in"
            redirectUrl={getAppUrl()}
          />
        </div>
      </Container>
      
      <Footer />
    </div>
  )
}