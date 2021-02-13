const namespaces = []

const setTimestamp = (
    debug,
    LOGGER_TIMESTAMP_ENABLED,
    namespacePrefix,
    namespace = ''
) => {
    if (LOGGER_TIMESTAMP_ENABLED) {
        namespaces.push(
            namespacePrefix,
            namespacePrefix + '-Trace',
            namespacePrefix + '-Error',
            namespacePrefix + ':',
            namespacePrefix + '-Trace:',
            namespacePrefix + '-Error:',
            namespacePrefix + ':' + namespace,
            namespacePrefix + '-Trace:' + namespace,
            namespacePrefix + '-Error:' + namespace
        )
    }

    debug.formatArgs = function (args) {
        const { namespace: name, useColors } = this

        if (useColors) {
            const timestamp = namespaces.includes(this?.namespace)
                ? new Date().toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                  }) + ' '
                : '  '

            const c = this.color
            const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c)
            const prefix = `${colorCode};1m${name} \u001B[0m`

            args[0] =
                timestamp + prefix + args[0].split('\n').join('\n' + prefix)
            args.push(
                colorCode + 'm+' + debug.humanize(this.diff) + '\u001B[0m'
            )
        } else {
            args[0] = getDate() + name + ' ' + args[0]
        }
    }
}

module.exports = { setTimestamp }
