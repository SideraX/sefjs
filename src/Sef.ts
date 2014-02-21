///<reference path="Entity.ts" />
///<reference path="Component.ts" />
///<reference path="System.ts" />
///<reference path="World.ts" />

module Sef {

    /**
     * Next typeId for component (inheritance)
     *
     * @type {number}
     */
    var _nextComponentTypeId: number = 0;

    /**
     * Return the next typeId
     *
     * @return {number}
     */
    export function nextComponentTypeId(): number {
        return _nextComponentTypeId++;
    }

    export function componentTypeId(c: any): number {

        if (typeof c === 'function') {
            if (c.typeId === undefined)
                c.typeId = nextComponentTypeId();

            return c.typeId;
        }


        if (c.constructor.typeId === undefined)
            c.constructor.typeId = nextComponentTypeId();


        return c.constructor.typeId;

    }
}

