import { ENV_IS_DEV } from '@/utils/constants.ts'

export const emptyFunction = () => {}

export class Logger {
    static log(...args: any[]) {
        if (ENV_IS_DEV) {
            console.log('F2F: ', ...args)
        }
    }
}
