'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.logger = void 0
const debug_1 = __importDefault(require('debug'))
const logDebugColor = '4'
const logErrorColor = '9'
const logTraceColor = '15'
const log = (callback, prefix, node) => {
    return (message) => {
        const messagePrefix = node ? `${node.name}:${node.id}` : prefix
        if (messagePrefix) {
            return callback(`[${messagePrefix}] ${message}`)
        }
        else {
            return callback(`${message}`)
        }
    }
}
const logger = (namespace, messagePrefix, node) => {
    const debug = debug_1.default(namespace ? `NRCHKB:${namespace}` : 'NRCHKB')
    debug.color = logDebugColor
    const logDebug = log(debug, messagePrefix, node)
    const error = debug_1.default(namespace ? `NRCHKB-Error:${namespace}` : 'NRCHKB-Error')
    error.enabled = true
    error.color = logErrorColor
    const logError = (message, nodeError = true) => {
        if (node && nodeError) {
            node.error(message)
        }
        log(error, messagePrefix, node)(message)
    }
    const trace = debug_1.default(namespace ? `NRCHKB-Trace:${namespace}` : 'NRCHKB-Trace')
    trace.color = logTraceColor
    const logTrace = log(trace, messagePrefix, node)
    return {
        debug: logDebug,
        error: logError,
        trace: logTrace,
    }
}
exports.logger = logger
exports.default = exports.logger
