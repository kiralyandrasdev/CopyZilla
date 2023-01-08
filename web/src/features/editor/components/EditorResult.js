import React, { useContext } from "react";
import { FiChevronLeft } from 'react-icons/fi';
import { TextButton } from "../../../components";
import { EditorContext } from "../context/editorContext";
import './EditorResult.css';

function EditorResult() {
    const { updateEditorState, editorResult } = useContext(EditorContext)

    return (
        <div className="text-result-page">
            <h2>Result</h2>
            <div className="prompt-result-container">
                <p>{editorResult}</p>
            </div>
            <TextButton prefixIcon={<FiChevronLeft />} title="Vissza" onClick={() => updateEditorState("initial")}></TextButton>
        </div>
    );
}

export default EditorResult;