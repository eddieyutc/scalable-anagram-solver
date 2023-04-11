import path from "node:path"
import { solveAnagram } from "src/anagram"

const outputFile = "output.txt"

async function main(): Promise<void> {
  const filename = process.argv[2]
  if (!filename) {
    console.error("Error: Filename not provided")
    return
  }

  try {
    const inputFile = path.join(__dirname, `../`, filename)
    const outputPath = path.join(__dirname, `../`, outputFile)
    await solveAnagram(inputFile, outputPath)
  } catch (error) {
    console.error(`Error: Failed to open file: ${filename}`)
    return
  }
}

main()
