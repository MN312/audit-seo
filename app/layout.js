export const metadata = {
  title: 'Audit SEO Local',
  description: 'Analysez votre positionnement Google Maps',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
