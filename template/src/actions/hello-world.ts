import { KeyDownEvent } from '@elgato/streamdeck'
import type { StreamDeckActionMetadata } from 'spikey'
import fs from 'fs'

export const metadata = {} as StreamDeckActionMetadata

export const onKeyDown = async (event: KeyDownEvent<object>) => {
	await event.action.setTitle('Hello, World!')
}
