interface ButtonProps {
	children: React.ReactNode
	onClick: () => void
	variant?: 'primary' | 'secondary'
	className?: string
}

export const Button = ({
	children,
	onClick,
	variant = 'primary',
	className = ''
}: ButtonProps) => {
	const baseClasses =
		'px-6 py-3 rounded-[16px] min-w-[184px] min-h-[64px] font-semibold text-base transition-colors cursor-pointer'

	const variantClasses = {
		primary: 'bg-[#FF5F00] text-white hover:bg-[#E55A00]',
		secondary:
			'bg-white text-[#474747] outline-2 outline-[#B4B4B4] hover:bg-gray-50'
	}

	return (
		<button
			onClick={onClick}
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
		>
			{children}
		</button>
	)
}
