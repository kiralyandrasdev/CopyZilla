import React, { useContext, useEffect, useState } from 'react'
import styles from './Instructions.module.css';
import { OptionsContext } from '../../../../context/optionsContext';

type InstructionsProps = {
    onClose: () => void;
}

function Instructions(props: InstructionsProps) {
    const { options, setInstructions } = useContext(OptionsContext);
    const [instanceInstructions, setInstanceInstructions] = useState<string>(options.instructions ?? '');

    useEffect(() => {
        setInstanceInstructions(options.instructions ?? '');
    }, []);

    const handleClear = () => {
        setInstanceInstructions('');
    }

    const handleSave = () => {
        setInstructions(instanceInstructions);
        props.onClose();
    }

    const handleClose = () => {
        props.onClose();
    }

    return (
        <div className={styles.instructions}>
            <label>Instructions</label>
            <p className="description">
                You can add instructions to form your email. You can use this to add a custom message, or to add a link to one or more documents, etc
            </p>
            <textarea
                placeholder="Write your instructions here..."
                maxLength={200}
                value={instanceInstructions}
                onChange={(e) => setInstanceInstructions(e.target.value)}
            />
            <div className={styles.instructions__buttons}>
                <p className="textButton" onClick={handleClear}>Clear</p>
                <p className="textButton" onClick={handleClose}>Close</p>
                <p className="textButton green" onClick={handleSave}>Save</p>
            </div>
        </div>
    );
}

export default Instructions;