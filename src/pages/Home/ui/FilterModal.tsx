import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	useFiltersList,
	useFiltersStore,
	useSelectedFilters
} from '../../../shared/stores/filtersStore'
import { Button } from './Button'
import { ConfirmationModal } from './ConfirmationModal'
import { FilterCategory } from './FilterCategory'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
	onApplyFilters: () => void
}

export const FilterModal = ({
	isOpen,
	onClose,
	onApplyFilters
}: FilterModalProps) => {
	const { t } = useTranslation('modal')
	const [showConfirmation, setShowConfirmation] = useState(false)

	const { updateFilter, clearFilters, restoreFromLocalStorage } =
		useFiltersStore()
	const selectedFilters = useSelectedFilters()
	const filtersList = useFiltersList()

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, onClose])

	const handleOptionChange = (
		categoryId: string,
		optionId: string,
		isSelected: boolean
	) => {
		updateFilter(categoryId, optionId, isSelected)
	}

	const handleApply = () => {
		setShowConfirmation(true)
	}

	const handleConfirmApply = () => {
		onApplyFilters()
		setShowConfirmation(false)
		onClose()
	}

	const handleCancelApply = () => {
		restoreFromLocalStorage()
		setShowConfirmation(false)
	}

	const handleClearAll = () => {
		clearFilters()
	}

	if (!isOpen) {
		return null
	}

	return (
		<div className="fixed inset-0 z-40 flex w-full h-full items-center justify-center p-20">
			<div
				className="absolute inset-0 bg-[#1B1B1B4D] backdrop-blur-sm"
				onClick={onClose}
			/>

			<div className="relative bg-white w-full max-h-full overflow-y-auto rounded-[16px] py-10 px-8 flex flex-col gap-8">
				<button
					onClick={onClose}
					className="absolute top-[42px] right-[33px] p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
					aria-label="Close modal"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19.557 0.458161C19.4167 0.317531 19.25 0.20596 19.0665 0.129836C18.8829 0.0537112 18.6862 0.0145271 18.4875 0.0145271C18.2889 0.0145271 18.0921 0.0537112 17.9086 0.129836C17.7251 0.20596 17.5584 0.317531 17.4181 0.458161L10 7.86105L2.58194 0.442991C2.4415 0.302545 2.27476 0.191138 2.09126 0.115129C1.90776 0.0391207 1.71109 1.47983e-09 1.51247 0C1.31385 -1.47983e-09 1.11717 0.0391207 0.93367 0.115129C0.750169 0.191138 0.583436 0.302545 0.442991 0.442991C0.302545 0.583436 0.191138 0.750169 0.115129 0.93367C0.0391207 1.11717 -1.47983e-09 1.31385 0 1.51247C1.47983e-09 1.71109 0.0391207 1.90776 0.115129 2.09126C0.191138 2.27476 0.302545 2.4415 0.442991 2.58194L7.86105 10L0.442991 17.4181C0.302545 17.5585 0.191138 17.7252 0.115129 17.9087C0.0391207 18.0922 0 18.2889 0 18.4875C0 18.6862 0.0391207 18.8828 0.115129 19.0663C0.191138 19.2498 0.302545 19.4166 0.442991 19.557C0.583436 19.6975 0.750169 19.8089 0.93367 19.8849C1.11717 19.9609 1.31385 20 1.51247 20C1.71109 20 1.90776 19.9609 2.09126 19.8849C2.27476 19.8089 2.4415 19.6975 2.58194 19.557L10 12.1389L17.4181 19.557C17.5585 19.6975 17.7252 19.8089 17.9087 19.8849C18.0922 19.9609 18.2889 20 18.4875 20C18.6862 20 18.8828 19.9609 19.0663 19.8849C19.2498 19.8089 19.4166 19.6975 19.557 19.557C19.6975 19.4166 19.8089 19.2498 19.8849 19.0663C19.9609 18.8828 20 18.6862 20 18.4875C20 18.2889 19.9609 18.0922 19.8849 17.9087C19.8089 17.7252 19.6975 17.5585 19.557 17.4181L12.1389 10L19.557 2.58194C20.1335 2.00549 20.1335 1.03462 19.557 0.458161Z"
							fill="#31393C"
						/>
					</svg>
				</button>

				<div className="flex justify-center pb-[25px] border-b border-[#B4B4B4]">
					<h2 className="font-[500] text-[40px] leading-[100%] tracking-[0%] font-inter text-[#31393C]">
						{t('filterModal.title')}
					</h2>
				</div>
				<div className="flex flex-col gap-8">
					{filtersList.map(filter => (
						<FilterCategory
							key={filter.id}
							title={filter.name}
							options={filter.options || []}
							selectedOptions={selectedFilters[filter.id] || []}
							onOptionChange={(optionId, isSelected) =>
								handleOptionChange(filter.id, optionId, isSelected)
							}
						/>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4">
					<span></span>
					<Button
						onClick={handleApply}
						className="justify-self-center w-full max-w-[184px]"
					>
						{t('filterModal.applyButton')}
					</Button>
					<button
						onClick={handleClearAll}
						className="justify-self-end text-[#078691] underline font-medium text-base hover:text-[#1A9B94] transition-colors cursor-pointer"
					>
						{t('filterModal.clearAllButton')}
					</button>
				</div>
			</div>

			<ConfirmationModal
				isOpen={showConfirmation}
				onClose={handleCancelApply}
				onConfirm={handleConfirmApply}
				onCancel={handleCancelApply}
			/>
		</div>
	)
}
