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

    let style = {};

    if (props.hasOwnProperty("color")) {
        style.backgroundColor = props.color;
    }

    const prefixIcon = () => {
        if (props.hasOwnProperty("prefixIcon")) {
            return <img style={style} src={props.prefixIcon} className="asyncButton__prefixIcon"></img>
        }

        return null;
    }

    return (
        <div className={className} style={style} onClick={onClick}>
            {
                loading === true ?
                    <ClipLoader
                        loading={true}
                        color="black"
                        cssOverride={{}}
                        speedMultiplier={1}
                        size="20px"
                    /> :
                    <div className="semi-bold asyncButton__content">
                        {prefixIcon()}
                        {props.title || "Button"}
                    </div>
            }
        </div>
    );
}

export default AsyncButton;