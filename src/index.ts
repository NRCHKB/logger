import Debug from 'debug'
import { Node } from 'node-red'
import { CallbackType, Logger, LoggerSetupData } from './types'

const helpers = require('./helpers')

let LOGGER_DEBUG_COLOR = process.env.LOGGER_DEBUG_COLOR || '4'
let LOGGER_ERROR_COLOR = process.env.LOGGER_ERROR_COLOR || '9'
let LOGGER_TRACE_COLOR = process.env.LOGGER_TRACE_COLOR || '15'
let LOGGER_DEBUG_ENABLED =
    process.env.LOGGER_DEBUG_ENABLED &&
    process.env.LOGGER_DEBUG_ENABLED === 'true'
let LOGGER_ERROR_ENABLED =
    (process.env.LOGGER_ERROR_ENABLED &&
        process.env.LOGGER_ERROR_ENABLED === 'true') ||
    true
let LOGGER_TRACE_ENABLED =
    process.env.LOGGER_TRACE_ENABLED &&
    process.env.LOGGER_TRACE_ENABLED === 'true'

let LOGGER_TIMESTAMP_ENABLED = process.env.LOGGER_TIMESTAMP_ENABLED || false

export const loggerSetup = ({
    debugColor,
    debugEnabled,
    errorColor,
    errorEnabled,
    traceColor,
    traceEnabled,
    timestampEnabled,
}: LoggerSetupData): void => {
    if (debugColor !== undefined) {
        LOGGER_DEBUG_COLOR = debugColor
    }

    if (debugEnabled !== undefined) {
        LOGGER_DEBUG_ENABLED = debugEnabled
    }

    if (errorColor !== undefined) {
        LOGGER_ERROR_COLOR = errorColor
    }

    if (errorEnabled !== undefined) {
        LOGGER_ERROR_ENABLED = errorEnabled
    }

    if (traceColor !== undefined) {
        LOGGER_TRACE_COLOR = traceColor
    }

    if (traceEnabled !== undefined) {
        LOGGER_TRACE_ENABLED = traceEnabled
    }

    if (timestampEnabled !== undefined) {
        if (typeof timestampEnabled === 'boolean') {
            LOGGER_TIMESTAMP_ENABLED = timestampEnabled
        } else {
            timestampEnabled.split(',').forEach((n) => {
                helpers.setTimestamp(Debug, true, n)
            })
        }
    }
}

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

export const logger: Logger = (
    namespacePrefix,
    namespace,
    messagePrefix,
    node?
) => {
    helpers.setTimestamp(Debug, LOGGER_TIMESTAMP_ENABLED, namespacePrefix)

    //DEBUG
    const debug = Debug(
        namespace ? `${namespacePrefix}:${namespace}` : namespacePrefix
    )
    debug.color = LOGGER_DEBUG_COLOR
    if (LOGGER_DEBUG_ENABLED) {
        debug.enabled = LOGGER_DEBUG_ENABLED
    }
    const logDebug = logMessage(debug, messagePrefix, node)

    //ERROR
    const error = Debug(
        namespace
            ? `${namespacePrefix}-Error:${namespace}`
            : `${namespacePrefix}-Error`
    )
    error.color = LOGGER_ERROR_COLOR
    error.enabled = LOGGER_ERROR_ENABLED
    const logError = (
        message: string,
        nodeError = true,
        injectedNode?: Node
    ) => {
        const nodeToUse = injectedNode || node

        if (nodeToUse && nodeError) {
            nodeToUse.error(message)
        }

        logMessage(error, messagePrefix, nodeToUse)(message)
    }

    //TRACE
    const trace = Debug(
        namespace
            ? `${namespacePrefix}-Trace:${namespace}`
            : `${namespacePrefix}-Trace`
    )
    trace.color = LOGGER_TRACE_COLOR
    if (LOGGER_TRACE_ENABLED) {
        trace.enabled = LOGGER_TRACE_ENABLED
    }
    const logTrace = logMessage(trace, messagePrefix, node)

    return {
        debug: logDebug,
        error: logError,
        trace: logTrace,
    }
}

module.exports = { logger, loggerSetup }
