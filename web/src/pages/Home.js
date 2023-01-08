import React, { useContext } from "react";
import { EditorContext, EditorForm, EditorLoading, EditorResult } from "../features";
import "./Home.css";

function Home() {
    const { editorState } = useContext(EditorContext);

    return <EditorResult />

    if (editorState == "loading") {
        return <EditorLoading />
    }

    if (editorState == "error") {
        return <h2>Error</h2>
    }

    if (editorState == "result") {
        return <EditorResult />
    }

    if (editorState == "default") {
        return <h2>Default</h2>
    }

    return (
        <EditorForm></EditorForm>
    );
}

export default Home;