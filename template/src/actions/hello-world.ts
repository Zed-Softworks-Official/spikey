import { action, KeyDownEvent, SingletonAction } from '@elgato/streamdeck'
import type { StreamDeckActionMetadata, ActionUIConfig } from 'spikey'

export const metadata = {} as StreamDeckActionMetadata
export const ui = [
	{
		type: 'button',
		label: 'Say Hello',
		action: () => {
			console.log('Hello, World!')
		},
	},
	{
		type: 'textfield',
		label: 'Name',
		config: {
			placeholder: 'Enter your name',
		},
		persistence: {
			setting: 'name',
		},
	},
] as ActionUIConfig

// TODO: Remove class decorator
@action({ UUID: 'dev.zedsoftworks-llc.spikey-counter.say-hello' })
export class SayHelloAction extends SingletonAction {
	/**
	 * Called when the user presses the button on the Stream Deck
	 */
	async onKeyDown(ev: KeyDownEvent<object>) {
		await ev.action.setTitle('Hello, World!')
	}
}
