import React from 'react'
import styles from './Checkbox.module.css'
import { FiCheck } from 'react-icons/fi'

function Checkbox(props) {
    let className = `${styles.checkbox}`;

    if (props.checked) {
        className += ` ${styles.checked}`;
    }

    if(props.error) {
        className += ` ${styles.error}`;
    }

    return (
        <div className={className} onClick={() => props.onChange()}>
            <FiCheck 
                color="white"
                size={12}
            />
        </div>
    );
}

export default Checkbox;