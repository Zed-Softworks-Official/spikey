import { KeyDownEvent } from '@elgato/streamdeck'
import type { StreamDeckActionMetadata } from 'spikey'

export const metadata = {} as StreamDeckActionMetadata
export const ui = {}

export async function onKeyDown(event: KeyDownEvent<object>) {
	await event.action.setTitle('Hello, World!')
}
