import React, { useContext, useEffect, useState } from 'react'
import styles from './Instructions.module.css';
import { OptionsContext } from '../../optionsContext';
import TextButton, { TextButtonSize } from '../../../../components/TextButton';

type InstructionsProps = {
    onClose: () => void;
}

function Instructions(props: InstructionsProps) {
    const { options, setInstructions } = useContext(OptionsContext);

    const handleClear = () => {
        setInstructions('');
    }

    const handleClose = () => {
        props.onClose();
    }

    return (
        <div className={styles.instructions}>
            <p className="description">
                You can add instructions to form your email. You can use this to add a custom message, or to add a link to one or more documents, etc
            </p>
            <textarea
                placeholder="Write your instructions here..."
                maxLength={200}
                value={options.instructions}
                onChange={(e) => setInstructions(e.target.value)}
            />
            <div className={styles.instructions__buttons}>
                <TextButton
                    text="Clear"
                    onClick={handleClear}
                    fontSize={TextButtonSize.Small}
                />
                <TextButton
                    text="Close"
                    onClick={handleClose}
                    fontSize={TextButtonSize.Small}
                />
            </div>
        </div>
    );
}

export default Instructions;