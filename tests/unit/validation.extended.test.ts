import { describe, it, expect } from 'vitest';
import { isValidStacksAddress, isValidAmount, isValidMemo } from '../../src/utils/validation';

describe('isValidStacksAddress', () => {
    it('should accept valid mainnet addresses', () => {
        expect(isValidStacksAddress('SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR')).toBe(true);
    });

    it('should reject invalid addresses', () => {
        expect(isValidStacksAddress('invalid')).toBe(false);
        expect(isValidStacksAddress('')).toBe(false);
    });
});