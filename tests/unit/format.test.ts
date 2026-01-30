import { describe, it, expect } from 'vitest';
import { formatAddress, formatAmount, formatDate } from '../../src/utils/format';

describe('formatAddress', () => {
    it('should truncate long addresses', () => {
        const address = 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR';
        const result = formatAddress(address);
        expect(result).toMatch(/^SP3D.*R2PR$/);
    });

    it('should handle empty address', () => {
        expect(formatAddress('')).toBe('');
    });
});

describe('formatAmount', () => {
    it('should format with default decimals', () => {
        expect(formatAmount(100000000)).toBe('1.00000000');
    });

    it('should respect custom decimals', () => {
        expect(formatAmount(1000, 2)).toBe('10.00');
    });
});