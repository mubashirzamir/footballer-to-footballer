import { ENV_IS_DEV } from '@/utils/constants.ts'

export const emptyFunction = () => {}

export class Logger {
    static log(...args: any[]) {
        if (ENV_IS_DEV) {
            console.log('F2F: ', ...args)
        }
    }
}

export const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
            func(...args)
        }, wait)
    }
}
