import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreativeProcessSvg from '../../assets/creative_process.svg';
import BodyTextSvg from '../../assets/well_done.svg';
import { AsyncButton } from '../../components';
import './Landing.css';
import Logo from '../../assets/logo256.png';
import SampleReply1 from '../../assets/sample_reply_1.png';
import SampleReply2 from '../../assets/sample_reply_2.png';
import SampleInstructions from '../../assets/sample_instructions.png';
import SampleReplyContext from '../../assets/sample_reply_context.png';
import ChromeSvg from '../../assets/chrome.svg';
import GmailSvg from '../../assets/gmail.svg';
import OutlookSvg from '../../assets/outlook.svg';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="page page__public page__landing animation__fadeInUp">
            <div className="landingSection landingSection__hero">
                <div className="landingSection__hero__header">
                    <h4>Say hi to your new email companion! 🚀</h4>
                    <h6>CopyZilla Email Assistant learns from your writing style to help you write emails faster and more efficiently.</h6>
                </div>
                <div className="landingSection__hero__demo">
                    <video loop={true} autoPlay={true} src="https://copyzillastaticassets.blob.core.windows.net/videos/copyzilla_en_demo.mov"></video>
                </div>
                <div className="supportSection">
                    <div className="supportSection__item">
                        <img src={GmailSvg}></img>
                        <p className="description">Gmail</p>
                    </div>
                    <div className="supportSection__item">
                        <img src={OutlookSvg}></img>
                        <p className="description">Outlook (soon)</p>
                    </div>
                </div>
                <div className="downloadSection">
                    <div className="downloadSection__button">
                        <AsyncButton
                            title="Download for Chrome"
                            onClick={() => { }}
                            prefixIcon={ChromeSvg}
                        />
                    </div>
                    <p className='description'>Available for Chrome and Firefox</p>
                </div>
            </div>
            <div className="landingSection landingSection__secondary landingSection__outlined landingSection__grid">
                <div className="landingSection__grid__item landingSection__grid__item__text landingSection__grid__item__text__left">
                    <h4>Context</h4>
                    <p className="description">CopyZilla Email Assistant extracts context from the email thread in order to create intelligent responses.</p>
                    <p className="description">We guarantee that the responses will be impressive!</p>
                </div>
                <div className="landingSection__grid__item landingSection__grid__item__image">
                    <img src={SampleReplyContext}></img>
                </div>
            </div>
            <div className="landingSection landingSection__secondary landingSection__grid">
                <div className="landingSection__grid__item landingSection__grid__item__image">
                    <img src={SampleReply2}></img>
                </div>
                <div className="landingSection__grid__item landingSection__grid__item__text landingSection__grid__item__text__right">
                    <h4>Multilingual</h4>
                    <p className="description">Respond in any language so that your response matches the language of the email being answered.</p>
                </div>
            </div>
            <div className="landingSection landingSection__secondary landingSection__outlined landingSection__grid">
                <div className="landingSection__grid__item landingSection__grid__item__text landingSection__grid__item__text__left">
                    <h4>Tailor emails to your needs!</h4>
                    <p className="description">You can provide additional context to ensure that we can provide the perfect response to every email.</p>
                </div>
                <div className="landingSection__grid__item landingSection__grid__item__image landingSection__grid__item__image__small">
                    <img src={SampleInstructions}></img>
                </div>
            </div>
            <div className="landingSection landingSection__download">
                <h6>Download the extension and start efficient emailing today!</h6>
                <div className="downloadSection__button">
                    <AsyncButton
                        title="Download for Chrome"
                        onClick={() => { }}
                        prefixIcon={ChromeSvg}
                        color="white"
                    />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;