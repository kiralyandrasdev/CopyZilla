import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function LandingLayout(props) {
  return (
    <div className="layout" id={props.id}>
      <Header id="landing-header"></Header>
      <div id="landing-layout-content">
        <Outlet />
      </div>
      <Footer id="landing-footer"></Footer>
    </div>
  )
}