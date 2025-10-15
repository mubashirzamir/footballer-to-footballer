import { useMemo, useState } from 'react'
import { debounce } from '@/utils'

const useSearch = <T extends Record<string, any>>(items: T[], searchKey: keyof T = 'name', wait: number = 0) => {
    const [query, setQuery] = useState('')
    const filteredItems = useMemo(() => filter(items, query, searchKey), [items, query, searchKey])
    const debouncedHandleSearchChange = useMemo(
        () => debounce((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), wait),
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

    return items.filter((item) => {
        const value = item[searchKey] as string
        return value.toLowerCase().includes(query.toLowerCase())
    })
}

export default useSearch
