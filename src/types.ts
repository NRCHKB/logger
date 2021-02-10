import { Node } from 'node-red'

export type CallbackType = {
    (message: string): void
}

export type Loggers = {
    debug: CallbackType
    error: (message: string, nodeError?: boolean, injectedNode?: Node) => void
    trace: CallbackType
}

export type LoggerSetupData = {
    debugColor?: string
    debugEnabled?: boolean
    errorColor?: string
    errorEnabled?: boolean
    traceColor?: string
    traceEnabled?: boolean
}

export type Logger = (
    namespacePrefix: string,
    namespace?: string,
    messagePrefix?: string,
    node?: Node
) => Loggers
