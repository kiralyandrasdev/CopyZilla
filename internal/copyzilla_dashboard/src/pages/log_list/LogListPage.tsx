import React, { useState } from 'react'
import { useGetLogsQuery } from '../../features/api/apiSlice';
import { Log } from '../../types';
import LogListView from './components/LogListView';
import styles from './LogListPage.module.css';
import LoadingIndicator from '../../components/LoadingIndicator';

const enum LogViewType {
    Information = "information",
    Warning = "warning",
    Error = "error",
    Critical = "critical",
}

function LogListPage() {
    const [type, setType] = useState<LogViewType>(LogViewType.Error);

    const {
        data: logs,
        error,
        isLoading,
        isFetching,
    } = useGetLogsQuery({ type: type.toString() });

    const buildLogList = () => {
        if (logs && logs.length > 0 && !isLoading && !error) {
            return logs.map((log: Log) => (
                <LogListView
                    key={log.fileName}
                    log={log}
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

            return <div className={styles.center}><p>No {type.toString()} logs found.</p></div>
        }
    }

    return (
        <div className="page">
            <h5>Logs</h5>
            <div className="page__content">
                <div className="page__content__header">
                    <div className="page__content__header__item">
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value as LogViewType)}
                        >
                            <option value={LogViewType.Information}>Information</option>
                            <option value={LogViewType.Warning}>Warning</option>
                            <option value={LogViewType.Error}>Error</option>
                            <option value={LogViewType.Critical}>Critical</option>
                        </select>
                    </div>
                </div>
                <div className={styles.logList}>
                    <LogListView
                        log={null}
                    />
                    {buildLogList()}
                </div>
            </div>
        </div>
    );
}

export default LogListPage;