import React from 'react'
import { Log } from '../../../types';
import styles from './LogDetails.module.css';
import { useDownloadLogQuery } from '../../../features/api/apiSlice';
import LoadingIndicator from '../../../components/LoadingIndicator';

function LogDetails({ type, fileName }: { type: string, fileName: string }) {
    const {
        data: log,
        error,
        isLoading,
        isFetching,
    } = useDownloadLogQuery({ type: type, fileName: fileName });

    const splitLines = (content: string) => {
        return content.split("\n").map((line, index) => {
            const lineStyle = line.startsWith("[") ? { backgroundColor: "#ffcccc" } : {};
            return <span key={index} style={lineStyle}>{line}<br /></span>
        });
    }

    const buildDetails = () => {
        if (log && !isLoading && !error) {
            return <code>{splitLines(log.content)}</code>
        } else {
            if (isFetching) {
                return (
                    <div className={styles.center}>
                        <LoadingIndicator />
                    </div>
                )
            } else if (error) {
                return <p>Error: ${JSON.stringify(error)}</p>;
            }

            return <p>Log file is empty</p>;
        }
    }

    return (
        <div className={styles.container}>
            {buildDetails()}
        </div>
    );
}

export default LogDetails;