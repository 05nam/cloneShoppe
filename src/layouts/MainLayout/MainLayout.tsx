import React from 'react'
import HeaderMain from 'src/components/HeaderMain'
import Footer from 'src/components/Footer'
interface props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: props) {
  return (
    <div className=''>
      <HeaderMain />
      {children}
      <Footer />
    </div>
  )
}
const a = 1
