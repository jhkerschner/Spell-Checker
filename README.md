# Spell Checker

## Technologies

- Typescript
- Node.js

## Included Features

- Returns list of misspelled words
- Outputs suggested words for each misspelled word
- Includes the line and column numbers for each misspelled
- Handles proper nouns

## Running Function

1. Once the repo is downloaded, navigate to it in your terminal.

2. run `npm install` to install the dependencies for the function

3. run `npm run build`

4. Once the build has completed, run `node dist/main.js ./dictionary.txt ./sourceFile.txt`

This will run the function using the dictionary.txt and sourceFile.txt as our dictionary and input files.

\*To skip steps 3 and 4, you can simply run `npm run check-spelling`

This script will build run the program for you.
