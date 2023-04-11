import { buildAnagramMap, contentFromAnagramMap } from "src/anagram"

const words = [
  "apple",
  "car",
  "cider",
  "tar",
  "itch",
  "rat",
  "cried",
  "helicopter",
  "arc",
]

const anagramMap = new Map([
  ["aelpp", ["apple"]],
  ["acr", ["car", "arc"]],
  ["cdeir", ["cider", "cried"]],
  ["art", ["tar", "rat"]],
  ["chit", ["itch"]],
  ["ceehiloprt", ["helicopter"]],
])

const outputContent = `apple
car arc
cider cried
tar rat
itch
helicopter
`

describe("solveAnagrams", () => {
  test("should build a map of anagramKey to array of anagrams", () => {
    const result = buildAnagramMap(words)
    expect(result.get("aelpp")).toEqual(anagramMap.get("aelpp"))
    expect(result.get("acr")).toEqual(anagramMap.get("acr"))
  })

  test("should output content of anagrams as string", () => {
    const result = contentFromAnagramMap(anagramMap)
    expect(result).toBe(outputContent)
  })
})
