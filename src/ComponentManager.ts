module Sef {

    export class ComponentManager {

        /**
         * Next typeId for component (inheritance)
         *
         * @type {number}
         */
        private static _nextTypeId: number = 0;

        public static maxComponents: number = 32;

        public static register(c: any): void {
            if (typeof c !== 'function') {
                return;
            }

            if (c.typeId === undefined) {
                c.typeId = ComponentManager._nextTypeId++;
            }
        }

        public static typeId(c: any): number {

            if (typeof c === 'function') {
                return c.typeId;
            }

            return c.constructor.typeId;
        }


    }
}

