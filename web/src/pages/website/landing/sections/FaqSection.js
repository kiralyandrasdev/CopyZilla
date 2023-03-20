import React from 'react'
import styles from './FaqSection.module.css'
import FaqCard from '../components/FaqCard';

function FaqSection() {
    const faqs = [
        {
            question: 'How does CopyZilla Email Assistant work?',
            answer: 'CopyZilla Email Assistant is powered by GPT-3, a state-of-the-art language model developed by OpenAI. Our service leverages the power of machine learning and natural language processing to extract context from the email thread and create intelligent responses.'
        },
        {
            question: 'Can you see my emails?',
            answer: "We want to assure you that we take your privacy very seriously, and as a policy, we do not store any of your emails on our servers. Your emails are only temporarily stored in our memory while a reply email is being drafted, and once the message is sent, it is immediately deleted from our system. \n We understand the importance of keeping your personal information safe, and we are committed to providing a secure and trustworthy service to our customers. If you have any further questions or concerns, please do not hesitate to let us know. We're always here to help!"
        },
        {
            question: 'How do I use CopyZilla Email Assistant?',
            answer: "To use our service, you will need to create an account on our website and select a subscription plan that suits your needs. Once you have signed up, you can download the CopyZilla Email Assistant chrome extension and install it on your browser. After installation, you can navigate to your Gmail or Outlook account and start using our service to automate your email writing tasks."
        }
    ];

    return (
        <div className={`${styles.container} section`}>
            <h2>Frequently Asked Questions</h2>
            <h6>
                If you have any questions not answered in the FAQ, please do not hesitate to contac us at info@copyzilla.hu
            </h6>
            <div className={styles.cards}>
                {
                    faqs.map((faq, index) => (
                        <FaqCard
                            question={faq.question}
                            answer={faq.answer}
                            key={index}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default FaqSection;