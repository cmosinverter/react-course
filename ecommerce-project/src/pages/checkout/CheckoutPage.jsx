import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';
import { OrderSummary } from './OrderSummary.jsx';
import { PaymentSummary } from './PaymentSummary.jsx';

export function CheckoutPage({ cart, loadCart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState([])


    useEffect(() => {
        const fetchDeliveryOptions = async () => {
            const response = await axios.get('api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);
        };
        fetchDeliveryOptions();
    }, [])

    useEffect(() => {
        const fetchPaymentSummary = async () => {
            const response = await axios.get('api/payment-summary');
            setPaymentSummary(response.data);
        };
        fetchPaymentSummary();
    }, [cart])

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart}/>
                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}