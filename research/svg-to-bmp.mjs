#!/usr/bin/env zx

import flags from './utils/flags-array.mjs'

// Download SVG files from https://github.com/LeCoupa/vueflags/tree/master/flags
// Which is under MIT LICENSE

// sudo apt install imagemagick-6.q16
for (const flag of flags) {
  try {
    await $`convert svg/${flag}.svg bmp/${flag}.bmp`
  } catch (err) {
    console.error('Flag', flag, 'cannot be converted to BMP')
  }
}
