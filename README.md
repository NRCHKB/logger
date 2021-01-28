# @nrchkb/logger

Unified Logger for Node-RED nodes (using debug)

![@nrchkb/logger](https://user-images.githubusercontent.com/2881159/106205731-3f163580-61bf-11eb-8c76-f0ffe9e88a53.png)

## Install

``yarn add @nrchkb/logger``

## How to use

There are 3 types of messages:

- Debug - for standard debug purpose.
- Error - for printing errors, this level is enabled by default.
- Trace - for printing detailed messaged.

Code

```typescript
import {logger} from "@nrchkb/logger";

const log = logger()

log.debug('Debug message')
log.error('Error message')
log.trace('Trace message')
```

Start you app in with DEBUG env

```bash
DEBUG=YOUR_BASE_NAMESPACE* yourApp.js
```

If you want you can pass addional parameters to logger method to make its log message more detailed

```typescript
// Having Node-RED node in context, node name is TestHTTPNode, id is 1234567890
let log
log = logger('OUT', 'HTTP')
//or
log = logger('OUT', this.name, this)
```

- First argument is suffix namespace used in log message `BASE_NAMESPACE:OUT Some Message`
- Second is a message prefix `BASE_NAMESPACE:OUT [HTTP] Some Message`
- Third, if provided will override message prefix with node name and
  id  `BASE_NAMESPACE:OUT [TestHTTPNode:1234567890] Some Message`

## Customization

Parameters

```typescript
let LOGGER_DEBUG_COLOR = process.env.LOGGER_DEBUG_COLOR || '4'
let LOGGER_ERROR_COLOR = process.env.LOGGER_ERROR_COLOR || '9'
let LOGGER_TRACE_COLOR = process.env.LOGGER_TRACE_COLOR || '15'
let LOGGER_DEBUG_ENABLED = (process.env.LOGGER_DEBUG_ENABLED === 'true') || false
let LOGGER_ERROR_ENABLED = (process.env.LOGGER_ERROR_ENABLED === 'true') || true
let LOGGER_TRACE_ENABLED = (process.env.LOGGER_TRACE_ENABLED === 'true') || false

let LOGGER_NAMESPACE_PREFIX = process.env.LOGGER_NAMESPACE_PREFIX || 'NRCHKB'
```

Colors are defined via numbers. Depending on which device you are running your app different range of colors will be
available. Please refer to https://jonasjacek.github.io/colors/ for Xterm color list

All params listed above can be either changed with env variable or setup method

### env parameter

For example to change base namespace to MYAPP

```bash
LOGGER_NAMESPACE_PREFIX=MYAPP DEBUG=MYAPP* yourApp.js
```

### setup method

All params are optional, so you can choose which you want to change

```typescript
import {loggerSetup} from "@nrchkb/logger";

loggerSetup({
    namespacePrefix: 'EXAMPLE',
    debugColor: '9',
    debugEnabled: false,
    errorColor: '10',
    errorEnabled: false,
    traceColor: '11',
    traceEnabled: false
})
```

## Do you need help with your setup?

Join us on our Discord server (click on the logo below)!

[![NRCHKB Discord](https://discordapp.com/api/guilds/586065987267330068/widget.png?style=banner2)](https://discord.gg/uvYac5u)

## Contact us

- [Our Discord server](https://discord.gg/uvYac5u) [![NRCHKB Discord](https://img.shields.io/discord/586065987267330068.svg?label=Discord)](https://discord.gg/amwV5tq)
- [Mail directly to Shaquu](mailto:shaquu.github@gmail.com?subject=[NRCHKB])