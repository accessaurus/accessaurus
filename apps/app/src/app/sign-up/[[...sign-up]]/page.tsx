import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 
              'bg-zinc-900 hover:bg-zinc-700 text-sm normal-case',
            card: 'shadow-xl',
            headerTitle: 'Create your Accessaurus account',
            headerSubtitle: 'Start making the web accessible',
          },
        }}
        signInUrl="/sign-in"
      />
    </div>
  )
}