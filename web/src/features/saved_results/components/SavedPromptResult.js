import React, { useState } from "react";
import { FiArrowDown, FiArrowUp, FiCopy, FiDelete } from "react-icons/fi";
import './SavedPromptResult.css';

export default function SavedPromptResult(props) {
    const data = props.data;

    const [isExpanded, setIsExpanded] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    let longText = data.content.length > 100;

    const handleCopy = () => {
        navigator.clipboard.writeText(data.content);
    }

    const handleExpand = () => {
        if (longText) {
            setIsExpanded(!isExpanded);
        }
    }

    const handleDelete = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        await new Promise((resolve) => setTimeout(resolve, 600)).then(() => {
            props.onDelete({ userId: data.userId, promptResultId: data.id });
        });
        setIsDeleting(false);
    }

    let pClass = "savedPromptResult__content description";
    if (isExpanded) {
        pClass += " savedPromptResult__content--expanded";
    } else if (longText) {
        pClass += " savedPromptResult__content--collapsed";
    }

    let expandActionClass = "savedPromptResult__action";
    if (longText) {
        expandActionClass += " savedPromptResult__action--active";
    }

    let className = "savedPromptResult animation__fadeInUp dropshadow";
    if (isDeleting) {
        className += " savedPromptResult--deleting";
    }

    return (
        <div className={className} style={isDeleting ? {} : props.style}>
            <h6>{data.title}</h6>
            <p className={pClass}>{data.content}</p>
            <div className="savedPromptResult__action__row">
                <div className="savedPromptResult__action savedPromptResult__action--active" onClick={() => handleCopy()}>
                    <FiCopy className="savedPromptResult__action__icon" />
                    <p>Vágólapra másolás</p>
                </div>
                <div className={expandActionClass} onClick={() => handleExpand()}>
                    {
                        isExpanded ?
                            <>
                                <FiArrowUp className="savedPromptResult__action__icon" />
                                <p>Bezárás</p>
                            </> :
                            <>
                                <FiArrowDown className="savedPromptResult__action__icon" />
                                <p>Kibontás</p>
                            </>
                    }
                </div>
                <div className="savedPromptResult__action savedPromptResult__action--active" onClick={() => handleDelete()}>
                    <FiDelete className="savedPromptResult__action__icon" />
                    <p>Törlés</p>
                </div>
            </div>
        </div>
    );
}