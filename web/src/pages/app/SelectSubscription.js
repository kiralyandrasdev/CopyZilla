import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChoiceSvg from '../../assets/choice.svg';
import { LoadingIndicator, TextButton } from '../../components';
import { getSubscriptionList } from '../../features/payment/actions/paymentActions';
import SubscriptionOption from '../../features/payment/components/SubscriptionOption';
import './SelectSubscription.css';

function SelectSubscriptionPage() {
    const navigate = useNavigate();

    const { firebaseUid } = useSelector(state => state.auth);

    const [subscriptionList, setSubscriptionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getSubscriptionListAsync = async () => {
        const result = await getSubscriptionList();
        setSubscriptionList(result);
        setIsLoading(false);
    }

    const itemContainer = () => {
        if (subscriptionList.length < 1) {
            return <p>Nincs elérhető csomag.</p>
        }
        const items = subscriptionList.filter(e => e.planType !== "default").map((item, index) => {
            return <SubscriptionOption order={index} key={index} item={item} />
        });
        return items;
    }

    const handleSkipUpgrade = () => {
        localStorage.setItem(`initialized_${firebaseUid}`, true);
        navigate("/user/editor");
    }

    useEffect(() => {
        getSubscriptionListAsync();
    }, []);

    const content = () => {
        if (isLoading) {
            return (
                <div className="page page__selectSubscription">
                    <LoadingIndicator color="white"></LoadingIndicator>
                </div>
            );
        }

        return (
            <div className="page page__selectSubscription">
                <img src={ChoiceSvg} alt="" className="page__selectSubscription__illustration illustration__150" />
                <h5>Válassz csomagot és láss neki a munkának</h5>
                <div className="page__selectSubscription__options__container">
                    {itemContainer()}
                </div>
                <TextButton className="page__selectSubscription__skip__button animation__fadeInUp" color="var(--grey2)" underline={true} title="Folytatás ingyenes csomaggal" onClick={() => handleSkipUpgrade()}></TextButton>
            </div>
        );
    }

    return content();
}

export default SelectSubscriptionPage;