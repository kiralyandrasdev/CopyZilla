import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingIndicator } from "../components";
import { getGoodsList } from "../features/payment/actions/creditActions";
import CreditRefillOptions from "../features/payment/components/CreditRefillOption";
import useWindowDimensions from "../hooks/useWindowDimensions";
import './CreditRefill.css';

export default function CreditRefill(props) {
    const { firebaseUid } = useSelector(state => state.auth);

    const [isLoading, setIsLoading] = useState(false);

    const [goods, setGoods] = useState([]);

    const fetchGoods = async () => {
        setIsLoading(true);
        const result = await getGoodsList();
        setGoods(result);
        setIsLoading(false);
    }

    const itemContainer = () => {
        if (isLoading) {
            return <LoadingIndicator></LoadingIndicator>
        }
        if (goods.length < 1) {
            return <div>Nincs elérhető termék.</div>
        }
        const items = goods.map((item, index) => {
            return <CreditRefillOptions key={index} data={{
                name: item.metadata["credit_count"] + " kredit",
                firebaseUid: firebaseUid,
                priceId: item.defaultPriceId,
                mode: "payment",
                cost: item.defaultPrice.unitAmount / 100 + "0$"
            }} />
        }
        )
        return items;
    }

    useEffect(() => {
        fetchGoods();
    }, []);

    return (
        <div className="credit-refill">
            <h2>Válassz kredit csomagot</h2>
            <div className="goods-container">
                {itemContainer()}
            </div>
        </div>
    )
}