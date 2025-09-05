import { FilterChooseOption } from '../../../shared/api/types/Filter'

interface FilterOptionProps {
	option: FilterChooseOption
	isSelected: boolean
	onChange: (optionId: string, isSelected: boolean) => void
}

export const FilterOption = ({
	option,
	isSelected,
	onChange
}: FilterOptionProps) => {
	return (
		<label className="flex items-center space-x-3 cursor-pointer">
			<div className="relative">
				<input
					type="checkbox"
					checked={isSelected}
					onChange={e => onChange(option.id, e.target.checked)}
					className="sr-only"
				/>
				<div
					className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-colors ${
						isSelected
							? 'bg-[#31393C] border-[#31393C]'
							: 'bg-white border-[#31393C]'
					}`}
				>
					{isSelected && (
						<svg
							className="w-3 h-3 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>
			</div>
			<div className="flex-1">
				<span className="text-base text-[#31393C]">{option.name}</span>
			</div>
		</label>
	)
}
