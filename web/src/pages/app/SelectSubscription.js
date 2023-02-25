import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChoiceSvg from '../../assets/choice.svg';
import { LoadingIndicator, TextButton } from '../../components';
import { AuthContext } from '../../features/authentication/authContext';
import { getSubscriptionList } from '../../features/payment/actions/paymentActions';
import SubscriptionOption from '../../features/payment/components/SubscriptionOption';
import './AppPage.css';
import './SelectSubscription.css';
import PricingCard from '../website/pricing/cards/PricingCard';

function SelectSubscriptionPage() {
    const navigate = useNavigate();

    const { firebaseUid } = useContext(AuthContext);

    const [subscriptionList, setSubscriptionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken } = useSelector(state => state.auth);

    const getSubscriptionListAsync = async () => {
        const result = await getSubscriptionList({ accessToken });
        setSubscriptionList(result);
        setIsLoading(false);
    }

    const itemContainer = () => {
        if (!subscriptionList || subscriptionList.length < 1) {
            return <p>No items found</p>
        }
        const items = subscriptionList.filter(e => e.planType !== "default").map((item, index) => {
            console.log(item);
            return (
                <PricingCard
                    key={index}
                    priceId={item.priceId}
                    dark={true}
                    order={index}
                    title={item.name}
                    description={item.description}
                    price={item.priceFormatted}
                    pricingInterval="per month"
                    features={item.features}
                    selectColor="var(-green)"
                />
            )
        });
        return items;
    }

    const handleSkipUpgrade = () => {
        localStorage.setItem(`initialized_${firebaseUid}`, true);
        navigate("/user/home");
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
            <div className="page__selectSubscription">
                <img src={ChoiceSvg} alt="" className="page__selectSubscription__illustration illustration__150" />
                <h4>Select a plan that suits you</h4>
                <div className="page__selectSubscription__options__container">
                    {itemContainer()}
                </div>
                <TextButton
                    className="page__selectSubscription__skip__button animation__fadeInUp"
                    color="var(--grey2)"
                    underline={true}
                    title="Continue with free plan"
                    onClick={() => handleSkipUpgrade()}></TextButton>
            </div>
        );
    }

    return content();
}

export default SelectSubscriptionPage;