import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
    it('formats 1999 cents as $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99');
    });

    it('displays 2 decimals', () => {
        expect(formatMoney(1090)).toBe('$10.90');
        expect(formatMoney(100)).toBe('$1.00');
    });

    it('handles zero amount', () => {
        expect(formatMoney(0)).toBe('$0.00');
    });

    it('handles single digit cents', () => {
        expect(formatMoney(5)).toBe('$0.05');
        expect(formatMoney(9)).toBe('$0.09');
    });

    it('handles amounts less than a dollar', () => {
        expect(formatMoney(50)).toBe('$0.50');
        expect(formatMoney(99)).toBe('$0.99');
        expect(formatMoney(25)).toBe('$0.25');
    });

    it('handles large amounts', () => {
        expect(formatMoney(100000)).toBe('$1000.00');
        expect(formatMoney(999999)).toBe('$9999.99');
        expect(formatMoney(123456)).toBe('$1234.56');
    });

    it('handles exact dollar amounts', () => {
        expect(formatMoney(500)).toBe('$5.00');
        expect(formatMoney(1000)).toBe('$10.00');
        expect(formatMoney(2500)).toBe('$25.00');
    });

    it('handles decimal precision correctly', () => {
        expect(formatMoney(1)).toBe('$0.01');
        expect(formatMoney(10)).toBe('$0.10');
        expect(formatMoney(101)).toBe('$1.01');
    });

    it(('handles negative numbers correctly', () => {
        expect(formatMoney(-999)).toBe('-$9.99');
        expect(formatMoney(-100)).toBe('-$1.00');
    }))

});