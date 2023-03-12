import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styles from './VersionScroll.module.css'
import VersionView from './VersionView';
import { ClipLoader } from 'react-spinners';

function VersionScroll() {
    const items = [
        {
            version: '1.0.0',
            date: new Date(2023, 1, 28),
            updates: [
                "CopyZilla has launched 🎉",
            ],
        },
        {
            version: '1.0.1',
            date: new Date(2023, 2, 1),
            updates: [
                "Added support for Outlook",
                "Content script fixes"
            ],
        },
        {
            version: '1.0.2',
            date: new Date(2023, 2, 4),
            updates: [
                "Extension auth fixes",
            ],
        },
        {
            version: '1.0.3',
            date: new Date(2023, 2, 5),
            updates: [
                "Extension auth post-fix",
            ],
        },
        {
            version: '2.0.0',
            date: new Date(2023, 2, 12),
            updates: [
                "Feature: Email Templates 🔥",
                "Minor improvements",
            ],
        },
        {
            version: '2.1.0',
            date: new Date(2023, 2, 13),
            currentVersion: true,
            updates: [
                "Feature: Rephrasing 🔥",
            ],
        },
        {
            version: '2.1.1',
            date: new Date(2023, 2, 17),
            updates: [
                "Minor improvements",
            ],
        },
        {
            version: '2.1.2',
            date: new Date(2023, 2, 23),
            updates: [
                "Edge Add-on support",
            ],
        },
        {
            version: '2.1.3',
            date: new Date(2023, 2, 25),
            updates: [
                "Migrating to GPT-3.5",
            ],
        },
    ];

    const [scrollIndex, setScrollIndex] = React.useState(items.indexOf(items.find(version => version.currentVersion)));
    const [adjusting, setAdjusting] = React.useState(false);

    const visibleItems = () => {
        if (adjusting) {
            return items;
        }
        // If window width is less or equal to 1300px, show only 1 item
        if (window.innerWidth <= 1300) {
            return items.slice(scrollIndex, scrollIndex + 1);
        }

        return items.slice(scrollIndex - 1, scrollIndex + 2);
    }

    // Add event listener to window to listen for width changes
    window.addEventListener('resize', () => {
        // If window width is less or equal to 1300px, show only 1 item
        if (window.innerWidth <= 1300) {
            setScrollIndex(items.indexOf(items.find(version => version.currentVersion)));
        }

        // If window width is greater than 1300px, show 3 items
        if (window.innerWidth > 1300) {
            setScrollIndex(items.indexOf(items.find(version => version.currentVersion)) - 1);
        }
    });

    const fakeAdjust = async () => {
        await new Promise(resolve => {
            setAdjusting(true);
            setTimeout(() => {
                setAdjusting(false);
                resolve();
            }, 1);
        });
    }

    const handlePrevious = async () => {
        if (window.innerWidth > 1300 && scrollIndex === 1 || window.innerWidth <= 1300 && scrollIndex === 0) {
            return;
        }

        await fakeAdjust();

        setScrollIndex(scrollIndex - 1);
    }

    const handleNext = async () => {
        if (window.innerWidth > 1300 && scrollIndex === items.length - 2 || window.innerWidth <= 1300 && scrollIndex === items.length - 1) {
            return;
        }

        await fakeAdjust();

        setScrollIndex(scrollIndex + 1);
    }

    const leftChevronColor = () => {
        if (window.innerWidth > 1300 && scrollIndex === 1 || window.innerWidth <= 1300 && scrollIndex === 0) {
            return 'var(--grey1)';
        }
        return 'var(--grey4)';
    }

    const rightChevronColor = () => {
        if (window.innerWidth > 1300 && scrollIndex === items.length - 2 || window.innerWidth <= 1300 && scrollIndex === items.length - 1) {
            return 'var(--grey1)';
        }

        return 'var(--grey4)';
    }

    const getContent = () => {
        if (adjusting) {
            return <p />
        }

        return visibleItems().map((version, index) => {
            return (
                <div className={styles.item}>
                    <VersionView
                        position={index}
                        key={index}
                        version={version.version}
                        date={version.date}
                        currentVersion={version.currentVersion}
                        updates={version.updates}
                    />
                </div>
            )
        });
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.item} ${styles.left}`}>
                <FiChevronLeft
                    className={styles.chevron}
                    onClick={handlePrevious}
                    color={leftChevronColor()}
                    size={24}
                />
            </div>
            {
                getContent()
            }
            <div className={`${styles.item} ${styles.right}`}>
                <FiChevronRight
                    className={styles.chevron}
                    onClick={handleNext}
                    color={rightChevronColor()}
                    size={24}
                />
            </div>
        </div>
    );
}

export default VersionScroll;