import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pravaah',
  description: 'iit bbs fest',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
