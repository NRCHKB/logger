import 'should'

import { describe, it } from 'mocha'

process.env['DEBUG'] = 'NRCHKB*'

describe('Logger', function () {
    this.timeout(30000)

    it('should be loaded', function (done) {
        const logger = require('../index')
        const log = logger()

        log.debug('test')
        log.trace('test')
        log.error('test')

        done()
    })
})
