import { KeyDownEvent } from '@elgato/streamdeck'

export const metadata = {
	Icon: 'icon.png',
	States: [
		{
			Image: 'imgs/icon.png',
			Title: 'Hello, World!',
			TitleAlignment: 'top',
			MultiActionImage: 'imgs/icon.png',
		},
	],
}

export const onKeyDown = async (event: KeyDownEvent<object>) => {
	await event.action.setTitle('Hello, World!')
}
