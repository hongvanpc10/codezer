import RootSelect, {
	components,
	IndicatorsContainerProps,
	MultiValueRemoveProps,
} from 'react-select'
import { ArrowDownIcon, CloseIcon } from '../icons'

interface Option {
	label: string
	value: any
}

interface Props {
	options: Option[]
	placeholder?: string
	onChange?: (values: any) => void
	defaultValue?: any
}

function IndicatorsContainer(props: IndicatorsContainerProps) {
	return (
		<components.IndicatorsContainer {...props}>
			<ArrowDownIcon className='h-5' />
		</components.IndicatorsContainer>
	)
}

function MultiValueRemove(props: MultiValueRemoveProps) {
	return (
		<components.MultiValueRemove {...props}>
			<CloseIcon className='h-3' />
		</components.MultiValueRemove>
	)
}

export default function MultipleSelect({
	options,
	placeholder,
	onChange,
	defaultValue,
}: Props) {
	return (
		<RootSelect
			options={options}
			placeholder={placeholder}
			isMulti
			defaultValue={defaultValue}
			classNames={{
				control: state =>
					`!bg-blue-100/50 !border-none !rounded-[0.875rem] !min-h-[2.75rem] !cursor-pointer ${
						state.isFocused &&
						'!ring-2 !ring-offset-1 !ring-blue-500/75'
					}`,
				input: () => '!input !text-blue',
				container: () => '!text-blue',
				placeholder: () => '!text-blue-900/40 !font-medium',
				indicatorSeparator: () => '!bg-blue-100',
				indicatorsContainer: () => '!p-2',
				menu: () =>
					'!bg-white/[.98] !rounded-2xl !shadow-2xl !shadow-blue-900/25',
				menuList: () => '!p-2 !space-y-1.5',
				option: state =>
					`!px-6 !py-2.5 !rounded-xl !cursor-pointer !font-medium !transition ${
						state.isFocused && '!bg-blue-50'
					}`,
				multiValue: () => '!bg-blue-100 !rounded-xl !px-1.5',
				multiValueLabel: () => '!text-blue-900 !font-medium',
				multiValueRemove: () =>
					'hover:!bg-transparent hover:!text-blue-800 !transition',
				noOptionsMessage: () => '!text-blue-900 !font-medium',
			}}
			noOptionsMessage={() => 'Không có kết quả'}
			components={{
				IndicatorsContainer,
				MultiValueRemove,
			}}
			onChange={options => {
				onChange &&
					onChange(options.map(option => (option as Option).value))
			}}
		/>
	)
}
