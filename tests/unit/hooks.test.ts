import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '../../src/hooks/useDebounce';

describe('useDebounce', () => {
    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('test', 500));
        expect(result.current).toBe('test');
    });
});