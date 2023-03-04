import React from 'react'
import { ClipLoader } from 'react-spinners';

function LoadingIndicator() {
    return (  
        <ClipLoader
            size={25}
            color={"royalblue"}
            loading={true}
        />
    );
}

export default LoadingIndicator;