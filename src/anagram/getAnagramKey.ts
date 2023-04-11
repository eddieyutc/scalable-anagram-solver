export function getAnagramKey(word: string): string {
  return word.split("").sort().join("")
}
