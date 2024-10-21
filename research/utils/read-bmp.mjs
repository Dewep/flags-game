// Function to read BMP file and extract RGB values
export default function readBMP (filePath) {
  // Read the file in binary
  const buffer = fs.readFileSync(filePath)

  // BMP header starts at offset 0, and the pixel array offset is at byte 10
  const pixelArrayOffset = buffer.readUInt32LE(10)

  // Width and height are stored in DIB header at bytes 18 and 22 respectively
  const width = buffer.readUInt32LE(18)
  const height = buffer.readUInt32LE(22)

  // Bits per pixel stored at byte 28
  const bitsPerPixel = buffer.readUInt16LE(28)
  const bytesPerPixel = bitsPerPixel / 8 // Should be 3 for 24-bit BMP (RGB)

  if (width !== 512 || height !== 512) {
    throw new Error('Image dimensions are not 512x512.')
  }

  // Array to hold RGB values
  let rgbValues = []

  // BMP stores pixels from bottom to top, left to right
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = pixelArrayOffset + (y * width + x) * bytesPerPixel
      const b = buffer[pixelIndex] // Blue value
      const g = buffer[pixelIndex + 1] // Green value
      const r = buffer[pixelIndex + 2] // Red value

      rgbValues.push({ r, g, b })
    }
  }

  return rgbValues
}
