#!/usr/bin/env zx

import compareFlag from './compare-flag.mjs'
import flags from './flags-array.mjs'

export default function compareToAllFlags (from) {
  let totalSimilar = 0
  for (const flag of flags) {
    if (flag === from) {
      continue
    }
    totalSimilar += compareFlag(from, flag)
  }
  return Math.round(totalSimilar / (flags.length - 1))
}
