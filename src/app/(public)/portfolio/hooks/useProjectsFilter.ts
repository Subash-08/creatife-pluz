'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export function useProjectsFilter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [filter, setFilter] = useState<string>('All')

    // Initialize from URL params
    useEffect(() => {
        const category = searchParams.get('category')
        if (category) {
            setFilter(category)
        }
    }, [searchParams])

    // Update URL when filter changes
    const updateFilter = (newFilter: string) => {
        setFilter(newFilter)

        const params = new URLSearchParams(searchParams.toString())
        if (newFilter === 'All') {
            params.delete('category')
        } else {
            params.set('category', newFilter)
        }

        // Update URL without page reload (shallow routing)
        router.replace(`?${params.toString()}`, { scroll: false })
    }

    return {
        filter,
        setFilter: updateFilter
    }
}
