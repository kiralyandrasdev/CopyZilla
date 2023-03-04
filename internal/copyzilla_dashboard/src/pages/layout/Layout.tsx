import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css';
import { getAuth, signOut } from '@firebase/auth';

function Layout() {
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth);
    }

    return (
        <div className={styles.layout}>
            <header>
                <h6>CopyZilla Admin</h6>
                <div className={styles.headerNav}>
                    <a href="/dashboard/users">Users</a>
                    <a href="/dashboard/logs">Logs</a>
                    <p onClick={() => handleSignOut()}>Sign out</p>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;