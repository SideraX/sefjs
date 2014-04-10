module Sef {

    export class Util {
        /**
         * Next typeId for component (inheritance)
         *
         * @type {number}
         */
        private static _nextComponentTypeId: number = 0;

        public static maxComponents: number = 32;

        /**
         * Return the next typeId
         *
         * @return {number}
         */
        public static nextComponentTypeId(): number {
            return Util._nextComponentTypeId++;
        }


        public static componentTypeId(c: any): number {

            if (typeof c === 'function') {
                if (c.typeId === undefined)
                    c.typeId = Util.nextComponentTypeId();

                return c.typeId;
            }


            if (c.constructor.typeId === undefined)
                c.constructor.typeId = Util.nextComponentTypeId();


            return c.constructor.typeId;

        }

    }

    export function clearArray(array: any[]) {
        while (array.length > 0) {
          array.shift();
        }
    }

    export function indexOf(array: any[], val: any) {
        for (var i = 0, max = array.length; i < max; ++i){
            if (val === array[i])
                return i;
        }

        return -1;
    }

}
