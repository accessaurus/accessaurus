import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 
              'bg-zinc-900 hover:bg-zinc-700 text-sm normal-case',
            card: 'shadow-xl',
            headerTitle: 'Sign in to Accessaurus',
            headerSubtitle: 'Access your accessibility dashboard',
          },
        }}
        afterSignInUrl="/"
        signUpUrl="/sign-up"
      />
    </div>
  )
}