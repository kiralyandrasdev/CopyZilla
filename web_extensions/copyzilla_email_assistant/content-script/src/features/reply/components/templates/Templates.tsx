import React, { useEffect, useRef, useState } from 'react'
import styles from './Templates.module.css'
import { Template } from '../../../../../../src/features/models/model_template';

type TemplatesProps = {
    onClose: () => void;
}

function Templates(props: TemplatesProps) {
    const templateUsageText = "Click on a template to paste it into the reply box";

    const popupRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [templates, setTemplates] = useState<Template[]>([]);

    const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            props.onClose();
        }
    }

    useEffect(() => {
        setIsLoading(true);

        document.addEventListener('mousedown', handleClickOutside);

        chrome.runtime.sendMessage({
            type: 'to_background_GET_TEMPLATES'
        }, (response: any) => {
            setTemplates(response.data);
            setIsLoading(false);
        });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleClose = () => {
        props.onClose();
    }

    const handleSelectTemplate = (template: Template) => {
        chrome.runtime.sendMessage({
            type: 'to_background_SELECT_TEMPLATE',
            data: template.content,
        });
        props.onClose();
    }

    const content = () => {
        if (isLoading) {
            return (
                <div className={styles.center}>
                    <p className="description">
                        Loading your templates 📚
                    </p>
                </div>
            );
        }

        if (templates.length === 0) {
            return (
                <div className={styles.center}>
                    <p className="description">
                        You don't have any saved templates yet 🔍
                    </p>
                </div>
            );
        }

        if (!templates) {
            return (
                <div className={styles.center}>
                    <p className="description">
                        Something went wrong 😢
                    </p>
                </div>
            );
        }

        return (
            <div className={styles.templateList}>
                {
                    templates.map((template: Template) => {
                        return (
                            <div className={styles.template} onClick={() => handleSelectTemplate(template)}>
                                <p>{template.title}</p>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    return (
        <div ref={popupRef} className={styles.container}>
            <div className={styles.container__content}>
                <label>Templates</label>
                <p className="description">{templateUsageText}</p>
                {content()}
                <div className={styles.container__buttons}>
                    <p className="textButton" onClick={() => handleClose()}>Close</p>
                </div>
            </div>
        </div>
    );
}

export default Templates;