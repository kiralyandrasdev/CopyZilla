import React from 'react'
import styles from './FaqCard.module.css'
import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

function FaqCard({
    question,
    answer,
}) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    let cardStyle = styles.container;

    if (open) {
        cardStyle = `${styles.container} ${styles.open}`;
    }

    return (
        <div className={cardStyle}>
            <div className={styles.question}>
                <h5>{question}</h5>
                {
                    open ? (
                        <FiMinus
                            className={styles.icon}
                            size={24}
                            color="var(--grey5)"
                            onClick={toggleOpen}
                        />
                    ) : (
                        <FiPlus
                            className={styles.icon}
                            size={24}
                            color="var(--grey5)"
                            onClick={toggleOpen}
                        />
                    )
                }
            </div>
            <div className={styles.answer}>
                <p>{answer}</p>
            </div>
        </div>
    );
}

export default FaqCard;