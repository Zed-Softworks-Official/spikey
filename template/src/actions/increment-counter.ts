import { KeyDownEvent } from '@elgato/streamdeck'

export const onKeyDown = async (event: KeyDownEvent<object>) => {
	await event.action.setTitle('Hello, World!')
}
