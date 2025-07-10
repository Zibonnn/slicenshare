import "./globals.css"

export const metadata = {
  title: "Slice N Share - Empowering Esports Talent",
  description: "Join us early — as a user, a believer, or a backer.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=bebas-neue@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white overflow-x-hidden font-general-sans">
        {children}
      </body>
    </html>
  )
}
