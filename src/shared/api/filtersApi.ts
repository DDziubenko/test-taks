import { SelectedFilters } from '../../pages/Home/types/SelectedFilters'
import { FilterItem } from '../api/types/Filter'

export interface FiltersResponse {
	filterItems: FilterItem[]
}

export interface ApplyFiltersRequest {
	filters: SelectedFilters
}

export interface ApplyFiltersResponse {
	success: boolean
	message: string
	results?: unknown[]
}

export const getFilters = async (): Promise<FiltersResponse> => {
	const response = await fetch('/src/shared/temp/filterData.json')
	if (!response.ok) {
		throw new Error('Failed to fetch filters')
	}
	return response.json()
}
