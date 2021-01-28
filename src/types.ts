import { Node } from 'node-red'

export type CallbackType = {
    (message: string): void
}

export type Loggers = {
    debug: CallbackType
    error: (message: string, nodeError?: boolean) => void
    trace: CallbackType
}

export type LoggerSetupData = {
    namespacePrefix?: string
    debugColor?: string
    debugEnabled?: boolean
    errorColor?: string
    errorEnabled?: boolean
    traceColor?: string
    traceEnabled?: boolean
}

export type Logger = (
    namespace?: string,
    messagePrefix?: string,
    node?: Node
) => Loggers
