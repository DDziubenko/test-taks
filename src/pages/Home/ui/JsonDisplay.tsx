interface JsonDisplayProps {
	title: string
	data: unknown
}

export const JsonDisplay = ({ title, data }: JsonDisplayProps) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
			<div className="bg-gray-50 rounded border p-4 max-h-96 overflow-y-auto">
				<pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
					{JSON.stringify(data, null, 2)}
				</pre>
			</div>
		</div>
	)
}
