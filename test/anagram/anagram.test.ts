import { getAnagramKey } from "src/anagram";

const anagrams = [
  ["arc", "car"],
  ["cat", "act"],
  ["state", "taste"]
]

describe("getAnagramKey", () => {
  test.each(anagrams)("should return same anagram key", (anagram1, anagram2) => {
    expect(getAnagramKey(anagram1)).toEqual(getAnagramKey(anagram2))
  })
})