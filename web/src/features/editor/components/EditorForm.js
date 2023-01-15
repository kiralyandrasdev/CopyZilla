import React, { useContext, useState } from "react";
import { FiChevronLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AsyncButton, DropdownButton, TextArea, TextButton, TextField } from "../../../components";
import { useGetUserQuery } from "../../api/apiSlice";
import { UserContext } from "../../user/context/userContext";
import { processAdvancedPrompt, processQuickPrompt } from "../actions/editorActions";
import { resetEditor, setEditorMode } from "../editorSlice";
import AdvancedPrompt from "../models/advancedPrompt";
import QuickPrompt from "../models/quickPrompt";
import './EditorForm.css';

function EditorForm() {
    const { isLoading, result, error, editorMode } = useSelector(state => state.editor);

    const { firebaseUid } = useSelector(state => state.auth);
    const { user, decreaseCreditCount } = useContext(UserContext);

    const dispatch = useDispatch();

    const outOfCredits = user.creditCount < 1;

    const navigate = useNavigate();

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
            if (subject === null || subject === "") {
                onUpdateSubjectError(true);
                return false;
            } else {
                onUpdateSubjectError(false);
            }

            if (category === null) {
                onUpdateCategoryError(true);
                return false;
            } else {
                onUpdateCategoryError(false);
            }

            if (style === null) {
                onUpdateStyleError(true);
                return false;
            } else {
                onUpdateStyleError(false);
            }
        } else {
            if (advancedPrompt === null || advancedPrompt === "") {
                onUpdateAdvancedPromptError(true);
                return false;
            } else {
                onUpdateAdvancedPromptError(false);
            }
        }

        if (language === null) {
            onUpdateLanguageError(true);
            return false;
        } else {
            onUpdateLanguageError(false);
        }

        return true;
    }

    async function processPrompt() {
        if (!canProcessPrompt()) return;

        decreaseCreditCount();

        if (editorMode === "quickMode") {
            const quickPromptObject = new QuickPrompt(
                subject,
                category.value,
                style.value,
                language.value
            );

            dispatch(processQuickPrompt({ firebaseUid, prompt: quickPromptObject }));
        } else {
            const advancedPromptObject = new AdvancedPrompt(
                advancedPrompt,
                language.value,
            );

            dispatch(processAdvancedPrompt({ firebaseUid, prompt: advancedPromptObject }));
        }
    }

    if (result) {
        return (
            <div className="text-result-page">
                <h2>Result</h2>
                <div className="prompt-result-container">
                    <p>{result}</p>
                </div>
                <TextButton prefixIcon={<FiChevronLeft />} title="Vissza" onClick={() => dispatch(resetEditor())}></TextButton>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-loading-page">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-loading-page">
                <h2>Error: {error}</h2>
            </div>
        );
    }

    return (
        <div id="home">
            <h2>Szerkesztő</h2>
            <div id="editor-mode-toggle">
                <button className={editorMode === "quickMode" ? "active" : ""} onClick={() => dispatch(setEditorMode("quickMode"))}>Gyors mód</button>
                <button className={editorMode === "advancedMode" ? "active" : ""} onClick={() => dispatch(setEditorMode("advancedMode"))}>Haladó mód</button>
            </div >
            <div id="editor-area">
                {
                    editorMode === "quickMode" ?
                        (
                            <div>
                                <TextField
                                    onChange={onUpdateSubject}
                                    value={subject}
                                    error={subjectError}
                                    hint="Kérlek, adj meg egy tárgyat"
                                    title="Tárgy"
                                    description="Lorem ipsum"
                                />
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
                    <AsyncButton enabled={!outOfCredits} title="Rajt!" onClick={processPrompt}></AsyncButton>
                </div>
            </div>
            <div id="prompt-cost-description">
                {
                    outOfCredits ?
                        <>
                            <p className="prompt-cost-description-text">Nincs több kredited!</p>
                            <div style={{ 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center' }}>
                                <TextButton onClick={() => navigate("/user/creditRefill")} color="#6b4eff" title="Vásárolj kreditet"></TextButton>
                                <p style={{ 'margin': '0px 5px' }} className="prompt-cost-description-text">vagy</p>
                                <TextButton color="#6b4eff" title="válts nagyobb csomagra."></TextButton>
                            </div>
                        </>

                        :
                        <p className="prompt-cost-description-text">A szöveg létrehozása 1 kreditet vesz igénybe.</p>
                }
            </div>
        </div >
    );
};

export default EditorForm;