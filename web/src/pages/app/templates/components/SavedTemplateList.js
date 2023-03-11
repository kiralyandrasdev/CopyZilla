import React, { useContext } from 'react'
import styles from './SavedTemplateList.module.css'
import SavedTemplateListView from './SavedTemplateListView';
import { AsyncButton } from '../../../../components';
import { useGetEmailTemplatesQuery } from '../../../../features/api/apiSlice';
import { UserContext } from '../../../../features';
import ContentLoader from 'react-content-loader';
import { TemplateContext } from '../../../../features/templates/templateContext';

function ShimmerItem() {
    return (
        <ContentLoader width="100%" backgroundColor="#40414F" foregroundColor="#666879" className={styles.shimmerItem}>
            <rect x="0" y="0" ry="8" width="100%" height="45px" />
        </ContentLoader>
    );
}


function SavedTemplateList(props) {
    const { user } = useContext(UserContext);

    const {
        setTemplateId,
        setTemplateTitle,
        setTemplateContent,
    } = useContext(TemplateContext);

    const {
        data: templates,
        error,
        isFetching,
        isLoading,
    } = useGetEmailTemplatesQuery({ userId: user.id }, { skip: !user.id });

    const handleAddNew = () => {
        setTemplateId("");
        setTemplateTitle("");
        setTemplateContent("");
    }

    const content = () => {
        if (isFetching || isLoading || !templates) {
            return [0, 1, 2, 3, 4, 5].map((i) => (
                <ShimmerItem key={i} />
            ));
        }

        if (error) {
            return <p className="description">Something went wrong 😔</p>
        }

        if (templates.length === 0) {
            return (
                <p className="description">You don't have any saved templates yet 🔍</p>
            )
        }

        return templates.map((template) => (
            <SavedTemplateListView
                key={template.id}
                template={template}
            />
        ));
    }


    return (
        <div className={styles.container}>
            <div className={styles.addBtn}>
                <AsyncButton
                    title="Add new"
                    onClick={() => handleAddNew()}
                />
            </div>
            <div className={styles.items}>
                {content()}
            </div>
        </div>
    );
}

export default SavedTemplateList;