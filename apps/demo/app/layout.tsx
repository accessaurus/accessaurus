export const metadata = {
  title: 'Accessaurus Demo',
  description: 'Div-soup demo page with SDK snippet',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <script async src="http://localhost:3000/api/sdk/snippet" data-org="org_32MNXYYf5LHwlXtyvtBUPFD7WEK"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
