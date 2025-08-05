import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import './HomePage.css';
import { Header } from '../../components/Header.jsx';
import { ProductsGrid } from './ProductsGrid.jsx';

export function HomePage({ cart, loadCart }) {

    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search  = searchParams.get('search');

    useEffect(() => {
        const getHomeData = async () => {
            const urlPath = search ? `/api/products/?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        };
        getHomeData()
    }, [search]);

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <Header cart={cart}/>

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    );
}