type ManifestActionState = {
	Image: string
	TitleAlignment?: 'top' | 'bottom' | 'middle'
	MultiActionImage?: string
	Name?: string
	Title?: string
	ShowTitle?: boolean
	TitleColor?: string
	FontFamily?:
		| 'Arial'
		| 'Arial Black'
		| 'Comic Sans MS'
		| 'Courier'
		| 'Courier New'
		| 'Georgia'
		| 'Impact'
		| 'Microsoft Sans Serif'
		| 'Symbol'
		| 'Tahoma'
		| 'Times New Roman'
		| 'Trebuchet MS'
		| 'Verdana'
		| 'Webdings'
		| 'Wingdings'
	FontStyle?: 'regular' | 'bold' | 'italic' | 'underline'
	FontSize?: number
	FontUnderline?: boolean
}

type ManifestAction = {
	UUID: string
	Icon: string
	Name: string
	States: ManifestActionState[]
}

type ManifestOS =
	| {
			Platform: 'windows'
			MinimumVersion: '10' | '10.0'
	  }
	| {
			Platform: 'mac'
			MinimumVersion: '10.11'
	  }

type ManifestSoftware = {
	MinimumVersion: string
}

type ManifestNodeJS = {
	Version: string
	Debug: 'enabled' | 'disabled'
}

type Manifest = {
	Actions: ManifestAction[]
	Author: string
	CodePath: string
	Description: string
	Icon: string
	Name: string
	Version: string
	SDKVersion: number
	OS: ManifestOS
	Software: ManifestSoftware
	Nodejs: ManifestNodeJS
}
