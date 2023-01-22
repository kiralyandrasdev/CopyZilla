import React from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarNavItem.css";

export default function SidebarNavItem(props) {
    const navigate = useNavigate();

    let className = "sidebar__main__nav__item";
    if (props.active) {
        className += " sidebar__main__nav__item--active";
    }

    const style = () => {
        let style = {};

        if (props.color) {
            style = { ...style, 'backgroundColor': props.color }
        }

        return style;
    }

    const textStyle = () => {
        let style = {};

        if (props.textColor) {
            style = { ...style, 'color': props.textColor }
        }

        return style;
    }

    return (
        <div className={className} onClick={() => navigate(props.path)} style={style()}>
            {props.icon ?
                <div className="sidebar__main__nav__item__icon">
                    {props.icon}
                </div> : <span></span>
            }
            <p style={textStyle()}>{props.text}</p>
        </div>
    );
}