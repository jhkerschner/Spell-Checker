class Dictionary {
  public words: Set<string>;

  constructor() {
    this.words = new Set<string>();
  }

  addWords(words: string): void {
    words.split("\n").forEach((word) => {
      this.addWord(word);
    });
  }

  addWord(word: string): void {
    const theWord: string = word.toLowerCase();
    this.words.add(theWord);
  }

  hasWord(word: string): boolean {
    return this.words.has(word.toLowerCase());
  }
}

export default Dictionary;
