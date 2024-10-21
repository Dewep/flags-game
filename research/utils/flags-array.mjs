#!/usr/bin/env zx

const files = await glob(['svg/*.svg'])

const flags = files.map(path => path.substr(4, 2))

export default flags
