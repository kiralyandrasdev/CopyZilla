import React from 'react';
import { ClipLoader } from 'react-spinners';
import './AsyncButton.css';

function AsyncButton(props) {
    let id;

    if (props.hasOwnProperty("enabled") && !props.enabled) {
        id = "async-button-disabled";
    }

    const loading = props.hasOwnProperty("loading") && props.loading;

    const onClick = () => {
        if (!props.hasOwnProperty("enabled")) {
            props.onClick();
            return;
        }

        if (props.enabled) {
            props.onClick();
        }
    }

    return (
        <div className="async-button-container">
            {
                loading === true ?
                    <ClipLoader
                        loading={true}
                        color="black"
                        cssOverride={{}}
                        speedMultiplier={1}
                        size="20px"
                    /> :
                    <button className="async-button" id={id} onClick={onClick}>{props.title || "Button"}</button>
            }
        </div>
    );
}

export default AsyncButton;