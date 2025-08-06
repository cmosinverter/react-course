import { it, expect, describe, vi, beforeEach } from 'vitest';
import { HomePage } from './HomePage.jsx';
import  userEvent  from '@testing-library/user-event';
import { getByTestId, render, screen, within } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router';

vi.mock('axios');

describe('HomePage component', () => {

    let loadCart;
    let user;

    beforeEach(() => {

        user = userEvent.setup();

        loadCart = vi.fn();
        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {
                return {
                    data: [{
                        "keywords": [
                            "socks",
                            "sports",
                            "apparel"
                        ],
                        "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        "image": "/images/products/athletic-cotton-socks-6-pairs.jpg",
                        "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        "rating": {
                            "stars": 4.5,
                            "count": 87
                        },
                        "priceCents": 1090,
                        "createdAt": "2025-08-03T12:06:42.085Z",
                        "updatedAt": "2025-08-03T12:06:42.085Z"
                    },
                    {
                        "keywords": [
                            "sports",
                            "basketballs"
                        ],
                        "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        "image": "/images/products/intermediate-composite-basketball.jpg",
                        "name": "Intermediate Size Basketball",
                        "rating": {
                            "stars": 4,
                            "count": 127
                        },
                        "priceCents": 2095,
                        "createdAt": "2025-08-03T12:06:42.086Z",
                        "updatedAt": "2025-08-03T12:06:42.086Z"
                    }]
                }
            }
        });
    });


    it('displays the products correct', async () => {
        render(<MemoryRouter>
                    <HomePage cart={[]} loadCart={loadCart} />
                </MemoryRouter>)
        const productContainers = await screen.findAllByTestId('product-container');
        expect(productContainers.length).toBe(2);

        expect(within(productContainers[0])
            .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument()
        expect(within(productContainers[1])
            .getByText('Intermediate Size Basketball')
        ).toBeInTheDocument()

    })


    it('test the add to cart button', async () => {
        render(<MemoryRouter>
                    <HomePage cart={[]} loadCart={loadCart} />
                </MemoryRouter>)
        const productContainers = await screen.findAllByTestId('product-container');
        let addToCartButton = within(productContainers[0]).getByTestId("add-to-cart-button");
        let quantitySelecter = within(productContainers[0]).getByTestId("product-quantity-selector");
        await user.selectOptions(quantitySelecter, '2');
        await user.click(addToCartButton);
        addToCartButton = within(productContainers[1]).getByTestId("add-to-cart-button");
        quantitySelecter = within(productContainers[1]).getByTestId("product-quantity-selector");
        await user.selectOptions(quantitySelecter, '3');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenNthCalledWith(1, 
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2
            }
        )

        expect(axios.post).toHaveBeenNthCalledWith(2, 
            '/api/cart-items',
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 3
            }
        )

    })

});