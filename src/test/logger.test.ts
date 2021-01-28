import 'should'

import { describe, it } from 'mocha'

process.env.LOGGER_NAMESPACE_PREFIX = 'LOGGER'
process.env.LOGGER_DEBUG_COLOR = '11'
process.env.LOGGER_ERROR_COLOR = '12'
process.env.LOGGER_TRACE_COLOR = '13'

describe('Logger', function () {
    this.timeout(30000)

    it('should be loaded', function (done) {
        const { logger } = require('../index')
        const log = logger()

        log.debug('Yellow')
        log.error('Blue')
        log.trace('Pink')

        done()
    })

    it('setup', function (done) {
        const { logger, loggerSetup } = require('../index')
        loggerSetup({
            namespacePrefix: 'LOGGER_SETUP',
            debugColor: '9',
            errorColor: '10',
            traceColor: '11',
        })

        const someRandomNodeId = Math.random().toString(36)
        const log = logger('SETUP', `MyNode:${someRandomNodeId}`)

        log.debug('Red')
        log.error('Green')
        log.trace('Yellow')

        done()
    })
})
