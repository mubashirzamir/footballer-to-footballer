import { describe, it, expect } from 'vitest'
import { calculateSeasonEnd } from './useServiceTransfers.tsx'

describe('calculateSeasonEnd', () => {
    const transfer = { season: '04/05', date: '2004-07-01' }

    it('returns current season when there is no next transfer', () => {
        expect(calculateSeasonEnd(transfer, undefined, '24/25')).toBe('24/25')
    })

    it('returns transfer season when same season year as next transfer (sanity check)', () => {
        const nextTransfer = { season: '04/05', date: '2005-01-15' }
        expect(calculateSeasonEnd(transfer, nextTransfer, '24/25')).toBe('04/05')
    })

    it('returns next transfer season when next transfer is after July 1', () => {
        const nextTransfer = { season: '05/06', date: '2005-08-01' }
        expect(calculateSeasonEnd(transfer, nextTransfer, '24/25')).toBe('05/06')
    })

    it('returns prior season when next transfer is before July 1', () => {
        const nextTransfer = { season: '05/06', date: '2006-01-15' }
        expect(calculateSeasonEnd(transfer, nextTransfer, '24/25')).toBe('04/05')
    })

    it('handles 00→99 edge case', () => {
        const t = { season: '99/00', date: '1999-07-01' }
        const next = { season: '00/01', date: '2000-06-01' }
        expect(calculateSeasonEnd(t, next, '24/25')).toBe('99/00')
    })
})
