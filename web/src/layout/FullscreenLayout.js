import React from 'react';
import { Outlet } from 'react-router-dom';
import './FullscreenLayout.css';

function FullscreenLayout() {
    return (
        <div className="layout layout__fullscreen">
            <div className="layout__fullscreen__outlet">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default FullscreenLayout;