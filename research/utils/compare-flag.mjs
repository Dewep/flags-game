#!/usr/bin/env zx

import flagsBmp from './flags-bmp-array.mjs'

function isSimilarColor (a, b) {
  return a > b - 50 && a < b + 50
}

export default function compareFlag (from, to) {
  let similarPixels = 0
  for (let i = 0; i < flagsBmp[from].length; i++) {
    if (isSimilarColor(flagsBmp[from][i].r, flagsBmp[to][i].r) && isSimilarColor(flagsBmp[from][i].g, flagsBmp[to][i].g) && isSimilarColor(flagsBmp[from][i].b, flagsBmp[to][i].b)) {
      similarPixels += 1
    }
  }
  return Math.round(similarPixels * 100 / flagsBmp[from].length)
}
