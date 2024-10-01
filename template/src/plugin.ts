import streamDeck, { LogLevel } from '@elgato/streamdeck'
import { SayHelloAction } from '~/actions/hello-world'

streamDeck.logger.setLevel(LogLevel.TRACE)

streamDeck.actions.registerAction(new SayHelloAction())

streamDeck.connect()
