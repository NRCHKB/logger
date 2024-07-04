import { Node } from 'node-red'

export type CallbackType = {
    (message: string): void
}

export enum LogLevel {
    DISABLED = 0,
    DEBUG = 1,
    TRACE = 2,
    ERROR = 3,
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
    node?: Node
) => Loggers
