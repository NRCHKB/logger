import 'should'

import { describe, it } from 'mocha'

process.env.LOGGER_DEBUG_COLOR = '11'
process.env.LOGGER_ERROR_COLOR = '12'
process.env.LOGGER_TRACE_COLOR = '13'

describe('Logger', function () {
    this.timeout(30000)

    it('should be loaded', function (done) {
        const { logger } = require('../index')
        const log = logger('LOGGER')

        log.debug('Yellow')
        log.error('Blue')
        log.trace('Pink')

        done()
    })

    it('setup', function (done) {
        const { logger, loggerSetup } = require('../index')
        loggerSetup({
            debugColor: '9',
            errorColor: '10',
            traceColor: '11',
        })

        const someRandomNodeId = Math.random().toString(36)
        const log = logger(
            'LOGGER_SETUP',
            'SETUP',
            `MyNode:${someRandomNodeId}`
        )

        log.debug('Red')
        log.error('Green')
        log.trace('Yellow')

        done()
    })

    it('multiple loggers', function (done) {
        const { logger } = require('../index')

        const log1 = logger(
            'LOGGER_SETUP_1',
            'SETUP',
            `MyNode:${Math.random().toString(36)}`
        )
        const log2 = logger(
            'LOGGER_SETUP_2',
            'SETUP',
            `MyNode:${Math.random().toString(36)}`
        )

        log1.debug('Red')
        log1.error('Green')
        log1.trace('Yellow')

        log2.debug('Red')
        log2.error('Green')
        log2.trace('Yellow')

        done()
    })
})
