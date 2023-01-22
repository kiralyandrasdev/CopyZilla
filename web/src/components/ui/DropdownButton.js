import React, { useRef } from 'react';
import useOutsideAlerter from '../utils/useOutsideAlerter';
import './DropdownButton.css';

function DropdownButton(props) {
    const [active, setActive] = React.useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, (() => setActive(false)));

    const handleToggle = () => {
        setActive(!active);
    }

    let contentClass = "dropdown__button__content";
    if (props.error) {
        contentClass += " dropdown__button__content__error";
    }

    let menuClass = "dropdown__button__menu transition__parent";
    if (active) {
        menuClass += " dropdown__button__menu__active transition__fadeInUp";
    }

    let valueClass = "dropdown__button__value";
    if (props.value) {
        valueClass = "dropdown__button__value__selected";
    }

    return (
        <div ref={wrapperRef} className="dropdown__button">
            <label>{props.title}</label>
            {props.description === null ? "" : <p className="dropdown__button__description">{props.description}</p>}
            <div className={contentClass} onClick={handleToggle}>
                <p className={valueClass}>{props.value ? props.value["name"] : props.placeholder || "Kérlek válassz..."}</p>
                {/*                 <FiChevronDown className="dropdown__button__value__suffix" />
 */}            </div>
            <div className={menuClass}>
                <ul>
                    {props.items.map((item, index) => { return (<li key={index} onClick={() => { props.onSelect(item); handleToggle() }}>{item["name"]}</li>) })}
                </ul>
            </div>
        </div>
    );
}

export default DropdownButton;