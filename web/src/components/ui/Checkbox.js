import React from 'react'
import styles from './Checkbox.module.css'

function Checkbox(props) {
    let className = `${styles.checkbox}`;

    if(props.checked) {
        className += ` ${styles.checked}`;
    }

    return (
        <div className={className}>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
            />
        </div>
    );
}

export default Checkbox;