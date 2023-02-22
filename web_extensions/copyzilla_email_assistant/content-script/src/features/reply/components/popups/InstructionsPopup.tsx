import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './InstructionsPopup.module.css';
import { OptionsContext } from '../../../../context/optionsContext';

type InstructionsPopupProps = {
    onClose: () => void;
}

function InstructionsPopup(props: InstructionsPopupProps) {
    const instructionsText = "Add meg a leveled mondani kívánt üzenetét, és hagyd, hogy megfogalmazzuk helyetted."

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
                <label>Utasítások</label>
                <p className="description">{instructionsText}</p>
                <textarea
                    value={instanceInstructions}
                    onChange={(e) => setInstanceInstructions(e.target.value)}
                />
                <div className={styles.instructionsPopup__buttons}>
                    <p className="textButton" onClick={handleClear}>Törlés</p>
                    <p className="textButton" onClick={handleClose}>Mégse</p>
                    <p className="textButton green" onClick={handleSave}>Mentés</p>
                </div>
            </div>
        </div>
    );
}

export default InstructionsPopup;