import flags from './flags-array.mjs'
import readBMP from './read-bmp.mjs'

const flagsBmp = {}

for (const flag of flags) {
  try {
    flagsBmp[flag] = readBMP(`./bmp/${flag}.bmp`)
  } catch (err) {
    console.error('Flag', flag, err)
  }
}

export default flagsBmp
