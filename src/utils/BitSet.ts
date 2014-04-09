
module Sef {

  export class BitSet {

    public BITS_OF_A_WORD: number = 32;
    public SHIFTS_OF_A_WORD: number = 5;

    public words: number[];

    constructor() {
      this.words = [];
    }

    public length(): number {
      return this.words.length;
    }

    public whichWord(index: number): number {
        return index >> this.SHIFTS_OF_A_WORD;
    }

    public mask(index: number): number {
        return 1 << (index & 31);
    }

    public set(index: number): void {
      var which = this.whichWord(index);
      var words = this.words;

      words[which] = words[which] | this.mask(index);
    }

    public clear(index: number): void {
      var which = this.whichWord(index);
      var words = this.words;

      words[which] = words[which] & ~this.mask(index)
    }

    public get(index: number): boolean {
      var which = this.whichWord(index);
      var words = this.words;

      return !!(words[which] & this.mask(index));
    }

    public contains(bSet : BitSet): boolean {
      var words = this.words;
      var commons = Math.min(words.length, bSet.length());

      for (var i = 0; i < commons; i++) {
        if ((words[i] & bSet.words[i]) !== bSet.words[i]) {
          return false;
        }
      }

      return true;
    }

    public intersects(bSet : BitSet): boolean {
      var words = this.words;
      var commons = Math.min(words.length, bSet.length());

      for (var i = 0; i < commons; i++) {
        if ((words[i] & bSet.words[i]) === bSet.words[i]) {
          return true;
        }
      }

      return false;
    }

  }
}
