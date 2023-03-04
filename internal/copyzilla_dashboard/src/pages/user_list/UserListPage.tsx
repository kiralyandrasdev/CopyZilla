import React from 'react'
import { useGetUsersQuery } from '../../features/api/apiSlice';
import { User } from '../../types';
import UserListView from './components/UserListView';
import styles from './UserListPage.module.css';
import LoadingIndicator from '../../components/LoadingIndicator';

function UserListPage() {
    const {
        data: users,
        error,
        isLoading,
        isFetching,
    } = useGetUsersQuery({});

    const buildUserList = () => {
        if (users && users.length > 0 && !isLoading && !error) {
            return users.map((user: User) => (
                <UserListView
                    key={user.id}
                    user={user}
                />
            ))
        } else {
            if (isFetching) {
                return (
                    <div className={styles.center}>
                        <LoadingIndicator />
                    </div>
                )
            } else if (error) {
                return <div className={styles.center}>Error: {JSON.stringify(error)}</div>
            }

            return <div className={styles.center}><p>No users found.</p></div>
        }
    }

    return (
        <div className="page">
            <h5>Users</h5>
            <div className="page__content">
                <div className={styles.userList}>
                    <UserListView
                        user={null}
                    />
                    {buildUserList()}
                </div>
            </div>
        </div>
    );
}

export default UserListPage;