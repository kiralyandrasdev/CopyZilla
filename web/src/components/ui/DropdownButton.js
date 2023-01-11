import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './DropdownButton.css';

function DropdownButton(props) {
    const [active, setActive] = React.useState(false);

    const handleToggle = () => {
        setActive(!active);
    }

    return (
        <div className="dropdown">
            <label className="dropdown-label">{props.title}</label>
            {props.description === null ? "" : <p className="dropdown-description">{props.description}</p>}
            <div className="dropdown-container" id={props.error ? "dropdown-container-error" : ""} onClick={handleToggle}>
                <p className="dropdown-value">{props.value ? props.value["name"] : "Kérlek válassz..."}</p>
                <div className="dropdown-icon" id="suffixIcon">
                    <FiChevronDown />
                </div>
            </div>
            <div id="dropdown-menu-popup" className={active ? "open" : "closed"}>
                <ul>
                    {props.items.map((item, index) => { return (<li className="dropdown-list-item" key={index} onClick={() => { props.onSelect(item); handleToggle() }}>{item["name"]}</li>) })}
                </ul>
            </div>
        </div>
    );
}

export default DropdownButton;