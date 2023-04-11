import { readFile, writeFile } from "fs/promises"
import { getAnagramKey } from "src/anagram/getAnagramKey"

type AnagramMap = Map<string, string[]>

export async function solveAnagram(
  inputFile: string,
  output: string
): Promise<void> {
  const fileContent = await readFile(inputFile, { encoding: "utf-8" })
  const words = fileContent.split("\n")

  const anagramMap = buildAnagramMap(words)
  const outputContent = contentFromAnagramMap(anagramMap)

  try {
    await writeFile(output, outputContent)
    console.log(`Result written to file ${output}`)
  } catch (error) {
    console.error(`Failed to write result to file ${output}`)
  }
}

export function buildAnagramMap(words: string[]): AnagramMap {
  const anagramMap: AnagramMap = new Map()

  words.forEach((word) => {
    const anagramKey = getAnagramKey(word)
    const anagrams = anagramMap.get(anagramKey)
    if (anagrams) {
      anagrams.push(word)
    } else {
      anagramMap.set(anagramKey, [word])
    }
  })

  return anagramMap
}

export function contentFromAnagramMap(anagramMap: AnagramMap): string {
  return Array.from(anagramMap.values())
    .map((words) => `${words.join(" ")}\n`)
    .join("")
}
