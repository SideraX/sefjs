/**
 * Inspired by https://github.com/speedr/makrjs/blob/master/src/makr/BitSet.js
 */
module Sef {

  export class BitSet {

    public length: number;
    public words: number[];

    constructor(size: number) {

      this.length = Math.ceil(size / 32);
      this.words = new Array(this.length);

      for (var i = 0; i < this.length; i++){
          this.words[i] = 0;
      }
    }

    public set(index: number): void {
      var wordsOffset = index / 32 | 0;
      var bitOffset = index - wordsOffset * 32;

      this.words[wordsOffset] |= 1 << bitOffset;
    }

    public clear(index: number): void {
      var wordsOffset = index / 32 | 0;
      var bitOffset = index - wordsOffset * 32;

      this.words[wordsOffset] &= ~(1 << bitOffset);
    }

    public get(index: number): boolean {
      var wordsOffset = index / 32 | 0;
      var bitOffset = index - wordsOffset * 32;

      return !!(this.words[wordsOffset] & (1 << bitOffset));
    }

    public contains(bSet : BitSet): boolean {
      var words = this.words;
      var l = this.length;

      if (l !== bSet.length) {
        return false;
      }

      for (var i = 0; i < l; i++) {
        if ((words[i] & bSet.words[i]) !== bSet.words[i]) {
          return false;
        }
      }

      return true;
    }

    public intersects(bSet : BitSet): boolean {
      var words = this.words;
      var l = this.length;

      if (l !== bSet.length) {
        return false;
      }

      for(var i = 0; i < l; i++) {
        if ((words[i] & bSet.words[i]) === bSet.words[i]) {
          return true;
        }
      }

      return false;
    }

  }
}
