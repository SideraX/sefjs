module Sef {

    export class Hashmap {

        private _keys: any[];
        private _values: any[];
        private _index: any;

        constructor() {
            this._keys = [];
            this._values = [];
            this._index = {};
        }

        public set(key, value): void {
            var keyIndex = this._getIndex(key);

            if (keyIndex >= 0) {
                this._values[keyIndex] = value;
            } else {
                this._values.push(value);
                this._index[key] = this._keys.push(key) - 1;
            }
        }

        public delete(key): any {
            var keyIndex = this._getIndex(key);
            if (keyIndex >= 0) {
                delete this._index[key];
                this._values.splice(keyIndex, 1);
                return this._keys.splice(keyIndex, 1);
            }
        }

        public get(key): any {
            var keyIndex = this._getIndex(key);

            if (keyIndex >= 0) {
                return this._values[keyIndex];
            }

            return null;
        }

        private _getIndex(testKey): number {
            if (this._index[testKey] !== undefined) {
                return this._index[testKey];
            }

            return -1;
        }

        public values(): any[] {
            return this._values;
        }

        public has(testKey): boolean {
            var keyIndex = this._getIndex(testKey);
            if (keyIndex >= 0) {
                return true;
            }
            return false;
        }

        public forEach(action): boolean {
            var i = 0,
                len = this._keys.length;

            for (; i < len; i++) {
                action(this._keys[i], this._values[i]);
            }
            return true;
        }

    }
}
