import { DEFAULT_GAME, ENV_IS_DEV } from '@/utils/constants.ts'
import type { GameInfo } from '@/structures'

export const emptyFunction = () => {}

export class Logger {
    static log(...args: any[]) {
        if (ENV_IS_DEV) {
            console.log('F2F: ', ...args)
        }
    }
}

export const scrollToTop = (behavior: ScrollBehavior = 'instant') => {
    window.scrollTo({ top: 0, behavior })
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
            func(...args)
        }, wait)
    }
}

export const secondstoHourMinutesSeconds = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    const hh = hrs.toString().padStart(2, '0')
    const mm = mins.toString().padStart(2, '0')
    const ss = secs.toString().padStart(2, '0')

    return `${hh}:${mm}:${ss}`
}

export const isDefaultGame = (info: GameInfo) => {
    const isRegular =
        info.startPlayer.id === DEFAULT_GAME.startPlayer.id && info.endPlayer.id === DEFAULT_GAME.endPlayer.id
    const isReversed =
        info.startPlayer.id === DEFAULT_GAME.endPlayer.id && info.endPlayer.id === DEFAULT_GAME.startPlayer.id

    return isRegular || isReversed
}

/**
 * Declared as a function instead of a `const` arrow function.
 *
 * - Function declarations are initialized during module instantiation, so they can be safely called during module load e.g. in constants.ts file.
 * - `const` bindings are initialized only when execution reaches their declaration and are inaccessible beforehand (Temporal Dead Zone), which can cause runtime errors if accessed during module initialization.
 */
export function randomDate(from: Date, to: Date) {
    const fromTime = from.getTime()
    const toTime = to.getTime()
    return new Date(fromTime + Math.random() * (toTime - fromTime)).toISOString().slice(0, 10)
}
