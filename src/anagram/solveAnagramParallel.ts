import { randomBytes } from "crypto"
import EventEmitter from "events"
import { open, writeFile } from "fs/promises"

const linesLimit = 50000 // a number such that the words fits into memory

export async function solveAnagramParallel(inputFile: string) {
  // split input file into smaller size file that fits into memory
  const splitFiles = await splitFile(inputFile)
  // distribute each file to different nodes that solve them separately
  await distributeTasks(splitFiles)
  // combine results from all nodes into a final file

  // For this last step, the master node would likely have to set a
  // background task to trigger an event for when all files are available,
  // and invoke task for combining the files.
  const tasksStatusEmitter = new EventEmitter()
  tasksStatusEmitter.on("finished", () => {
    combineFiles()
  })
}

export async function splitFile(inputFile: string): Promise<string[]> {
  // stream file content into memory
  // once it reaches certain threshold, write content to a new file
  // keep track of a list of file names and return them
  const outputFiles = []
  let currentLines = 0
  let currentContent = ""

  const file = await open(inputFile)
  for await (const line of file.readLines()) {
    currentLines++
    currentContent += line
    if (currentLines >= linesLimit) {
      const filename = await writeChunk(currentContent)
      outputFiles.push(filename)
      currentContent = ""
      currentLines = 0
    }
  }
  if (currentContent !== "") {
    // leftover from the last chunk
    const filename = await writeChunk(currentContent)
    outputFiles.push(filename)
  }

  return outputFiles
}

// send files to different nodes
async function distributeTasks(files: string[]): Promise<void> {
  // Since the memory cannot hold the size of the results combined, a normal
  // request-response model would not work.
  // One way is for the nodes to upload the file directly to the master
  // or to hosting service like S3.
  // Another way is to stream the file back to the master node.
}

// combine a list of result files from different nodes
async function combineFiles(): Promise<void> {
  // assume all the nodes sort the file in ascending order of anagram key
  // Read first line from each files and sort according to anagrams keys
  // If the first anagram has no duplicate anagram key from different files,
  // append that line of anagrams to the result file.
  // If there are duplicates, combine them and append to the result file.
  // Read the next line from files which the written line came from,
  // sort the lines and repeat until all files have been read
}

async function writeChunk(content: string): Promise<string> {
  const filename = getRandomFileName()
  await writeFile(filename, content, { encoding: "utf-8" })
  return filename
}

function getRandomFileName(): string {
  return randomBytes(20).toString("hex")
}
