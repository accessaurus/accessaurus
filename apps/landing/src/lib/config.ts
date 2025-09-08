export const getAppUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
  if (process.env.NODE_ENV === 'production') return 'https://app.accessaurus.com'
  return 'http://localhost:3000'
}

export const getLandingUrl = () => {
  if (process.env.NEXT_PUBLIC_LANDING_URL) return process.env.NEXT_PUBLIC_LANDING_URL
  if (process.env.NODE_ENV === 'production') return 'https://www.accessaurus.com'
  return 'http://localhost:3100'
}

