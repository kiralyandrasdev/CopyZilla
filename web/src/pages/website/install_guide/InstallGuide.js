import React from 'react'
import styles from './InstallGuide.module.css'
import Step1 from '../../../assets/install_steps/install_step_1.png';
import Step2 from '../../../assets/install_steps/install_step_2.png';
import Step3 from '../../../assets/install_steps/install_step_3.png';
import Step4 from '../../../assets/install_steps/install_step_4.png';
import InstallStep from './components/InstallStep';

function InstallGuidePage() {
    const steps = [
        {
            title: 'Go to add-ins page',
            imageSource: Step1,
            description: 'Open Outlook, then on the Home page click on the Get Add-ins button'
        },
        {
            title: 'Add as custom add-in',
            imageSource: Step2,
            description: 'Go to My Add-ins > Add a custom add-in > Add from URL...'
        },
        {
            title: 'Paste the manifest URL',
            imageSource: Step3,
            description: 'Copy and paste the following URL: https://addin.copyzilla.eu/manifest.xml'
        },
        {
            title: 'Open compose mode',
            imageSource: Step4,
            description: 'The add-in is ready for use in compose mode'
        },
    ]

    return (
        <div className={styles.page}>
            <div className={styles.heading}>
                <h2>
                    Install CopyZilla for Outlook
                </h2>
                <h6>
                    Great! Now you can begin using the add-in by following these easy-to-follow instructions.
                </h6>
            </div>
            <div className={styles.steps}>
                {
                    steps.map((step, index) => {
                        return (
                            <InstallStep
                                key={index}
                                order={index + 1}
                                title={step.title}
                                description={step.description}
                                imageSource={step.imageSource}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default InstallGuidePage;