import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilters } from '../../../shared/api/hooks/useFilters'
import {
	useFiltersList,
	useFiltersStore,
	useIsModalOpen,
	useSelectedFilters
} from '../../../shared/stores/filtersStore'
import { FilterModal } from './FilterModal'
import { JsonDisplay } from './JsonDisplay'

export const App = () => {
	const { t } = useTranslation('home')

	const {
		setFiltersList,
		setModalOpen,
		loadFromLocalStorage,
		saveToLocalStorage
	} = useFiltersStore()
	const filtersList = useFiltersList()
	const selectedFilters = useSelectedFilters()
	const isModalOpen = useIsModalOpen()

	const { data: filtersData, isLoading: filtersLoading } = useFilters()

	useEffect(() => {
		loadFromLocalStorage()
	}, [loadFromLocalStorage])

	useEffect(() => {
		if (filtersData?.filterItems) {
			setFiltersList(filtersData.filterItems)
		}
	}, [filtersData, setFiltersList])

	const handleOpenFiltersModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleApplyFilters = () => {
		saveToLocalStorage()
	}

	return (
		<>
			<section className="w-full min-h-screen flex flex-col items-center justify-start py-12">
				<h1 className="text-6xl text-gray-600 mb-12">{t('title')}</h1>

				<div className="mb-8">
					<button
						onClick={handleOpenFiltersModal}
						className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
					>
						{t('buttons.openFiltersModal')}
					</button>
				</div>

				{filtersLoading && (
					<div className="text-lg text-blue-600 mb-4">
						{t('loading.filters')}
					</div>
				)}

				<div className="w-full max-w-7xl mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<JsonDisplay
							title={t('data.filterDataTitle')}
							data={
								filtersList.length > 0 ? filtersList : t('data.noDataLoaded')
							}
						/>

						<JsonDisplay
							title={t('data.selectedFiltersTitle')}
							data={selectedFilters}
						/>
					</div>
				</div>
			</section>

			<FilterModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onApplyFilters={handleApplyFilters}
			/>
		</>
	)
}
