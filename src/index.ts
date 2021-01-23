import Debug from 'debug'
import { Node } from 'node-red'

type CallbackType = {
    (message: string): void
}

export type Loggers = {
    debug: CallbackType
    error: (message: string, nodeError?: boolean) => void
    trace: CallbackType
}

export type Logger = (
    namespace?: string,
    messagePrefix?: string,
    node?: Node
) => Loggers

const logDebugColor = '4'
const logErrorColor = '9'
const logTraceColor = '15'

const logMessage = (
    callback: CallbackType,
    prefix?: string,
    node?: Node
): CallbackType => {
    return (message): void => {
        const messagePrefix = node ? `${node.name}:${node.id}` : prefix

        if (messagePrefix) {
            return callback(`[${messagePrefix}] ${message}`)
        } else {
            return callback(`${message}`)
        }
    }
}

export const logger: Logger = (namespace, messagePrefix, node?) => {
    const debug = Debug(namespace ? `NRCHKB:${namespace}` : 'NRCHKB')
    debug.color = logDebugColor
    const logDebug = logMessage(debug, messagePrefix, node)

    const error = Debug(
        namespace ? `NRCHKB-Error:${namespace}` : 'NRCHKB-Error'
    )
    error.enabled = true
    error.color = logErrorColor
    const logError = (message: string, nodeError = true) => {
        if (node && nodeError) {
            node.error(message)
        }

        logMessage(error, messagePrefix, node)(message)
    }

    const trace = Debug(
        namespace ? `NRCHKB-Trace:${namespace}` : 'NRCHKB-Trace'
    )
    trace.color = logTraceColor
    const logTrace = logMessage(trace, messagePrefix, node)

    return {
        debug: logDebug,
        error: logError,
        trace: logTrace,
    }
}

// noinspection JSUnusedGlobalSymbols
export default logger

module.exports = logger
