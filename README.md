# Scalable Anagram Solver

The objective of this project is to create a command line program that solves the anagram problem, with the potential to scale horizontally. The program should take in a file containing a list of words with the assumption that it doesn't fit in memory, and produce an output file such that the words that are anagrams of each other are on the same line.

Development is split into 2 phrases. The first phrase aims at creating a simple solution that solves the problem locally. The second phrase aims at tackling the memory constraint and scalability based on phrase 1.

## Phrase 1 (without memory constraint)

The scope of phrase 1 is to create a simple solution that solves the problem locally without talking into account memory constraint. A naive solution would be to create a map in memory, with keys representing set of anagrams and the value being an array of the anagrams. One way to get the keys is to sort the letters of each word, anagrams of each other should have the same sorted results.

The flow of the program should be:

1. Read a word from the file
2. Create the anagram key by sorting the word
3. Append the key value into the Map
4. Repeat 1-3 until all words are processed
5. Output result to a file

## Phrase 2 (memory constraint and scalability)

Now taking into account the input file might not fit into memory, which also means the result map would not fit into memory. We can use the divide and conquer approach, splitting the input file into smaller chunks and solving each chunk as we did in phrase 1. The final step would be to merge the output files of all chunks into a single file. This step would be made easier if we first sort the anagram results from each chunk, that way we only have to compare the first line from each output file and merge the result, just like the idea of merge sort.
