import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { gaTrackingId } from '../config/envConfig';

const RouteChangeTracker = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        if (gaTrackingId != "DISABLED") {
            ReactGA.send({ hitType: "pageview", page: location.pathname, title: location.pathname });
        }
    }, [location]);

    return (children);
};

export default RouteChangeTracker;