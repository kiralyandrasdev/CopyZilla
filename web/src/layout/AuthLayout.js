import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import Header from './header/Header'

export default function AuthLayout() {
    return (
        <div className="layout" id="auth-layout">
            <Header id="auth-header"></Header>
            <div className="layout-content" id="auth-layout-content">
                <Outlet />
            </div>
            <Footer id="auth-footer"></Footer>
        </div>
    )
}