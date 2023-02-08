import React, { useContext, useRef, useState } from "react";
import ContentLoader from "react-content-loader";
import { BiCopy } from "react-icons/bi";
import { FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolderSvg from "../../../assets/empty_editor.svg";
import { TextButton, TextField } from "../../../components";
import useOutsideAlerter from "../../../components/utils/useOutsideAlerter";
import { useSavePromptResultMutation } from "../../api/apiSlice";
import { savePromptResult } from "../../saved_results/actions/savedResultsActions";
import { pushPromptResult } from "../../saved_results/promptResultsSlice";
import { UserContext } from "../../user/context/userContext";
import './PromptResultView.css';

function ShimmerText() {
    return (
        <ContentLoader width="100%" backgroundColor="#40414F" foregroundColor="#666879">
            <rect x="0" y="0" ry="3" width="80%" height="1em" />
            <rect x="0" y="20" ry="3" width="75%" height="1em" />
            <rect x="0" y="40" ry="3" width="77%" height="1em" />
            <rect x="0" y="60" ry="3" width="67%" height="1em" />
            <rect x="0" y="80" ry="3" width="20%" height="1em" />
        </ContentLoader>
    );
}

function PlaceHolder() {
    return (
        <div className="promptResultView__result__placeholder__container">
            <h6>Konfiguráld a beállításokat, majd kattints a szöveg létrehozás gombra</h6>
            <img className="promptResultView__result__placeholder__svg" src={PlaceHolderSvg} alt="Loading..."></img>
        </div>
    )
}

export default function PromptResultView(props) {
    const { user } = useContext(UserContext);

    const [promptResultTitle, setPromptResultTitle] = useState("");
    const handlePromptResultTitleChange = (e) => {
        setPromptResultTitle(e.target.value);
    }

    const dispatch = useDispatch();

    const { isLoading: isSaving } = useSelector(state => state.promptResults);

    const isEmpty = !props.value;

    const [copyActive, setCopyActive] = useState(false);
    const [saveActive, setSaveActive] = useState(false);

    const handleSaveActive = (value) => {
        setPromptResultTitle("");
        setSaveActive(value);
    }

    const copyPopupRef = useRef(null);
    useOutsideAlerter(copyPopupRef, (() => {
        setCopyActive(false)
    }));

    const savePopupRef = useRef(null);
    useOutsideAlerter(savePopupRef, (() => {
        handleSaveActive(false)
    }));

    const currentDate = new Date();

    const handleCopy = () => {
        if (!props.value || copyActive) return;
        navigator.clipboard.writeText(props.value);
        setCopyActive(true);
        setTimeout(() => {
            setCopyActive(false);
        }, 3000);
    }

    const handleSaveOpen = () => {
        if (saveActive) return;
        handleSaveActive(true);
    }

    const handleSave = () => {
        handleSaveActive(false);
        var payload = {
            userId: user.id,
            promptResult: {
                title: promptResultTitle,
                content: props.value
            }
        };
        dispatch(savePromptResult(payload));

        payload.createdOn = currentDate.toISOString();

        dispatch(pushPromptResult(payload));

        handleSaveActive(false);
    }

    let copyPopupClass = "promptResultView__result__action__copy__popup transition__parent";
    if (copyActive) {
        copyPopupClass += " transition__fadeInUp";
    }

    let actionClass = "promptResultView__result__action";

    let savePopupClass = "save__popup transition__parent dropshadow";
    if (saveActive) {
        savePopupClass += " transition__fadeInUp";
    }

    return (
        <div className="promptResultView">
            {
                props.isLoading ?
                    ShimmerText() :
                    isEmpty ?
                        PlaceHolder()
                        :
                        <div className="promptResultView__result__fulfilled">
                            <div className="promptResultView__result__value animation__fadeInUp">
                                <p>{props.value}</p>
                            </div>
                            <div className="promptResultView__result__action__list">
                                <div ref={savePopupRef} className="promptResultView__result__action__container">
                                    <div className={actionClass} onClick={() => handleSaveOpen()}>
                                        <FiStar></FiStar>
                                        <p>Mentés</p>
                                    </div>
                                    <div className={savePopupClass}>
                                        <h6>Szöveg mentése</h6>
                                        <TextField onChange={handlePromptResultTitleChange} value={promptResultTitle} title="Cím" hint={currentDate.toISOString()}></TextField>
                                        <div className="save__popup__button__row">
                                            <TextButton onClick={handleSave} title="Mentés" color="var(--green)"></TextButton>
                                        </div>
                                    </div>
                                </div>
                                <div ref={copyPopupRef} className="promptResultView__result__action__container">
                                    <div className={actionClass} onClick={() => handleCopy()}>
                                        <BiCopy></BiCopy>
                                        <p>Vágólapra másolás</p>
                                    </div>
                                    <div className={copyPopupClass}>
                                        <p>Vágólapra másolva!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
}