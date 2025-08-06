import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { PaymentSummary } from './PaymentSummary.jsx';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
vi.mock('axios');

describe('PaymentSummary Component', () => {

    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 1,
            "productCostCents": 1090,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 1090,
            "taxCents": 109,
            "totalCostCents": 1199
        }
        loadCart = vi.fn();
        user = userEvent.setup()
    })

    it('check the dollar amount for each row', () => {
        render(
            <MemoryRouter>
                <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
            </MemoryRouter>
        );

        // Check items row
        const itemsRow = screen.getByTestId('items-row');
        expect(itemsRow).toHaveTextContent('Items (1):');
        expect(itemsRow).toHaveTextContent('$10.90');

        // Check shipping row
        const shippingRow = screen.getByTestId('shipping-row');
        expect(shippingRow).toHaveTextContent('Shipping & handling:');
        expect(shippingRow).toHaveTextContent('$0.00');

        // Check subtotal row
        const subtotalRow = screen.getByTestId('subtotal-row');
        expect(subtotalRow).toHaveTextContent('Total before tax:');
        expect(subtotalRow).toHaveTextContent('$10.90');

        // Check tax row
        const taxRow = screen.getByTestId('tax-row');
        expect(taxRow).toHaveTextContent('Estimated tax (10%):');
        expect(taxRow).toHaveTextContent('$1.09');

        // Check total row
        const totalRow = screen.getByTestId('total-row');
        expect(totalRow).toHaveTextContent('Order total:');
        expect(totalRow).toHaveTextContent('$11.99');
    })

    it('test the place order button', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>;
        }

        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
                <Location />
            </MemoryRouter>
        );
        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    })

})