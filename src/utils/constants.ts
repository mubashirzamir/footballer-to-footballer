export const ENV_IS_DEV = import.meta.env.DEV
export const ENV_IS_PROD = import.meta.env.PROD

export const DELAY = 100 // 0.1 seconds

export const API_IMPLEMENTATIONS = {
    TRANSFRMARKET: 'transfrmarket',
    FBREF: 'fbref',
    MOCK: 'mock',
}
export const API_IMPLEMENTATION = import.meta.env.VITE_API_IMPLEMENTATION || API_IMPLEMENTATIONS.MOCK
