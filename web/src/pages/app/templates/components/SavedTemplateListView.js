import React, { useContext } from 'react'
import styles from './SavedTemplateListView.module.css'
import { TemplateContext } from '../../../../features/templates/templateContext';

function SavedTemplateListView({ template }) {
    const {
        templateId,
        setTemplateId,
        setTemplateTitle,
        setTemplateContent,
    } = useContext(TemplateContext);

    const handleSelectTemplate = () => {
        setTemplateId(template.id);
        setTemplateTitle(template.title);
        setTemplateContent(template.content);
    }

    let templateClass = styles.container;

    if(templateId === template.id) {
        templateClass = `${styles.container} ${styles.selected}`;
    }

    let text = template.title;

    if(text.length > 20) {
        text = text.slice(0, 20) + "...";
    }

    return (
        <div className={templateClass} onClick={() => handleSelectTemplate()}>
            <p className="semi-bold">
                {text}
            </p>
        </div>
    );
}

export default SavedTemplateListView;