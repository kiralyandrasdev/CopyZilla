import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsyncButton, DropdownButton, TextButton, TextField } from "../../components";
import SwitchButton from "../../components/ui/SwitchButton";
import { processAdvancedPrompt, processQuickPrompt } from "../../features/editor/actions/editorActions";
import PromptResultView from "../../features/editor/components/PromptResultView";
import AdvancedPrompt from "../../features/editor/models/advancedPrompt";
import QuickPrompt from "../../features/editor/models/quickPrompt";
import { UserContext } from "../../features/user/context/userContext";
import "./Create.css";

const testresult = "A 20. századi magyarországi kommunizmus egy olyan politikai rendszer volt, amely a szovjet típusú szocializmus alapelveit követte. A kommunizmus Magyarországon 1945-ben kezdődött, amikor a Szovjetunió megszállta az országot. A kommunizmus alatt a magyarokat egy állami kontrollált gazdasági és politikai rendszer alá helyezték. A kormányzat a szocialista pártokon keresztül irányította az országot, és korlátozta a polgárok szabadságát. A kommunizmus alatt a magyaroknak számos korlátozással kellett szembenézniük. A kormányzat korlátozta a szabad véleménynyilvánítást, a média szabályozását, a szakszervezeteket és a vallási szervezeteket. A kommunizmus alatt a magyaroknak csak korlátozott szabadságuk volt, és a kormányzat szigorúan ellenőrizte a polgárok mindennapi életét. A kommunizmus alatt a magyarok számára számos problémával kellett szembenézniük. A kormányzat korlátozta a gazdasági fejlődést, ami a magyarok számára komoly anyagi nehézségeket okozott. A kommunizmus alatt a magyaroknak számos szociális problémával kellett szembenézniük, beleértve a munkanélküliséget, a magas létminimumot és a magas inflációt. A 20. századi magyarországi kommunizmus 1989-ben ért véget, amikor a szovjet típusú szocializmus bukott. Azóta Magyarország egy demokratikus országgá vált, és a polgárok számos szabadságot élveznek. Azóta Magyarország sikeresen fejlődik, és a magyarok életminősége jelentősen javult.";
const testresult2 = "asd";

export default function CreatePage() {
    const { firebaseUid } = useSelector((state) => state.auth);
    const { user, decreaseCreditCount } = useContext(UserContext);

    const outOfCredits = user.creditCount < 1;
    const processEnabled = !outOfCredits && user.creditCount;

    const { isLoading, result: resultText, error } = useSelector(state => state.editor);

    const dispatch = useDispatch();

    const [mode, setMode] = useState("quickMode");
    const handleModeChange = (value) => {
        if (mode === value) return;
        setMode(value);
    };

    // Subject for the quick mode
    const [subject, setSubject] = useState("");
    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };
    const [subjectError, setSubjectError] = useState(false);

    // Category for the quick mode
    const [category, setCategory] = useState(null);
    const handleCategoryChange = (value) => {
        setCategory(value);
    };
    const [categoryError, setCategoryError] = useState(false);
    const categories = [
        {
            "name": "Közösségi média poszt",
            "value": "socialMediaPost"
        },
        {
            "name": "Közösségi média bio",
            "value": "socialMediaBio"
        },
        {
            "name": "Közösségi média reklám",
            "value": "socialMediaAd"
        },
        {
            "name": "Blog poszt",
            "value": "blogPost"
        },
        {
            "name": "Esszé",
            "value": "essay"
        }
    ]

    // Style for the quick mode
    const [style, setStyle] = useState(null);
    const handleStyleChange = (value) => {
        setStyle(value);
    };
    const [styleError, setStyleError] = useState(false);
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

    // Language for the quick mode
    const [language, setLanguage] = useState(null);
    const handleLanguageChange = (value) => {
        setLanguage(value);
    };
    const [languageError, setLanguageError] = useState(false);
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

    // Advanced prompt for the advanced mode
    const [advancedPrompt, setAdvancedPrompt] = useState("");
    const handleAdvancedPromptChange = (event) => {
        setAdvancedPrompt(event.target.value);
    };
    const [advancedPromptError, setAdvancedPromptError] = useState(false);

    function canProcessPrompt() {
        if (mode === "quickMode") {
            if (subject === null || subject === "") {
                setSubjectError(true);
                return false;
            } else {
                setSubjectError(false);
            }

            if (category === null) {
                setCategoryError(true);
                return false;
            } else {
                setCategoryError(false);
            }

            if (style === null) {
                setStyleError(true);
                return false;
            } else {
                setStyleError(false);
            }
        } else {
            if (advancedPrompt === null || advancedPrompt === "") {
                setAdvancedPromptError(true);
                return false;
            } else {
                setAdvancedPromptError(false);
            }
        }

        if (language === null) {
            setLanguageError(true);
            return false;
        } else {
            setLanguageError(false);
        }

        return true;
    }

    async function processPrompt() {
        if (!canProcessPrompt()) return;

        decreaseCreditCount();

        if (mode === "quickMode") {
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

            console.log(advancedPromptObject);
            dispatch(processAdvancedPrompt({ firebaseUid, prompt: advancedPromptObject }));
        }
    }

    const modeContainer = () => {
        let quickModeOptionsClass = "modeOptions modeOptions__quickMode";
        let advancedModeOptionsClass = "modeOptions modeOptions__advancedMode";

        if (mode === "quickMode") {
            quickModeOptionsClass += " modeOptionse--active";
            advancedModeOptionsClass += " modeOptions--inactive";
        } else {
            advancedModeOptionsClass += " modeOptions--active";
            quickModeOptionsClass += " modeOptions--inactive";
        }

        return (
            <div className="section__modeOptions">
                <div className={quickModeOptionsClass}>
                    <TextField error={subjectError} onChange={handleSubjectChange} value={subject} title="Téma" hint="Adj meg egy általad kiválasztott témát"></TextField>
                    <div className="modeOptions__settings">
                        <DropdownButton error={categoryError} onSelect={handleCategoryChange} placeholder="Kategória" value={category} items={categories}></DropdownButton>
                        <DropdownButton error={styleError} onSelect={handleStyleChange} placeholder="Stílus" value={style} items={styles}></DropdownButton>
                        <DropdownButton error={languageError} onSelect={handleLanguageChange} placeholder="Nyelv" value={language} items={languages}></DropdownButton>
                    </div>
                </div>
                <div className={advancedModeOptionsClass}>
                    <TextField error={advancedPromptError} onChange={handleAdvancedPromptChange} value={advancedPrompt} title="Szöveg" hint="Írd be a szöveget, amit szeretnél generálni"></TextField>
                    <div className="modeOptions__settings">
                        <DropdownButton error={languageError} onSelect={handleLanguageChange} placeholder="Nyelv" value={language} items={languages}></DropdownButton>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="page page__createPage animation__fadeInUp">
            <h4>Létrehozása</h4>
            <PromptResultView isLoading={isLoading} value={resultText}></PromptResultView>
            <div className="createPage__modeToggleRow">
                <SwitchButton active={mode == "quickMode"} onClick={() => handleModeChange("quickMode")} title="Gyors mód"></SwitchButton>
                <SwitchButton active={mode == "advancedMode"} onClick={() => handleModeChange("advancedMode")} title="Haladó mód"></SwitchButton>
            </div>
            {modeContainer()}
            <AsyncButton enabled={processEnabled} onClick={processPrompt} loading={isLoading} title="Szöveg létrehozás"></AsyncButton>
            {
                outOfCredits &&
                <div className="outOfCredits__section">
                    <p className="centered-text">Nincs több kredited.</p>
                    <TextButton color="#38FFC3" title="Vásárolj kreditet"></TextButton>
                    <p>vagy</p>
                    <TextButton color="#38FFC3" title="válts nagyobb csomagra"></TextButton>
                </div>
            }
        </div>
    )
}