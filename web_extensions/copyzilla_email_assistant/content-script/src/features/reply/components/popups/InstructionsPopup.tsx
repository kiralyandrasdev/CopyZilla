import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './InstructionsPopup.module.css';
import { OptionsContext } from '../../../../context/optionsContext';

type InstructionsPopupProps = {
    onClose: () => void;
}

function InstructionsPopup(props: InstructionsPopupProps) {
    const instructionsText = "You can add instructions to form your reply. You can use this to add a custom message, or to add a link to one or more documents, etc";

    const popupRef = useRef<HTMLDivElement>(null);

    const { options, setInstructions } = useContext(OptionsContext);
    const [instanceInstructions, setInstanceInstructions] = useState<string>(options.instructions ?? '');

    const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            props.onClose();
        }
    }

    useEffect(() => {
        setInstanceInstructions(options.instructions ?? '');

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleClose = () => {
        props.onClose();
    }

    const handleClear = () => {
        setInstanceInstructions('');
    }

    const handleSave = () => {
        setInstructions(instanceInstructions);
        props.onClose();
    }

    return (
        <div ref={popupRef} className={styles.instructionsPopup}>
            <div className={styles.instructionsPopup__content}>
                <label>Instructions</label>
                <p className="description">{instructionsText}</p>
                <textarea
                    value={instanceInstructions}
                    onChange={(e) => setInstanceInstructions(e.target.value)}
                />
                <div className={styles.instructionsPopup__buttons}>
                    <p className="textButton" onClick={handleClear}>Clear</p>
                    <p className="textButton" onClick={handleClose}>Cancel</p>
                    <p className="textButton green" onClick={handleSave}>Save</p>
                </div>
            </div>
        </div>
    );
}

export default InstructionsPopup;