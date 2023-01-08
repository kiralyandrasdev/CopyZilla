import React, { useState } from "react";
import './ErrorBoundary.css';

export default function ErrorBoundary({ children }) {
    const [error, setError] = useState(false);

    function handleError(error) {
        setError(error);
    }

    if (error) {
        // You can render any custom fallback UI
        return (
            <div className="error-body">
                <h2>Váratlan hiba történt.</h2>
            </div>
        );
    }

    return (children);
}