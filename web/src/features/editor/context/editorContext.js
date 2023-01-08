import React, { createContext, useState } from "react";

export const EditorContext = createContext(null);

export const EditorContextProvider = ({ children }) => {
    const [editorState, setEditorState] = useState("initial");
    const [editorResult, setEditorResult] = useState("");

    const updateEditorState = (value) => {
        setEditorState(value);
    }

    const updateEditorResult = (value) => {
        setEditorResult(value);
    }

    const value = {
        editorState,
        updateEditorState,
        editorResult,
        updateEditorResult
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
}