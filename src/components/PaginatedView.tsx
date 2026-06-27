import { type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface PaginatedViewProps<T> {
    items: T[]
    pageSizeOptions?: number[]
    defaultPageSize?: number
    children: (paginatedItems: T[]) => ReactNode
    formatPageSizeLabel?: (size: number) => string
}

const PaginatedView = <T,>({
    items,
    pageSizeOptions = [10, 20, 50],
    defaultPageSize = 10,
    children,
    formatPageSizeLabel,
}: PaginatedViewProps<T>) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const pageSize = (pageSizeOptions as readonly number[]).includes(
        Number(searchParams.get('pageSize')),
    )
        ? Number(searchParams.get('pageSize'))
        : defaultPageSize
    const currentPage = Number(searchParams.get('page')) || 1

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
    const safePage = Math.min(currentPage, totalPages)
    const paginatedItems = items.slice((safePage - 1) * pageSize, safePage * pageSize)

    const setPage = (page: number) => {
        setSearchParams((prev) => {
            prev.set('page', String(page))
            return prev
        })
    }

    const setPageSize = (size: number) => {
        setSearchParams((prev) => {
            prev.set('pageSize', String(size))
            prev.set('page', '1')
            return prev
        })
    }

    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = []
        const range = 5
        const halfRange = Math.floor(range / 2)

        let start = Math.max(1, safePage - halfRange)
        const end = Math.min(totalPages, start + range - 1)
        start = Math.max(1, end - range + 1)

        if (start > 1) {
            pages.push(1)
            if (start > 2) pages.push('ellipsis')
        }

        for (let i = start; i <= end; i++) pages.push(i)

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('ellipsis')
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <>
            <div className="flex flex-col gap-2">{children(paginatedItems)}</div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (safePage > 1) setPage(safePage - 1)
                                }}
                                className={safePage <= 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) =>
                            page === 'ellipsis' ? (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === safePage}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setPage(page)
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ),
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (safePage < totalPages) setPage(safePage + 1)
                                }}
                                className={
                                    safePage >= totalPages ? 'pointer-events-none opacity-50' : ''
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}

            <div className="flex justify-end">
                <Select
                    value={String(pageSize)}
                    onValueChange={(v) => setPageSize(Number(v))}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {formatPageSizeLabel ? formatPageSizeLabel(size) : size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}

export default PaginatedView
