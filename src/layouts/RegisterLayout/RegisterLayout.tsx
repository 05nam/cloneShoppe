import React from 'react'
import Footer from 'src/components/Footer'
import Registerheader from 'src/components/RegisterHeader'
interface props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: props) {
  return (
    <div className='registerlayout'>
      <Registerheader />
      {children}
      <Footer />
    </div>
  )
}
