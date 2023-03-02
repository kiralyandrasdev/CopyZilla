import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AsyncButton } from '../../components';
import './Landing.css';
import Context from '../../assets/context.png';
import Multilingual from '../../assets/multilingual.png';
import Instructions from '../../assets/instructions.png';
import ChromeSvg from '../../assets/chrome.svg';
import GmailSvg from '../../assets/gmail.svg';
import OutlookSvg from '../../assets/outlook.svg';
import { AiFillStar } from 'react-icons/ai';

function LandingPage() {
    const navigate = useNavigate();

    const chromeDownloadUrl = "https://chrome.google.com/webstore/detail/copyzilla-email-assistant/gakgnepokfbooliogomceelndhjgahkf";

    const handleDownload = (url) => {
        window.open(url, "_blank");
    }

    const sampleReview = ({ name, review }) => {
        return (
            <div className="landingSection__totalReviews__reviews__item">
                <div className="landingSection__totalReviews__reviews__item__stars">
                    {
                        [1, 2, 3, 4, 5].map((item, index) => {
                            return (
                                <AiFillStar
                                    className="landingSection__totalReviews__star"
                                    size={20}
                                    color="var(--green)"
                                />
                            )
                        })
                    }
                </div>
                <p className="description">
                    <i>"{review}"</i>
                </p>
                <p className="description">
                    <strong>{name}</strong>
                </p>
            </div>
        )
    }

    const featureReview = ({ name, review }) => {
        return (
            <div className="sectionReview">
                <div className="sectionReview__stars">
                    {
                        [1, 2, 3, 4, 5].map((item, index) => {
                            return (
                                <AiFillStar
                                    className="sectionReview__star"
                                    size={20}
                                    color="var(--green)"
                                />
                            )
                        })
                    }
                </div>
                <p>
                    <i>"{review}"</i>
                </p>
                <p>
                    <strong>{name}</strong>
                </p>
            </div>
        )
    }

    return (
        <div className="page page__public page__landing animation__fadeInUp">
            <div className="landingSection landingSection__hero">
                <div className="landingSection__hero__header">
                    <h4>Let Us Write Your Emails for You! 🚀</h4>
                    <h6>Powered by artificial intelligence, CopyZilla Email Assistant can serve as your email wingman</h6>
                </div>
                <div className="landingSection__hero__demo">
                    <video loop={true} autoPlay={true} src="https://copyzillastaticassets.blob.core.windows.net/videos/copyzilla_demo_en_peter.mov"></video>

                </div>
                <div className="supportSection">
                    <div className="supportSection__item">
                        <img src={GmailSvg}></img>
                        <p className="description">Gmail</p>
                    </div>
                    <div className="supportSection__item">
                        <img src={OutlookSvg}></img>
                        <p className="description">Outlook</p>
                    </div>
                </div>
                <div className="downloadSection">
                    <p className="description">
                        Join <strong style={{ "color": "var(--grey4)", "fontSize": "18px" }}> 241 </strong> users who are already using CopyZilla Email Assistant
                    </p>
                    <div className="downloadSection__button">
                        <AsyncButton
                            title="Download for Chrome"
                            onClick={() => handleDownload(chromeDownloadUrl)}
                            prefixIcon={ChromeSvg}
                        />
                    </div>
                    {/* <p className='description availableForChrome'>Available for Google Chrome</p> */}
                </div>
            </div>
            <div className="landingSection landingSection__totalReviews">
                <div className="landingSection__totalReviews__header">
                    <div className="landingSection__totalReviews__stars">
                        {
                            [1, 2, 3, 4, 5].map((item, index) => {
                                return (
                                    <AiFillStar
                                        className="landingSection__totalReviews__star"
                                        size={25}
                                        color="var(--green)"
                                    />
                                )
                            })
                        }
                    </div>
                    <h5>Rated 5 out of 5</h5>
                    <p className="description">
                        200+ installs on the Chrome Web Store
                    </p>
                </div>
                <div className="landingSection__totalReviews__reviews">
                    {sampleReview({ name: "Chris", review: "I was hesitant to try this email extension at first, but now I can't imagine going back to writing emails manually. It's saved me so much time and effort, and the emails it generates are top-notch." })}
                    {sampleReview({ name: "Marie", review: "As someone who spends a lot of time drafting emails, I can't believe how much time I've saved with this tool." })}
                    {sampleReview({ name: "Laszlo", review: "Writing emails used to be a chore, but now it's a breeze. The best part is that the emails it generates sound professional and natural." })}
                </div>
            </div>
            <div className="landingSection landingSection__secondary landingSection__outlined landingSection__grid">
                <div className="landingSection__grid__item landingSection__grid__item__text">
                    <h4>Context</h4>
                    <p className="description">CopyZilla Email Assistant extracts context from the email thread in order to create intelligent responses.</p>
                    <p className="description">We guarantee that the responses will be impressive!</p>
                    {featureReview({ name: "Daniel", review: "I recently tried out CopyZilla Email Assistant and was very impressed with its ability to extract context from email threads and generate intelligent responses" })}
                </div>
                <div className="landingSection__grid__item landingSection__grid__item__image">
                    <img src={Context}></img>
                </div>
            </div>
            <div className="landingSection landingSection__secondary landingSection__grid">
                <div className="landingSection__grid__item landingSection__grid__item__image">
                    <img src={Multilingual}></img>
                </div>
                <div className="landingSection__grid__item landingSection__grid__item__text">
                    <h4>Multilingual</h4>
                    <p className="description">Respond in any language so that your response matches the language of the email being answered.</p>
                    {featureReview({ name: "Laszlo", review: "It makes responding to emails so much more convenient and efficient, as there is no need to switch between different language tools or manually translate emails" })}
                </div>
            </div>
            <div className="landingSection landingSection__secondary landingSection__outlined landingSection__grid">
                <div className="landingSection__grid__item landingSection__grid__item__text">
                    <h4>Tailor emails to your needs!</h4>
                    <p className="description">You can provide additional context to ensure that we can provide the perfect response to every email.</p>
                    {featureReview({ name: "Jared", review: "With just a few pieces of information such as location, availability, and preferred time slots, the software can generate a response that is perfectly tailored for my needs." })}
                </div>
                <div className="landingSection__grid__item landingSection__grid__item__image landingSection__grid__item__image__small">
                    <img src={Instructions}></img>
                </div>
            </div>
            <div className="landingSection landingSection__download">
                <h6>Download the extension and start efficient emailing today!</h6>
                <div className="downloadSection__button">
                    <AsyncButton
                        title="Download for Chrome"
                        onClick={() => handleDownload(chromeDownloadUrl)}
                        prefixIcon={ChromeSvg}
                        color="white"
                    />
                </div>
            </div>
            <div className="landingSection landingSection__faq">
                <h4>Frequently Asked Questions</h4>
                <div className="landingSection__faq__item">
                    <h5>How does CopyZilla Email Assistant work?</h5>
                    <p>
                        CopyZilla Email Assistant is powered by GPT-3, a state-of-the-art language model developed by OpenAI. Our service leverages the power of machine learning and natural language processing to extract context from the email thread and create intelligent responses.
                    </p>
                    <p>
                        You can learn more about GPT-3 <a href="https://openai.com/blog/gpt-3-apps" target="_blank">here</a>.
                    </p>
                </div>
                <div className="landingSection__faq__item">
                    <h5>Can you see my emails?</h5>
                    <p>
                        We want to assure you that we take your privacy very seriously, and as a policy, we do not store any of your emails on our servers. Your emails are only temporarily stored in our memory while a reply email is being drafted, and once the message is sent, it is immediately deleted from our system.
                    </p>
                    <p>
                        We understand the importance of keeping your personal information safe, and we are committed to providing a secure and trustworthy service to our customers. If you have any further questions or concerns, please do not hesitate to let us know. We're always here to help!
                    </p>
                </div>
                <div className="landingSection__faq__item">
                    <h5>How do I use CopyZilla Email Assistant?</h5>
                    <p>
                        To use our service, you will need to create an account on our website <a href="/auth/signup">here</a> and select a subscription plan that suits your needs. Once you have signed up, you can download the CopyZilla Email Assistant chrome extension and install it on your browser. After installation, you can navigate to your Gmail or Outlook account and start using our service to automate your email writing tasks.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;