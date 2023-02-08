import React, { useEffect, useState } from "react";
import PurchaseSvg from "../../assets/purchase.svg";
import { LoadingIndicator } from "../../components";
import { getGoodsList } from "../../features/payment/actions/paymentActions";
import CreditRefillOptions from "../../features/payment/components/CreditRefillOption";
import './AppPage.css';
import './CreditRefill.css';

export default function CreditRefill() {
    const [isLoading, setIsLoading] = useState(true);

    const [goods, setGoods] = useState([]);

    const fetchGoods = async () => {
        setIsLoading(true);
        const result = await getGoodsList();
        setGoods(result);
        setIsLoading(false);
    }

    const itemContainer = () => {
        if (goods.length < 1) {
            return <p>Nincs elérhető csomag.</p>
        }
        const items = goods.map((item, index) => {
            return <CreditRefillOptions order={index} key={index} item={item} />
        });
        return items;
    }

    const content = () => {
        if (isLoading) {
            return (
                <div className="page page__centerContent">
                    <LoadingIndicator color="white"></LoadingIndicator>
                </div>
            )
        }

        return (
            <div className="page page__creditRefill">
                <div className="creditRefill__page__header animation__fadeInDown">
                    <img className="illustration__150" src={PurchaseSvg} alt="Loading..."></img>
                    <h4>Válassz csomagot és folytasd a munkát</h4>
                </div>
                <div className="creditRefill__itemsContainer">
                    {itemContainer()}
                </div>
                <p className="description animation__fadeInUp">Válaszd ki a számodra legmegfelelőbb csomagot</p>
            </div>
        );
    }

    useEffect(() => {
        fetchGoods();
    }, []);

    return content()
}