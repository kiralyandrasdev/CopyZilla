import React, { useContext, useState } from "react";
import { AsyncButton, DropdownButton, TextArea, TextField } from "../../../components";
import { EditorContext } from "../context/editorContext";
import AdvancedPrompt from "../models/advancedPrompt";
import QuickPrompt from "../models/quickPrompt";
import { processAdvancedPrompt, processQuickPrompt } from "../services/editorService";
import './EditorForm.css';

function EditorForm(props) {
    const [editorMode, setEditorMode] = useState("advancedMode");
    const { updateEditorState, updateEditorResult } = useContext(EditorContext);

    const changeEditorMode = (mode) => {
        setEditorMode(mode);
    }

    const categories = [
        {
            "name": "Közösségi média poszt",
            "value": "socialMediaPost"
        },
        {
            "name": "Közösségi média bio",
            "value": "socialMediaBio"
        }
    ]

    const styles = [
        {
            "name": "Általános",
            "value": "casual"
        },
        {
            "name": "Hivatalos",
            "value": "formal"
        }
    ]

    const languages = [
        {
            "name": "Magyar",
            "value": "hu"
        },
        {
            "name": "Angol",
            "value": "en"
        }
    ]

    const [advancedPrompt, setCustomPrompt] = useState("");
    const [advancedPromptError, setAdvancedPromptError] = useState(false);

    const onUpdateAdvancedPrompt = (event) => {
        setCustomPrompt(event.target.value);
    }

    const onUpdateAdvancedPromptError = (value) => {
        setAdvancedPromptError(value);
    }

    const [subject, setSubject] = useState("");
    const [subjectError, setSubjectError] = useState(false);

    const onUpdateSubject = (event) => {
        setSubject(event.target.value);
    }

    const onUpdateSubjectError = (value) => {
        setSubjectError(value);
    }

    const [category, setCategory] = useState();
    const [categoryError, setCategoryError] = useState(false);

    const onUpdateCategory = (value) => {
        setCategory({ value: value.value, name: value.name });
    }

    const onUpdateCategoryError = (value) => {
        setCategoryError(value);
    }

    const [style, setStyle] = useState();
    const [styleError, setStyleError] = useState(false);

    const onUpdateStyle = (value) => {
        setStyle({ value: value.value, name: value.name });
    }

    const onUpdateStyleError = (value) => {
        setStyleError(value);
    }

    const [language, setLanguage] = useState(languages[0]);
    const [languageError, setLanguageError] = useState(false);

    const onUpdateLanguage = (value) => {
        setLanguage({ value: value.value, name: value.name });
    }

    const onUpdateLanguageError = (value) => {
        setLanguageError(value);
    }

    function canProcessPrompt() {
        if (editorMode === "quickMode") {
            if (subject == null || subject == "") {
                onUpdateSubjectError(true);
                return false;
            } else {
                onUpdateSubjectError(false);
            }

            if (category == null) {
                onUpdateCategoryError(true);
                return false;
            } else {
                onUpdateCategoryError(false);
            }

            if (style == null) {
                onUpdateStyleError(true);
                return false;
            } else {
                onUpdateStyleError(false);
            }
        } else {
            if (advancedPrompt == null || advancedPrompt == "") {
                onUpdateAdvancedPromptError(true);
                return false;
            } else {
                onUpdateAdvancedPromptError(false);
            }
        }

        if (language == null) {
            onUpdateLanguageError(true);
            return false;
        } else {
            onUpdateLanguageError(false);
        }

        return true;
    }

    async function processPrompt() {
        if (!canProcessPrompt()) return;

        console.log('Processing prompt: ${editorMode}');

        updateEditorState("loading");

        let success = true;

        if (editorMode == "quickMode") {
            const quickPromptObject = new QuickPrompt(
                subject,
                category.value,
                style.value,
                language.value
            );

            await processQuickPrompt(quickPromptObject)
                .then((result) => {
                    const data = result.data;
                    console.log(data);
                    updateEditorResult(data.value);
                }).catch((error) => {
                    console.log(error);
                    success = false;
                });
        } else {
            const advancedPromptObject = new AdvancedPrompt(
                advancedPrompt,
                language.value,
            );

            await processAdvancedPrompt(advancedPromptObject)
                .then((result) => {
                    const data = result.data;
                    updateEditorResult(data.value);
                }).catch((error) => {
                    console.log(error);
                    success = false;
                });
        }

        if (!success) {
            updateEditorState("error");
            return;
        }

        updateEditorState("result");
    }

    function delay(time) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), time);
        });
    }

    return (
        <div id="home">
            <h2>Szerkesztő</h2>
            <div id="editor-mode-toggle">
                <button className={editorMode === "quickMode" ? "active" : ""} onClick={() => changeEditorMode("quickMode")}>Gyors mód</button>
                <button className={editorMode === "advancedMode" ? "active" : ""} onClick={() => changeEditorMode("advancedMode")}>Haladó mód</button>
            </div>
            <div id="editor-area">
                {
                    editorMode === "quickMode" ?
                        (
                            <div>
                                <TextField onChange={onUpdateSubject} value={subject} error={subjectError} hint="Kérlek, adj meg egy tárgyat" title="Tárgy" description="Lorem ipsum"></TextField>
                                <DropdownButton error={categoryError} value={category} onSelect={onUpdateCategory} title="Kategória" items={categories}></DropdownButton>
                                <DropdownButton error={styleError} value={style} onSelect={onUpdateStyle} title="Stílus" items={styles}></DropdownButton>

                            </div>
                        ) :
                        (
                            <div>
                                <TextArea title="Egyéni parancs" hint="Lorem ipsum dolor sit amet." description="Lorem ipsum dolor sit amet." value={advancedPrompt} onChange={onUpdateAdvancedPrompt} error={advancedPromptError}></TextArea>
                            </div>
                        )
                }
                <DropdownButton error={languageError} value={language} onSelect={onUpdateLanguage} title="Nyelv" items={languages}></DropdownButton>
                <div className="process-prompt-button">
                    <AsyncButton title="Rajt!" onClick={processPrompt}></AsyncButton>
                </div>
            </div>
            <p id="prompt-cost-description">A szöveg létrehozása 1 kreditet vesz igénybe.</p>
        </div>
    );
};

export default EditorForm;