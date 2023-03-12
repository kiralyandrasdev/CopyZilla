import React, { useEffect, useRef, useState } from 'react'
import styles from './Rephrase.module.css'
import { parseTextBox } from '../../../../utils/emailUtils';

type RephraseProps = {
    selection: string;
    onClose: () => void;
}

function Rephrase(props: RephraseProps) {
    const popupRef = useRef<HTMLDivElement>(null);

    const [isRephrasing, setIsRephrasing] = useState(false);

    const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            props.onClose();
        }
    }

    let selectionText = () => {
        if (props.selection.length > 20) {
            return props.selection.substring(0, 20) + "...";
        }

        return props.selection;
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleRephrase = (objective: string) => {
        if(isRephrasing) return;

        setIsRephrasing(true);

        chrome.runtime.sendMessage({
            type: 'to_background_REPHRASE',
            data: {
                selection: props.selection,
                objective: objective,
                currentContent: parseTextBox()
            }
        }, (_) => {
            setIsRephrasing(false);
            props.onClose();
        });
    }

    const rephraseText = () => {
        if (isRephrasing) {
            return "Rephrasing...";
        }

        return "Rephrase";
    }

    const buttonClass = () => {
        if (isRephrasing) {
            return styles.button + " " + styles.disabled;
        }

        return styles.button;
    }

    const button = (name: string) => {
        return (
            <p className={buttonClass()} onClick={() => handleRephrase(name)}>{name}</p>
        );
    }

    const rephraseOptionList = [
        "Reword",
        "Shorter",
        "Longer",
        "More formal",
        "More casual"
    ]

    const rephraseOptions = rephraseOptionList.map((option) => {
        return button(option);
    });

    return (
        <div ref={popupRef} className={styles.container}>
            <p>{rephraseText()} "{selectionText()}"</p>
            <div className={styles.actions}>
                {rephraseOptions}
            </div>
        </div>
    );
}

export default Rephrase;