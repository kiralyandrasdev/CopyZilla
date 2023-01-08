import React, { useContext } from "react";
import { TextButton } from "../components";
import { EditorContext, EditorForm, EditorLoading, EditorResult } from "../features";
import "./Home.css";

function Home() {
    const { editorState, updateEditorState } = useContext(EditorContext);

    console.log(editorState);

    if (editorState == "loading") {
        return <EditorLoading />
    }

    if (editorState == "error") {
        return (
            <div>
                <p style={{ 'margin-bottom': '20px' }}>Váratlan hiba történt.</p>
                <TextButton title="Vissza" onClick={() => updateEditorState("initial")}></TextButton>
            </div>
        );
    }

    if (editorState == "result") {
        return <EditorResult />
    }

    return (
        <EditorForm></EditorForm>
    );
}

export default Home;