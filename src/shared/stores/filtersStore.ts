import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { SelectedFilters } from '../../pages/Home/types/SelectedFilters'
import { FilterItem } from '../api/types/Filter'

interface FiltersState {
	filtersList: FilterItem[]
	selectedFilters: SelectedFilters
	isModalOpen: boolean

	setFiltersList: (filters: FilterItem[]) => void
	setSelectedFilters: (filters: SelectedFilters) => void
	updateFilter: (
		categoryId: string,
		optionId: string,
		isSelected: boolean
	) => void
	clearFilters: () => void
	setModalOpen: (isOpen: boolean) => void
	saveToLocalStorage: () => void
	loadFromLocalStorage: () => void
	restoreFromLocalStorage: () => void
	reset: () => void
}

const initialState = {
	filtersList: [],
	selectedFilters: {},
	isModalOpen: false
}

export const useFiltersStore = create<FiltersState>()(
	devtools(
		immer(set => ({
			...initialState,

			setFiltersList: filters =>
				set(state => {
					state.filtersList = filters
				}),

			setSelectedFilters: filters =>
				set(state => {
					state.selectedFilters = filters
				}),

			updateFilter: (categoryId, optionId, isSelected) =>
				set(state => {
					const categoryFilters = state.selectedFilters[categoryId] || []
					if (isSelected) {
						state.selectedFilters[categoryId] = [...categoryFilters, optionId]
					} else {
						state.selectedFilters[categoryId] = categoryFilters.filter(
							id => id !== optionId
						)
					}
				}),

			clearFilters: () =>
				set(state => {
					state.selectedFilters = {}
				}),

			setModalOpen: isOpen =>
				set(state => {
					state.isModalOpen = isOpen
				}),

			saveToLocalStorage: () =>
				set(state => {
					try {
						localStorage.setItem(
							'selectedFilters',
							JSON.stringify(state.selectedFilters)
						)
					} catch (error) {
						console.error('Failed to save filters to localStorage:', error)
					}
				}),

			// I decided  to reload filters from storage when user click on Use old filter button
			loadFromLocalStorage: () =>
				set(state => {
					try {
						const savedFilters = localStorage.getItem('selectedFilters')
						if (savedFilters) {
							const parsedFilters = JSON.parse(savedFilters)
							state.selectedFilters = parsedFilters
						}
					} catch (error) {
						console.error('Failed to load filters from localStorage:', error)
					}
				}),

			restoreFromLocalStorage: () =>
				set(state => {
					try {
						const savedFilters = localStorage.getItem('selectedFilters')
						if (savedFilters) {
							const parsedFilters = JSON.parse(savedFilters)
							state.selectedFilters = parsedFilters
						} else {
							state.selectedFilters = {}
						}
					} catch (error) {
						console.error('Failed to restore filters from localStorage:', error)
						state.selectedFilters = {}
					}
				}),

			reset: () =>
				set(state => {
					Object.assign(state, initialState)
				})
		})),
		{
			name: 'filters-store'
		}
	)
)

export const useFiltersList = () => useFiltersStore(state => state.filtersList)
export const useSelectedFilters = () =>
	useFiltersStore(state => state.selectedFilters)
export const useIsModalOpen = () => useFiltersStore(state => state.isModalOpen)
