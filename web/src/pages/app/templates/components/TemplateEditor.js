import React, { useContext } from 'react'
import styles from './TemplateEditor.module.css'
import { TextButton, TextField } from '../../../../components';
import { TemplateContext } from '../../../../features/templates/templateContext';
import { useDeleteEmailTemplateMutation, useSaveEmailTemplateMutation, useUpdateEmailTemplateMutation } from '../../../../features/api/apiSlice';
import { UserContext } from '../../../../features';

function TemplateEditor() {
    const { user } = useContext(UserContext);

    const {
        templateId,
        setTemplateId,
        templateTitle,
        setTemplateTitle,
        templateContent,
        setTemplateContent
    } = useContext(TemplateContext);

    const [
        saveTemplate,
        {
            data: saveTemplateData,
            isLoading: saveTemplateLoading,
            error: saveTemplateError,
            isSuccess: saveTemplateSuccess,
        },
    ] = useSaveEmailTemplateMutation()

    const [
        updateTemplate,
        {
            data: updateTemplateData,
            isLoading: updateTemplateLoading,
            error: updateTemplateError,
            isSuccess: updateTemplateSuccess,
        },
    ] = useUpdateEmailTemplateMutation()

    const [
        deleteTemplate,
        {
            data: deleteTemplateData,
            isLoading: deleteTemplateLoading,
            error: deleteTemplateError,
            isSuccess: deleteTemplateSuccess,
        }
    ] = useDeleteEmailTemplateMutation()

    const actionLoading = saveTemplateLoading || updateTemplateLoading;
    const actionError = saveTemplateError || updateTemplateError;
    const actionSuccess = saveTemplateSuccess || updateTemplateSuccess;

    const handleChangeTemplateTitle = (e) => {
        setTemplateTitle(e.target.value);
    }

    const handleChangeTemplateContent = (e) => {
        setTemplateContent(e.target.value);
    }

    const deleteActive = () => {
        if (templateId && !actionLoading && !deleteTemplateLoading) {
            return true;
        }

        return false;
    }

    const saveOrUpdateActive = () => {
        // Check if template title and content are not empty
        if (templateTitle && templateContent) {
            return true;
        }

        return false;
    }

    const handleDeleteTemplate = () => {
        if (!deleteActive() || deleteTemplateLoading) return;

        deleteTemplate({
            userId: user.id,
            templateId: templateId,
        });

        setTemplateId("");
        setTemplateTitle("");
        setTemplateContent("");
    }

    const handleSaveOrUpdateTemplate = () => {
        if (!saveOrUpdateActive() || actionLoading) return;

        // Check if template id is present to determine if we are updating or saving
        if (templateId) {
            // Update template
            updateTemplate(
                {
                    userId: user.id,
                    template: {
                        id: templateId,
                        title: templateTitle,
                        content: templateContent,
                    }
                });
        } else {
            // Save template
            saveTemplate(
                {
                    userId: user.id,
                    template: {
                        title: templateTitle,
                        content: templateContent,
                    }
                }
            );

            setTemplateTitle("");
            setTemplateContent("");
        }
    }

    return (
        <div className={styles.container}>
            <TextField
                hint="Enter a title for your template"
                noMargin={true}
                onChange={handleChangeTemplateTitle}
                value={templateTitle}
            />
            <textarea
                className={styles.textarea}
                placeholder="Enter your template content"
                onChange={handleChangeTemplateContent}
                value={templateContent}
            />
            <div className={styles.actions}>
                <TextButton
                    title={deleteTemplateLoading ? "Deleting..." : "Delete"}
                    onClick={() => handleDeleteTemplate()}
                    color={deleteActive() ? "white" : "var(--grey3)"}
                />
                <TextButton
                    title={actionLoading ? "Saving..." : "Save"}
                    onClick={() => handleSaveOrUpdateTemplate()}
                    color={saveOrUpdateActive() ? "var(--green)" : "var(--grey3)"}
                />
            </div>
            {actionError && <p className="red">An error occured</p>}
        </div>
    );
}

export default TemplateEditor;