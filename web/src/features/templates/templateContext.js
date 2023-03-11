import React, { createContext } from 'react'

export const TemplateContext = createContext({
    templateId: "",
    templateTitle: "",
    templateContent: "",
});

export default function TemplateContextProvider({ children }) {
    const [templateId, setTemplateId] = React.useState("");
    const [templateTitle, setTemplateTitle] = React.useState("");
    const [templateContent, setTemplateContent] = React.useState("");

    return (
        <TemplateContext.Provider value={{
            templateId,
            setTemplateId,
            templateTitle,
            setTemplateTitle,
            templateContent,
            setTemplateContent,
        }}>
            {children}
        </TemplateContext.Provider>
    );
}