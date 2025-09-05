import { useQuery } from '@tanstack/react-query'

import { getFilters } from '../filtersApi'

export const FILTERS_QUERY_KEY = ['filters'] as const

export const useFilters = () => {
	return useQuery({
		queryKey: FILTERS_QUERY_KEY,
		queryFn: getFilters,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000
	})
}
