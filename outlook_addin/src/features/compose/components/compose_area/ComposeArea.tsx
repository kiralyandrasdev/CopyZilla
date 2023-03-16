import React, { useContext, useEffect, useState } from 'react'
import styles from './ComposeArea.module.css'
import { AppContext } from '../../../../context/appContext';
import TextButton, { TextButtonSize } from '../../../../components/TextButton';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { useRephraseSelectionMutation } from '../../../api/apiSlice';
import { UserContext } from '../../../../context/userContext';
import { AuthContext } from '../../../../context/authContext';

function ComposeArea() {
    const { user, decreaseCredits } = useContext(UserContext);
    const { user: firebaseUser } = useContext(AuthContext);

    const { setError, composedEmail, setComposedEmail } = useContext(AppContext);

    const [rephraseOpen, setRephraseOpen] = useState(false);
    const [selection, setSelection] = useState('');

    const [copied, setCopied] = useState(false);

    const [
        rephraseSelection,
        {
            data: rephrasedSelection,
            isLoading: isRephrasing,
            error: rephraseError,
            isSuccess: rephraseSuccess,
        }] = useRephraseSelectionMutation();

    useEffect(() => {
        if (rephraseError) {
            setError(rephraseError as string);
        }

        if (rephraseSuccess) {
            setRephraseOpen(false);
            decreaseCredits();
            setComposedEmail(composedEmail.replace(selection, rephrasedSelection));
        }
    }, [rephraseError, rephraseSuccess, isRephrasing]);

    useEffect(() => {
        const handleMouseUp = async () => {
            const selection = window.getSelection();

            // If text is selected, open popup
            if (selection && selection.toString().trim().length > 0) {
                // Close popup if it's already open
                if (rephraseOpen) {
                    setRephraseOpen(false);

                    // Wait for popup to close before opening it again
                    await new Promise(r => setTimeout(r, 100));
                }

                setRephraseOpen(true);
                setSelection(selection.toString());
            }
        }

        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleCopyToClipboard = () => {
        if (copied || !composedEmail) {
            return;
        }

        setCopied(true);

        navigator.clipboard.writeText(composedEmail);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    const copyActive = () => {
        if (!composedEmail) {
            return false;
        }

        return true;
    }

    const copyColor = () => {
        if (!copyActive()) {
            return 'var(--grey2)';
        }

        return 'var(--grey4)';
    }

    let selectionText = () => {
        if (selection.length > 20) {
            return selection.substring(0, 20) + "...";
        }

        return selection;
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

    const handleRephrase = (objective: string) => {
        if (isRephrasing) return;

        rephraseSelection({
            userId: user?.id || '',
            token: firebaseUser?.token || '',
            options: {
                text: selection,
                objective,
            }
        });
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
        <div className={styles.container}>
            {
                rephraseOpen &&
                <div className={styles.rephrase}>
                    <p>{rephraseText()} "{selectionText()}"</p>
                    <div className={styles.rephraseActions}>
                        {rephraseOptions}
                    </div>
                </div>
            }
            <textarea
                placeholder="Your composed email will appear here..."
                value={composedEmail}
                onChange={(e) => setComposedEmail(e.target.value)}
            />
            <div className="copy">
                <TextButton
                    text={copied ? "Copied to clipboard" : "Copy to clipboard"}
                    onClick={handleCopyToClipboard}
                    customColor={copyColor()}
                    fontSize={TextButtonSize.Small}
                    prefixIcon={copied ? <FiCheck /> : <FiCopy />}
                />
            </div>
        </div>
    );
}

export default ComposeArea;