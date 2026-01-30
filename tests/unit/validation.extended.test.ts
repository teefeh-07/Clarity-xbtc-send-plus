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

describe('isValidAmount', () => {
    it('should accept positive amounts', () => {
        expect(isValidAmount(100)).toBe(true);
        expect(isValidAmount(0.001)).toBe(true);
    });

    it('should reject invalid amounts', () => {
        expect(isValidAmount(0)).toBe(false);
        expect(isValidAmount(-1)).toBe(false);
    });
});