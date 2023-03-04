import React from 'react'
import { User } from '../../../types';
import styles from './UserListView.module.css';

function UserListView({ user }: { user: User | null}) {
    const date = () => {
        if (user?.createdOn) {
            const date = new Date(user.createdOn);
            return date.toLocaleString();
        }

        return "";
    }

    const containerClass = () => {
        if(user) {
            return styles.container;
        }

        return `${styles.container} ${styles.header}`;
    }

    return (
        <div className={containerClass()}>
            <div className={`${styles.cell} ${styles.cellAlignLeft}`}>
                {user?.firebaseUid || "Firebase UID"}
            </div>
            <div className={styles.cell} >
                {user?.email || "Email address"}
            </div>
            <div className={styles.cell}>
                {user?.creditCount || "Credits"}
            </div>
            <div className={styles.cell}>
                {user?.subscriptionPlanName || "Subscription"}
            </div>
            <div className={styles.cell}>
                {date() || "Registered on"}
            </div>
        </div>
    );
}

export default UserListView;