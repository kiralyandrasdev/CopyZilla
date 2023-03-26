import React, { useContext, useEffect, useState } from 'react'
import { getAuth } from '@firebase/auth';
import ReplyTypeSelector from '../features/compose/components/response_type/ReplyTypeSelector';
import ReplyMoodSelector from '../features/compose/components/mood/ReplyToneSelector';
import { OptionsContext } from '../features/compose/optionsContext';
import styles from './SignedInView.module.css';
import { ComposeType } from '../enum/composeType';
import { AuthContext } from '../context/authContext';
import { AppContext } from '../context/appContext';
import Instructions from '../features/compose/components/instructions/Instructions';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import Templates from '../features/compose/components/templates/Templates';
import { useGenerateEmailMutation } from '../features/api/apiSlice';
import { UserContext } from '../context/userContext';
import TextButton, { TextButtonSize } from '../components/TextButton';
import { websiteUrl } from '../config/envConfig';
import PrimaryButton from '../components/PrimaryButton';
import ComposeArea from '../features/compose/components/compose_area/ComposeArea';
import ContentLoader from 'react-content-loader';

function SignedInViewPlaceholder() {
    return <div className={styles.placeholder}>
        <ContentLoader width="100%" height="100%" backgroundColor="var(--grey1)" foregroundColor="white" className={styles.shimmerItem}>
            <rect x="0" y="0" ry="8" width="40%" height="20px" />
            <rect x="0" y="40" ry="8" width="100%" height="20px" />
            <rect x="0" y="80" ry="8" width="100%" height="50px" />
            <rect x="0" y="150" ry="8" width="100%" height="20px" />
            <rect x="0" y="190" ry="8" width="100%" height="50px" />
            <rect x="0" y="260" ry="8" width="100%" height="250px" />
            <rect x="0" y="530" ry="8" width="100%" height="50px" />
        </ContentLoader>
    </div>
}

function SignedInView() {
    const [initializing, setInitializing] = useState(true);
    const [validationError, setValidationError] = useState('');

    const { user: firebaseUser } = useContext(AuthContext);
    const { user, incrementConsumedCredits: decreaseCredits } = useContext(UserContext);

    const { setError, setComposedEmail } = useContext(AppContext);

    const [instructionsOpen, setInstructionsOpen] = useState(false);
    const [templatesOpen, setTemplatesOpen] = useState(false);

    const { setEmail, options, composeType, setComposeType } = useContext(OptionsContext);

    const [
        generateEmail,
        {
            data: generatedEmail,
            isLoading: isGeneratingEmail,
            error: generateEmailError,
            isSuccess: isGenerateEmailSuccess,
        }
    ] = useGenerateEmailMutation();

    const handleSignOutClick = async () => {
        const auth = getAuth();
        await auth.signOut();
    }

    const handleClickAccount = () => {
        window.open(`${websiteUrl}/user/account`, '_blank')
    }

    const canSubmit = () => {
        if (!options.email && !options.instructions) {
            setValidationError('You must enter instructions to compose an email');
            return false;
        } else {
            setValidationError('');
        }

        return true;
    }

    const handleCompose = () => {
        if (isGeneratingEmail || !canSubmit()) {
            return;
        }

        const objective = composeType === ComposeType.Reply ? options.objective.value : '';

        generateEmail({
            userId: user?.id || '',
            token: firebaseUser?.token || '',
            options: {
                email: options.email,
                tone: options.tone.value,
                objective: objective,
                instructions: options.instructions,
            }
        }).catch((error) => {
            setError(JSON.stringify(error));
        });
    }

    useEffect(() => {
        if (generateEmailError) {
            setError(generateEmailError as string);
        }

        if (isGenerateEmailSuccess) {
            decreaseCredits();
            setComposedEmail(generatedEmail || '');
        }

    }, [generateEmailError, isGenerateEmailSuccess]);

    const initSettings = () => {
        try {
            const item = Office.context.mailbox?.item;

            if (!item) {
                setError('Failed to get email body');
                setInitializing(false);
                return;
            }

            item.getComposeTypeAsync(function (result) {
                if(result.value.composeType === "newMail") {
                    setComposeType(ComposeType.New);
                } else {
                    setComposeType(ComposeType.Reply);
                }

                item?.body?.getAsync('text', (result) => {
                    if (result.status === Office.AsyncResultStatus.Succeeded) {
                        if (result.value && result.value !== '\r') {
                            setEmail(result.value);
                        }
                    } else {
                        setError('Failed to get email body');
                    }

                    setInitializing(false);
                });
            });
        } catch (error) {
            setError(JSON.stringify(error));
        }
    }

    useEffect(() => {
        initSettings();
    }, []);

    const messageTypeText = () => {
        if (composeType === ComposeType.Reply) {
            return 'Compose reply';
        }

        return 'New email';
    }

    const userEmail = () => {
        if (!firebaseUser || !firebaseUser?.email) {
            return '';
        }

        if (firebaseUser.email.length > 25) {
            return firebaseUser.email.substring(0, 20) + '...';
        }

        return firebaseUser.email;
    }

    const creditText = () => {
        if (!user) {
            return '';
        }

        if (user.product.scope === "enterprise") {
            return "Unlimited usage";
        }

        let creditsLeft = user.product.dailyCreditLimit - user.consumedCredits;

        return `${creditsLeft} credits left for today`;
    }

    const header = () => {
        return (
            <div className={styles.header}>
                <div className={styles.header__left}>
                    <p className={`description ${styles.email}`}>{userEmail()}</p>
                    <p className={`description ${styles.credit}`}>{creditText()}</p>
                </div>
                <div className={styles.header__right}>
                    <TextButton
                        text="Account"
                        onClick={() => handleClickAccount()}
                        fontSize={TextButtonSize.Small}
                        color='white'
                    />
                    <TextButton
                        text="Sign out"
                        onClick={handleSignOutClick}
                        fontSize={TextButtonSize.Small}
                        color='white'
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={styles.view}>
            {header()}
            {
                initializing ? <SignedInViewPlaceholder /> :
                    <div className={styles.viewContent}>
                        <h6>{messageTypeText()}</h6>
                        <div className={styles.optionSection}>
                            <div className={styles.optionSection__header}>
                                <label>Mood</label>
                                <p className='description'>How do you want to come across?</p>
                            </div>
                            <ReplyMoodSelector />
                        </div>
                        {
                            composeType === ComposeType.Reply &&
                            <div className={styles.optionSection}>
                                <div className={styles.optionSection__header}>
                                    <label>Objective</label>
                                    <p className='description'>What do you want to achieve?</p>
                                </div>
                                <ReplyTypeSelector />
                            </div>
                        }
                        <div className={styles.collapsed}>
                            <div className={styles.collapsedHeader}>
                                <label>Instructions</label>
                                {
                                    instructionsOpen ?
                                        <FiChevronDown className="chevron" onClick={() => setInstructionsOpen(!instructionsOpen)} /> :
                                        <FiChevronRight className="chevron" onClick={() => setInstructionsOpen(!instructionsOpen)} />
                                }
                            </div>
                            <div className={styles.collapsedContent}>
                                {
                                    instructionsOpen &&
                                    <Instructions
                                        onClose={() => setInstructionsOpen(false)}
                                    />
                                }
                            </div>
                        </div>
                        <div className={styles.collapsed}>
                            <div className={styles.collapsedHeader}>
                                <label>Templates</label>
                                {
                                    templatesOpen ?
                                        <FiChevronDown className="chevron" onClick={() => setTemplatesOpen(!templatesOpen)} /> :
                                        <FiChevronRight className="chevron" onClick={() => setTemplatesOpen(!templatesOpen)} />
                                }
                            </div>
                            <div className={styles.collapsedContent}>
                                {
                                    templatesOpen &&
                                    <Templates
                                        onClose={() => setTemplatesOpen(false)}
                                    />
                                }
                            </div>
                        </div>
                        <ComposeArea />
                        <PrimaryButton
                            title="Write email"
                            onClick={() => handleCompose()}
                            isLoading={isGeneratingEmail}
                            enabled={true}
                        />
                        <div className={styles.centerText}>
                            {validationError && <p className="red">{validationError}</p>}
                        </div>
                    </div>
            }
        </div>
    );
}

export default SignedInView;