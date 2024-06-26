import { Debug } from './types/debug'

const namespaces: string[] = []

const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
}
const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}

export const setTimestamp = (
    debug: Debug,
    LOGGER_TIMESTAMP_ENABLED: string | boolean,
    namespacePrefix: string
) => {
    if (LOGGER_TIMESTAMP_ENABLED) {
        namespaces.push(
            namespacePrefix,
            namespacePrefix + '-Trace',
            namespacePrefix + '-Error'
        )
    }

    debug.formatArgs = function (args) {
        const { namespace, useColors } = this

        if (useColors) {
            let timestamp = '  '

            const useTimestamp =
                namespaces.findIndex((n) => namespace.startsWith(n)) >= 0

            if (useTimestamp) {
                const date = new Date()
                timestamp =
                    date.toLocaleDateString('en-GB', dateOptions) +
                    ' ' +
                    date.toLocaleTimeString('en-GB', timeOptions) +
                    ' '
            }

            const c = this.color
            const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c)
            const prefix = `${colorCode};1m${namespace} \u001B[0m`

            args[0] =
                timestamp + prefix + args[0].split('\n').join('\n' + prefix)
            args.push(
                colorCode + 'm+' + debug.humanize(this.diff) + '\u001B[0m'
            )
        } else {
            const getDate = () => {
                if (debug.inspectOpts?.hideDate) {
                    return ''
                }
                return new Date().toISOString() + ' '
            }

            args[0] = getDate() + namespace + ' ' + args[0]
        }
    }
}
