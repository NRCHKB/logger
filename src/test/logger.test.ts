import 'should'

import { describe, it } from 'mocha'
import { LogLevel } from '../types/types'

process.env.LOGGER_DEBUG_COLOR = '11'
process.env.LOGGER_ERROR_COLOR = '12'
process.env.LOGGER_TRACE_COLOR = '13'

describe('Logger test suite:', function () {
    this.timeout(30000)

    it('should be loaded', function (done) {
        const { logger } = require('../index')
        const log = logger('LOGGER')

        log.debug('Yellow')
        log.error('Blue')
        log.trace('Pink')
        log.level(LogLevel.DEBUG)('Yellow')

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
        log.level(LogLevel.ERROR)('Green')

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
        log1.level(LogLevel.TRACE)('Yellow')

        log2.debug('Red')
        log2.error('Green')
        log2.trace('Yellow')
        log2.level(LogLevel.ERROR)('Green')

        done()
    })

    it('set timestamp', function (done) {
        const { logger, loggerSetup } = require('../index')

        loggerSetup({
            timestampEnabled: true,
        })

        const log1 = logger('LOGGER_TIMESTAMP')

        log1.debug('Red')
        log1.error('Green')
        log1.trace('Yellow')
        log1.level(LogLevel.ERROR)('Green')

        loggerSetup({
            timestampEnabled: false,
        })

        loggerSetup({
            timestampEnabled:
                'LOGGER_TIMESTAMP_CHECK_1,LOGGER_TIMESTAMP_CHECK_2',
        })

        const log2 = logger('LOGGER_TIMESTAMP_CHECK_1')

        log2.debug('Red')
        log2.error('Green')
        log2.trace('Yellow')
        log2.level(LogLevel.ERROR)('Green')

        const log3 = logger('LOGGER_TIMESTAMP_CHECK_2')

        log3.debug('Red')
        log3.error('Green')
        log3.trace('Yellow')
        log3.level(LogLevel.DEBUG)('Red')

        done()
    })

    it('level test', function (done) {
        const { logger } = require('../index')
        const log = logger('LOGGER')

        log.level(LogLevel.DISABLED)('DISABLED')
        log.level(LogLevel.ERROR)('ERROR', true)
        log.level(LogLevel.DEBUG)('DEBUG')
        log.level(LogLevel.TRACE)('TRACE')

        done()
    })
})
