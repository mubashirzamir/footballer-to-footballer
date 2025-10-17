import { ENV_IS_DEV } from '@/utils/constants.ts'

export const emptyFunction = () => {}

export class Logger {
    static log(...args: any[]) {
        if (ENV_IS_DEV) {
            console.log('F2F: ', ...args)
        }
    }
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
