import React, { useState } from 'react'
import ReplyType, { ReplyTypeItem } from './ReplyType';
import '../ReplyOptionList.css';

function ReplyTypeSelector() {
    const types: ReplyTypeItem[] = [
        {
            title: 'Say yes 👍',
        },
        {
            title: 'Say no 👎',
        },
        {
            title: 'Acknowledge 👌',
        },
/*         {
            title: 'Ask a question ❓',
        }, */
        {
            title: 'Say thanks 🙏',
        },
    ];

    const [currentType, setCurrentType] = useState(types[0]);

    const typeComponents: React.FC = () => {
        return (
            <div className="reply__option__list">
                {types.map(type => (
                    <ReplyType
                        item={{ title: type.title} }
                        isSelected={type.title === currentType.title}
                        onSelect={(item: ReplyTypeItem) => setCurrentType(item)}
                    />
                ))}
            </div>
        );
    };

    return typeComponents({});
}

export default ReplyTypeSelector;