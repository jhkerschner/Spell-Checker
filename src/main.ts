import Dictionary from "./dictionary";
import SpellChecker from "./spellChecker";
import * as fs from "fs";

const args = process.argv.slice(2);

const dictionaryFilePath = args[0];
const textFilePath = args[1];

const dictionary: Dictionary = new Dictionary();
const spellChecker: SpellChecker = new SpellChecker(dictionary, textFilePath);
const dictionaryFile: string = fs.readFileSync(dictionaryFilePath, "utf8");
const textFile: string = fs.readFileSync(textFilePath, "utf8");

//add words to the dictionary.
dictionary.addWords(dictionaryFile);

//review text
const missSpellings = spellChecker.reviewText(textFile);
console.log(missSpellings);
