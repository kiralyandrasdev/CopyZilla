import React, { useContext, useState } from 'react'
import ReplyType, { ReplyTypeItem } from './ReplyType';
import '../ReplyOptionList.css';
import { AvailableTypes } from '../../config/replyConfig';
import { OptionsContext } from '../../optionsContext';

function ReplyTypeSelector() {
    const { options, setObjective } = useContext(OptionsContext);

    const typeComponents: React.FC = () => {
        return (
            <div className="reply__option__list">
                {AvailableTypes.map(type => (
                    <ReplyType
                        item={{ title: type.title, value: type.value }}
                        isSelected={type.title === options.objective.title}
                        onSelect={(item: ReplyTypeItem) => setObjective(item)}
                    />
                ))}
            </div>
        );
    };

    return typeComponents({});
}

export default ReplyTypeSelector;