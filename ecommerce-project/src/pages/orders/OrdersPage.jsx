import './OrdersPage.css'
import { Header } from '../../components/Header.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { OrdersGrid } from './OrdersGrid.jsx'

export function OrdersPage({ cart }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async() => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        }
        fetchOrders();
    }, [])

    return (
        <>
            <Header cart={cart} />
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders}/>
            </div>
        </>
    );
}