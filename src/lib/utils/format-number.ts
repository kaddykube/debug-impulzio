export function formatNumber(value: number, length: 'short' | 'long' = 'short') {
    return new Intl.NumberFormat('de-DE', { notation: length === 'short' ? 'compact' : 'standard', compactDisplay: length }).format(value);
}
