import { en } from '@/lang/en'

const LANGUAGES = { en } as const
const currentLang = import.meta.env.VITE_LANGUAGE as keyof typeof LANGUAGES

export const __ = LANGUAGES[currentLang] ?? en
