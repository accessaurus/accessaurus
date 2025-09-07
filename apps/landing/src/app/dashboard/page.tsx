import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getAppUrl } from '@/lib/config'

export default async function DashboardRedirect() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  // Redirect to the main app dashboard
  redirect(getAppUrl())
}