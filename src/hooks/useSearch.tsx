import { type ChangeEvent, useMemo, useState } from 'react'
import { debounce } from '@/utils'

const useSearch = <T extends Record<string, any>>(items: T[], searchKey: keyof T = 'name', wait: number = 0) => {
    const [query, setQuery] = useState('')
    const filteredItems = useMemo(() => filter(items, query, searchKey), [items, query, searchKey])
    const debouncedHandleSearchChange = useMemo(
        () => debounce((e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), wait),
        [wait]
    )

    return {
        query,
        setQuery,
        filteredItems,
        handleSearchChange: debouncedHandleSearchChange,
    }
}

const filter = <T extends Record<string, any>>(items: T[], query: string, searchKey: keyof T = 'name') => {
    if (!query) return items

    const normalize = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
    }

    const normalizedQuery = normalize(query)

    return items.filter((item) => {
        const raw = String(item[searchKey] ?? '')
        const value = normalize(raw)
        return value.includes(normalizedQuery)
    })
}

export default useSearch
