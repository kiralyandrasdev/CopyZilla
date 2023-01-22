import React from 'react';
import { ClipLoader } from 'react-spinners';
import './AsyncButton.css';

function AsyncButton(props) {
    let className = "asyncButton";

    if (props.hasOwnProperty("enabled") && !props.enabled) {
        className += "  asyncButton__disabled";
    }

    if (props.hasOwnProperty("shrinked") && props.shrinked) {
        className += "  asyncButton__shrinked";
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
        <div className={className}>
            {
                loading === true ?
                    <ClipLoader
                        loading={true}
                        color="black"
                        cssOverride={{}}
                        speedMultiplier={1}
                        size="20px"
                    /> :
                    <button className="semi-bold" onClick={onClick}>{props.title || "Button"}</button>
            }
        </div>
    );
}

export default AsyncButton;