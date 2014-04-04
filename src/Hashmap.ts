module Sef {

    export class Hashmap {

        public keys: any[];
        public values: any[];

        constructor() {
            this.keys = [];
            this.values = [];
        }

        public add(key, value): void {
            var keyIndex = this.getIndex(key);
            if (keyIndex >= 0) {
                this.values[keyIndex] = value;
            } else {
                this.keys.push(key);
                this.values.push(value);
            }
        }

        public remove(key): any {
            var keyIndex = this.getIndex(key);
            if (keyIndex >= 0) {
                var keys = this.keys;
                var values = this.values;

                keys.splice(keyIndex, 1);
                return values.splice(keyIndex, 1);
            }
        }

        public getValue(key): any {
            var keyIndex = this.getIndex(key);

            if (keyIndex >= 0) {
                return this.values[keyIndex];
            }

            return null;
        }

        public getIndex(testKey): number {
            var keys = this.keys;

            for (var i = 0, max = keys.length; i < max; ++i){
                if (testKey === keys[i])
                    return i;
            }

            return -1;
        }

        public has(testKey): boolean {
            var keyIndex = this.getIndex(testKey);
            if (keyIndex >= 0) {
                return true;
            }
            return false;
        }

        public forEach(action): boolean {
            var i = 0,
                len = this.keys.length,
                key,
                value;

            for (; i < len; ++i) {
                key = this.keys[i];
                value = this.values[i];
                action(key, value);
            }
            return true;
        }

    }
}

