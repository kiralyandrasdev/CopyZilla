import React from 'react'
import { Log } from '../../../types';
import styles from './LogListView.module.css';
import LogDetails from './LogDetails';

function LogListView({ log }: { log: Log | null }) {
    const [showDetails, setShowDetails] = React.useState(false);

    const getMarkerClass = () => {
        if (log?.type === "information") {
            return styles.information;
        } else if (log?.type === "warning") {
            return styles.warning;
        } else if (log?.type === "error") {
            return styles.error;
        } else if (log?.type === "critical") {
            return styles.critical;
        }

        return "";
    }

    const containerClass = () => {
        if(log) {
            return styles.container;
        }

        return `${styles.container} ${styles.header}`;
    }

    return (
        <div className="listView">
            <div className={containerClass()}>
                <div className={styles.cell} >
                    <span className={`${styles.logMarker} ${getMarkerClass()}`}></span>
                    {log?.type || "Type"}
                </div>
                <div className={styles.cell}>
                    {log?.fileName || "File name"}
                </div>
                <div className={styles.cell}>
                    {log?.createdOn || "Created on"}
                </div>
                {log &&
                    <div className={`${styles.cell} ${styles.action}`}>
                        <p>
                            {showDetails ?
                                <span onClick={() => setShowDetails(false)}>Hide</span> :
                                <span onClick={() => setShowDetails(true)}>Details</span>}
                        </p>
                    </div>
                }
            </div>
            {showDetails &&
                    <LogDetails
                        type={log?.type || ""}
                        fileName={log?.fileName || ""}
                    />}
        </div>
    );
}

export default LogListView;