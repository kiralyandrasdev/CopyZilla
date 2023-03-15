import React from 'react'
import { ClipLoader } from "react-spinners";

type LoadingIndicatorProps = {
    color?: string;
}

function LoadingIndicator(props: LoadingIndicatorProps) {
    return (
        <ClipLoader
            color={props.color ?? '#ffffff'}
            loading={true}
            speedMultiplier={1}
            size="20px"
            aria-label="Loading..."
            data-testid="loader"
        />
    );
}

export default LoadingIndicator;