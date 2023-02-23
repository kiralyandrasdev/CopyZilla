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
                    <h4>Bemutatkozik az új, személyes e-mail asszisztensed 🚀</h4>
                    <h6>A CopyZilla Email Assistant tanul az írási stílusodból, és válaszokat készít úgy, mintha te írtad volna őket.</h6>
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
                        <p className="description">Outlook (hamarosan)</p>
                    </div>
                </div>
                <div className="downloadSection">
                    <div className="downloadSection__button">
                        <AsyncButton
                            title="Ingyenes letöltés"
                            onClick={() => { }}
                            prefixIcon={ChromeSvg}
                        />
                    </div>
                    <p className='description'>Elérhető a Google Chrome bővítmény webáruházban</p>
                </div>
            </div>
            <div className="landingSection landingSection__secondary landingSection__outlined landingSection__grid">
                <div className="landingSection__grid__item landingSection__grid__item__text landingSection__grid__item__text__left">
                    <h4>Kontextus</h4>
                    <p className="description">A CopyZilla Email Assistant a levelezési láncból nyeri ki a kontextust, hogy intelligens válaszokat tudjon készíteni</p>
                    <p className="description">Garantáljuk, hogy a válaszok lenyűgöznek majd!</p>
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
                    <h4>Többnyelvű</h4>
                    <p className="description">Válaszolj bármely nyelven, hogy válaszod illeszkedjen a megválaszolandó e-mail nyelvéhez</p>
                </div>
            </div>
            <div className="landingSection landingSection__secondary landingSection__outlined landingSection__grid">
                <div className="landingSection__grid__item landingSection__grid__item__text landingSection__grid__item__text__left">
                    <h4>Szabd testre a választ!</h4>
                    <p className="description">Extra kontextust adhatsz meg, hogy minden e-mailre tökéletes választ tudjunk adni</p>
                </div>
                <div className="landingSection__grid__item landingSection__grid__item__image landingSection__grid__item__image__small">
                    <img src={SampleInstructions}></img>
                </div>
            </div>
            <div className="landingSection landingSection__download">
                <h6>Töltsd le a bővítményt és láss neki a hatékony levelezéshez!</h6>
                <AsyncButton
                    title="Ingyenes letöltés"
                    onClick={() => navigate('/auth/login')}
                    color="white"
                    prefixIcon={ChromeSvg}
                />
            </div>
        </div>
    );
}

export default LandingPage;