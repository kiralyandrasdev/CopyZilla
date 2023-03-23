import React from 'react'
import styles from './EmailTemplates.module.css'
import SavedTemplateList from './components/SavedTemplateList';
import TemplateEditor from './components/TemplateEditor';

function EmailTemplatesPage() {
    return (
        <div className={styles.container}>
            <h4>📒 Email Templates</h4>
            <p className="description">
                Create and save email templates to use them later in CopyZilla
            </p>
            <div className={styles.row}>
                <SavedTemplateList />
                <TemplateEditor />
            </div>
        </div>
    );
}

export default EmailTemplatesPage;