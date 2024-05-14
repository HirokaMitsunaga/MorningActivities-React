import React from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface LayOutProps {
  children: React.ReactNode
}

export const LayOut: React.FC<LayOutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar>{children}</Sidebar>
    </>
  )
}
