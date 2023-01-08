import React, { useContext } from "react";
import { FiChevronLeft } from 'react-icons/fi';
import { TextButton } from "../../../components";
import { EditorContext } from "../context/editorContext";
import './EditorResult.css';

function EditorResult() {
    const { updateEditorState, editorResult } = useContext(EditorContext)

    const temp = "A modern irodai székek nagy segítséget nyújtanak a munkahelyeken, hogy kényelmesen és biztonságosan dolgozhassanak. A modern irodai székek különféle színekben és stílusokban kaphatók, így könnyen megtalálhatod a megfelelőt az irodádba. A modern irodai székek különböző szövetekből készülnek, amelyek kényelmesek és tartósak. A modern irodai székek kényelmesek és biztonságosak, így segítenek abban, hogy a munkavállalók jól érezzék magukat és hatékonyan dolgozhassanak. A modern irodai székek beállíthatók, így a munkavállalók maguk szabályozhatják azok magasságát. A modern irodai székek különböző funkciókkal rendelkeznek, így kényelmesebbé és hatékonyabbá tehetik a munkavégzést.";

    return (
        <div className="text-result-page">
            <h2>Result</h2>
            <div className="prompt-result-container">
                <p>{temp}</p>
            </div>
            <TextButton prefixIcon={<FiChevronLeft />} title="Vissza" onClick={() => updateEditorState("initial")}></TextButton>
        </div>
    );
}

export default EditorResult;