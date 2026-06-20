import { Node } from 'node-red'

export type CallbackType = {
    (message: string): void
}

export enum LogLevel {
    INHERIT = 'INHERIT',
    DISABLED = 'DISABLED',
    DEBUG = 'DEBUG',
    TRACE = 'TRACE',
    ERROR = 'ERROR',
}

export type LogLevelValue =
    | LogLevel
    | keyof typeof LogLevel
    | Lowercase<keyof typeof LogLevel>

export type LoggerOptions = {
    level?: LogLevelValue
}

export type Loggers = {
    debug: CallbackType
    error:
        | ((message: string, nodeError?: boolean, injectedNode?: Node) => void)
        | CallbackType
    trace: CallbackType
    level: (
        level: LogLevel
    ) =>
        | ((message: string, nodeError?: boolean, injectedNode?: Node) => void)
        | CallbackType
}

export type LoggerSetupData = {
    debugColor?: string
    debugEnabled?: boolean
    errorColor?: string
    errorEnabled?: boolean
    traceColor?: string
    traceEnabled?: boolean
    timestampEnabled?: boolean | string
}

export type Logger = (
    namespacePrefix: string,
    namespace?: string,
    messagePrefix?: string,
    node?: Node,
    options?: LoggerOptions
) => Loggers
