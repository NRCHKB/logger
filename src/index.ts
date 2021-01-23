import Debug from 'debug'
import { Node } from 'node-red'

type CallbackType = {
    (message: string): void
}

type Logger = {
    debug: CallbackType
    error: (message: string, nodeError: boolean) => void
    trace: CallbackType
}

const logDebugColor = '4'
const logErrorColor = '9'
const logTraceColor = '15'

const log = (
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

export const logger = (
    namespace?: string,
    messagePrefix?: string,
    node?: Node
): Logger => {
    const debug = Debug(namespace ? `NRCHKB:${namespace}` : 'NRCHKB')
    debug.color = logDebugColor
    const logDebug = log(debug, messagePrefix, node)

    const error = Debug(
        namespace ? `NRCHKB-Error:${namespace}` : 'NRCHKB-Error'
    )
    error.enabled = true
    error.color = logErrorColor
    const logError = (message: string, nodeError = true) => {
        if (node && nodeError) {
            node.error(message)
        }

        log(error, messagePrefix, node)(message)
    }

    const trace = Debug(
        namespace ? `NRCHKB-Trace:${namespace}` : 'NRCHKB-Trace'
    )
    trace.color = logTraceColor
    const logTrace = log(trace, messagePrefix, node)

    return {
        debug: logDebug,
        error: logError,
        trace: logTrace,
    }
}

// noinspection JSUnusedGlobalSymbols
export default logger
