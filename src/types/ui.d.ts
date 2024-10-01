type UIButton = {
	type: 'button'
	action: () => void
	config?: {
		disabled?: boolean
		value?: string
	}
}

type UICheckbox = {
	type: 'checkbox'
	config?: {
		default?: string
		label?: string
		disabled?: boolean
		value?: boolean
	}
	persistence: PersistenceInfo
}

type UICheckboxList = {
	type: 'checkbox_list'
	config?: {
		columns?: number
		disabled?: boolean
		value?: boolean[] | number[] | string[]
		value_type?: 'boolean' | 'number' | 'string'
	}
	data_source?: {
		data_source?: string
		hot_reload?: boolean
		loading?: string
	}
	persistence: PersistenceInfo
}

type UIColor = {
	type: 'color'
	config?: {
		default?: string
		disabled?: boolean
		value?: string
	}
	persistence: PersistenceInfo
}

type UIDate = {
	type: 'data'
	config?: {
		default?: string
		disabled?: boolean
		max?: string
		min?: string
		step?: number
		type?: string
		value?: string
	}
	persistence: PersistenceInfo
}

type UIDateTime = {
	type: 'datetime'
	config?: {
		default?: string
		disabled?: boolean
		max?: string
		min?: string
		step?: number
		type?: string
		value?: string
	}
	persistence: PersistenceInfo
}

type UIDelegate = {
	type: 'delegate'
	config?: {
		default?: string
		disabled?: boolean
		format_type?: string
		label?: string
		invoke?: string
		value?: unknown
	}
	persistence?: PersistenceInfo
}

type UIFile = {
	type: 'file'
	config?: {
		accept?: string
		disabled?: boolean
		label?: string
		value?: string
	}
	persistence: PersistenceInfo
}

type UIMonth = {
	type: 'month'
	config?: {
		default?: string
		disabled?: boolean
		max?: string
		min?: string
		step?: number
		type?: string
		value?: string
	}
	persistence: PersistenceInfo
}

type UIPassword = {
	type: 'password'
	conifg?: {
		disabled?: boolean
		max_length?: number
		placeholder?: string
		required?: boolean
		value?: string
	}
	persistence: PersistenceInfo
}

type UIRadio = {
	type: 'radio'
	config?: {
		columns?: number
		default?: string
		disabled?: boolean
		value?: string
		value_type?: 'boolean' | 'number' | 'string'
	}
	data_source?: {
		data_source?: string
		hot_reload?: boolean
		loading?: string
	}
	persistence: PersistenceInfo
}

type UIRange = {
	type: 'range'
	config?: {
		default?: string
		disabled?: boolean
		max?: string
		min?: string
		show_labels?: boolean
		step?: number
		value?: string
	}
	persistence: PersistenceInfo
}

type UISelect = {
	type: 'select'
	config?: {
		default?: string
		disabled?: boolean
		placeholder?: string
		value?: string
		value_type: 'boolean' | 'number' | 'string'
	}
	data_source?: {
		data_source?: string
		hot_reload?: boolean
		loading?: string
		show_refresh?: boolean
	}
	persistence: PersistenceInfo & { label_setting?: string }
}

type UITextArea = {
	type: 'textarea'
	config?: {
		disabled?: boolean
		max_length?: number
		rows?: number
		show_length?: boolean
		value?: string
	}
	persistence: PersistenceInfo
}

type UITextField = {
	type: 'textfield'
	config?: {
		disabled?: boolean
		max_length?: number
		pattern?: string
		placeholder?: string
		required?: boolean
		value?: string
	}
	persistence: PersistenceInfo
}

type UITime = {
	type: 'time'
	config?: {
		default?: string
		disabled?: boolean
		max?: string
		min?: string
		step?: number
		type?: string
		value?: string
	}
	persistence: PersistenceInfo
}

type UIWeek = {
	type: 'week'
	config?: {
		default?: string
		disabled?: boolean
		max?: string
		min?: string
		step?: number
		type?: string
		value?: string
	}
	persistence: PersistenceInfo
}

type PersistenceInfo = {
	global?: boolean
	setting: string
}

/**
 * General UI Item Type to be used inside of spikey
 */
export type UIItem = {
	label: string
} & (
	| UIButton
	| UICheckbox
	| UICheckboxList
	| UIColor
	| UIDate
	| UIDateTime
	| UIDelegate
	| UIFile
	| UIMonth
	| UIPassword
	| UIRadio
	| UIRange
	| UISelect
	| UITextArea
	| UITextField
	| UITime
	| UIWeek
)

/**
 * Action UI Config Type to be used inside of spikey
 */
export type ActionUIConfig = UIItem[]
