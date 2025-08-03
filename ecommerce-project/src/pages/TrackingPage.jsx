import './TrackingPage.css'
import { Header } from '../components/Header.jsx'
import { Link, useParams } from 'react-router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage( {cart} ) {

    const {orderId, productId} = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async() => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }
        fetchOrder();
    }, [orderId])

    if (!order) { return null;}

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });

    const totalDeliverytimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    // const timePassedMs = totalDeliverytimeMs * 0.5;
    let deliveryPercent = (timePassedMs / totalDeliverytimeMs) * 100 ;
    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }


    return (
        <>
            <Header cart={cart}/>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${deliveryPercent < 33 ? 'current-status' : ''}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${((deliveryPercent >= 33) & (deliveryPercent < 100)) ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${deliveryPercent === 100 ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}