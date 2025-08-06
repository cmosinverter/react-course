import { it, expect, describe, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary.jsx';

vi.mock('axios');

describe('PaymentSummary Component', () => {

    let paymentSummary;
    let loadCart;

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
    })

    it('check the dollar amount for each row', () => {
        render(
            <MemoryRouter>
                <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary}/>
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

})