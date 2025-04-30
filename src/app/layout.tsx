'use client'

import React from 'react'
import StyledComponentsRegistry from '@/lib/registry'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GlobalStyle } from '@/styles/globalStyles'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Toaster position="top-right" />
          <GlobalStyle />
          <Providers>
              <div id="wrapper">
                <Header />
                <main style={{ flex: 1 }}>{children}</main>
                <Footer />
              </div>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
