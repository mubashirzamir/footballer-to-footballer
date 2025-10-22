export const ENV_IS_DEV = import.meta.env.DEV
export const ENV_IS_PROD = import.meta.env.PROD

export const DELAY = 1000 // 1 second

export const RETRY_ATTEMPTS = 5

export const API_IMPLEMENTATIONS = {
    TRANSFRMARKET: 'transfermarkt',
    FBREF: 'fbref',
    MOCK: 'mock',
}

export const API_IMPLEMENTATION = import.meta.env.VITE_API_IMPLEMENTATION || API_IMPLEMENTATIONS.MOCK

export const API_IMPLEMENTATIONS_SHORTEST_PATH = {
    VERCEL: 'vercel',
    MOCK: 'mock',
}

export const API_IMPLEMENTATION_SHORTEST_PATH = import.meta.env.VITE_API_SHORTEST_PATH_IMPLEMENTATION || API_IMPLEMENTATIONS_SHORTEST_PATH.MOCK
