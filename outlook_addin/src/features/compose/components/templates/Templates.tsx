import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Templates.module.css'
import { Template } from '../../../../models/model_template';
import { UserContext } from '../../../../context/userContext';
import { AuthContext } from '../../../../context/authContext';
import { useGetTemplatesQuery } from '../../../api/apiSlice';
import { AppContext } from '../../../../context/appContext';

type TemplatesProps = {
    onClose: () => void;
}

function Templates(props: TemplatesProps) {
    const templateUsageText = "Click on a template to paste it into the text box";

    const popupRef = useRef<HTMLDivElement>(null);

    const { user } = useContext(UserContext);
    const { user: firebaseUser } = useContext(AuthContext);
    const { composedEmail, setComposedEmail } = useContext(AppContext);

    const {
        data: templates,
        isLoading,
        error,
    } = useGetTemplatesQuery({
        userId: user?.id,
        token: firebaseUser?.token,
    });

    const handleClose = () => {
        props.onClose();
    }

    const handleSelectTemplate = (template: Template) => {
        setComposedEmail(template.content);
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

        if (error) {
            return (
                <div className={styles.center}>
                    <p className="description">
                        {JSON.stringify(error)} 🔍
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