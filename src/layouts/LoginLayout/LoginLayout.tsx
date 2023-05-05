import React from 'react'
import Footer from 'src/components/Footer'
import LoginHeader from 'src/components/Loginheader'

interface props {
  children?: React.ReactNode
}

export default function LoginLayout({ children }: props) {
  return (
    <div>
      <LoginHeader />
      {children}
      <Footer />
    </div>
  )
}
