import React from 'react'
import styles from './About.module.css'
import Dani from '../../../assets/dani.png';
import Andris from '../../../assets/andris.png';

function AboutPage() {
    return (
        <div className={styles.container}>
            <div className={styles.team}>
                <h4>Welcome aboard!</h4>
                <div className={styles.members}>
                    <div className={styles.member}>
                        <img src={Dani} alt="avatar" />
                        <div className={styles.memberText}>
                            <h6>Dániel Reha</h6>
                            <p>
                                Co-Founder
                            </p>
                            <p>
                                Software Developer
                            </p>
                        </div>
                    </div>
                    <div className={styles.member}>
                        <img src={Andris} alt="avatar" />
                        <div className={styles.memberText}>
                            <h6>András Király</h6>
                            <p>
                                Co-Founder
                            </p>
                            <p>
                                Software Developer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.aboutUs}>
                <h5>About Us</h5>
                <p>
                    CopyZilla is an innovative Outlook add-in that utilizes cutting-edge OpenAI GPT-3.5 technology to help users with email writing. We recognized the fact that writing emails is a time-consuming task that can be particularly challenging for individuals who need to communicate in a language other than their native language. In addition, composing emails can be difficult for people who struggle with language, grammar, or spelling, which can lead to poorly written or confusing messages.
                </p>
                <p>
                    To address these issues, we created CopyZilla to provide users with a more efficient and effective way to write emails. By leveraging the power of GPT-3, CopyZilla can craft new emails or reply to existing ones in a way that sounds natural and conversational. This feature saves users time and allows them to focus on more pressing tasks.
                </p>
                <p>
                    CopyZilla's interface is user-friendly and users can customize the way the app writes emails to fit their preferences. CopyZilla allows users to customize their email's tone, choose specific words or phrases they wish to reword or rephrase, and provide tailored instructions. Furthermore, the application has the ability to detect the language of the email being replied to, adding to its convenience and functionality.
                </p>
                <p>
                    We provide an excellent tool for anyone who wants to save time and improve their email writing skills. With its advanced AI capabilities, user-friendly interface, and customizable features, CopyZilla has the potential to revolutionize the way we communicate via email.
                </p>
            </div>
            <p className='description'>
                Regarding any questions or inquiries please contact us at <span style={{ textDecoration: "underline" }}>info@copyzilla.eu</span>.
            </p>
        </div>
    );
}

export default AboutPage;