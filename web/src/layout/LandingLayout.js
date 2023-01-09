import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import Header from './header/Header'

export default function LandingLayout() {
  return (
    <div className="layout" id="landing-layout">
      <Header id="landing-header"></Header>
      <div className="layout-content" id="landing-layout-content">
        <Outlet />
      </div>
      <Footer id="landing-footer"></Footer>
    </div>
  )
}