import { FilterChooseOption } from '../../../shared/api/types/Filter'
import { FilterOption } from './FilterOption'

interface FilterCategoryProps {
	title: string
	options: FilterChooseOption[]
	selectedOptions: string[]
	onOptionChange: (optionId: string, isSelected: boolean) => void
}

export const FilterCategory = ({
	title,
	options,
	selectedOptions,
	onOptionChange
}: FilterCategoryProps) => {
	return (
		<div className="border-b border-[#B4B4B4] pb-8">
			<h3 className="text-2xl font-medium text-[#31393C] mb-6">{title}</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{options.map(option => {
					const isSelected = selectedOptions.includes(option.id)
					return (
						<FilterOption
							key={option.id}
							option={option}
							isSelected={isSelected}
							onChange={onOptionChange}
						/>
					)
				})}
			</div>
		</div>
	)
}
