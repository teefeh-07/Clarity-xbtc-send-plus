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