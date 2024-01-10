import Dictionary from "./dictionary";
import * as fs from "fs";
class SpellChecker {
  private dictionary: Dictionary;
  private sourceFile: string;

  constructor(dictionary: Dictionary, sourceFile: string) {
    this.dictionary = dictionary;
    this.sourceFile = sourceFile;
  }

  reviewText(text: string) {
    const punctuationPattern: RegExp = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const textWithRemovedPunctuation: string = text.replace(
      punctuationPattern,
      ""
    );
    const lines: Array<string> = textWithRemovedPunctuation.split("\n");

    //const wordsInText = textWithRemovedPunctuation.split(" ");

    const misspelledWords: any = [];

    for (let lineNum: number = 0; lineNum <= lines.length; lineNum++) {
      if (typeof lines[lineNum] !== "undefined") {
        const trim: string = lines[lineNum].toString().trim();
        const wordsInLine: Array<string> = trim.split(" ");
        if (typeof trim === "string") {
          for (let colNum: number = 0; colNum <= wordsInLine.length; colNum++) {
            const theWord: string = wordsInLine[colNum];

            if (
              typeof theWord !== "undefined" &&
              !this.isProperNoun(theWord) &&
              !this.dictionary.hasWord(theWord)
            ) {
              misspelledWords.push({
                word: theWord,
                line: lineNum + 1,
                col: colNum,
                suggestions: this.suggestWords(theWord),
              });
            }
          }
        }
      }
    }
    return misspelledWords;
  }

  calculateEditDistance(wordOne: string, wordTwo: string): number {
    const matrix: Array<Array<number>> = Array.from(
      { length: wordOne.length + 1 },
      () => Array(wordTwo.length + 1).fill(0)
    );

    // Fill in the array based on edit distance rules
    for (let i: number = 0; i <= wordOne.length; i++) {
      for (let j: number = 0; j <= wordTwo.length; j++) {
        if (i === 0) {
          // If the first word is used up all it's characters, insert characters from the second word so it matched the length of second word
          matrix[i][j] = j;
        } else if (j === 0) {
          // If the second word user up all it's characters, insert characters from the first word so it matched the length of first word
          matrix[i][j] = i;
        } else if (wordOne[i - 1] === wordTwo[j - 1]) {
          // If the characters match, no edit required
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          // If characters don't match, find the minimum edit distance. add one to account for the cost of transforming the current character
          matrix[i][j] =
            1 +
            Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
        }
      }
    }

    // Return the final edit distance
    return matrix[wordOne.length][wordTwo.length];
  }

  suggestWords(misspelledWord: string): Array<string> {
    const suggestedWords: Array<string> = [];
    this.dictionary.words.forEach((word) => {
      const editDistance: number = this.calculateEditDistance(
        misspelledWord,
        word
      );

      if (editDistance <= 2) {
        suggestedWords.push(word);
      }
    });
    return suggestedWords;
  }

  processMisspellings(misspellings: Array<string>) {
    let suggestions: { [key: string]: Array<string> } = {};

    misspellings.forEach((misspelling) => {
      const suggestedWords = this.suggestWords(misspelling);
      suggestions = {
        ...suggestions,
        [misspelling]: suggestedWords,
      };
    });

    return suggestions;
  }

  isProperNoun(word: String) {
    // make sure the word is greater than 1 character
    // check to see if the first letter is uppercase.
    const firstLetter = word.charAt(0);
    if (word.length > 1 && firstLetter === firstLetter.toUpperCase()) {
      return true;
    }

    return false;
  }
}

export default SpellChecker;
