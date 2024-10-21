#!/usr/bin/env zx

import compareToAllFlags from './utils/compare-to-all-flags.mjs'
import flags from './utils/flags-array.mjs'

const scores = []

for (const flag of flags) {
  const score = compareToAllFlags(flag)
  console.log(flag, score)
  scores.push({ flag, score })
}

scores.sort((a, b) => a.score - b.score)

console.log(scores)
