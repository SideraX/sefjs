declare module Sef {
    class Component {
    }
}
declare module Sef {
    class Entity {
        private _world;
        private static _nextId;
        private _components;
        public id: number;
        constructor(_world: Sef.World);
        /**
        * [add description]
        *
        * @param {Component}
        */
        public add(c: Sef.Component): Entity;
        /**
        * [remove description]
        *
        * @param {Component}
        */
        public remove(c: Sef.Component): Entity;
        public hasComponent(c: any): boolean;
        /**
        * [hasComponents description]
        *
        * @param {Component[]}
        * @return {boolean}
        */
        public hasComponents(components: number[]): boolean;
        public get(componentType: any): Sef.Component;
    }
}
declare module Sef {
    class Util {
        /**
        * Next typeId for component (inheritance)
        *
        * @type {number}
        */
        private static _nextComponentTypeId;
        /**
        * Return the next typeId
        *
        * @return {number}
        */
        static nextComponentTypeId(): number;
        static componentTypeId(c: any): number;
    }
}
declare module Sef {
    class System {
        public components: number[];
        public entities: Sef.Entity[];
        public registerComponent(c: any): void;
        public refreshEntity(e: Sef.Entity): void;
        public process(): void;
        public update(e: Sef.Entity): void;
    }
}
declare module Sef {
    class World {
        public systems: Sef.System[];
        public entities: Sef.Entity[];
        /**
        * Register a system
        *
        * @param {system} System
        */
        public setSystem(system: Sef.System): void;
        /**
        * Create a new Entity
        */
        public createEntity(): Sef.Entity;
        /**
        * [refresh description]
        */
        public refresh(e: Sef.Entity): void;
        /**
        * [refresh description]
        */
        public process(): void;
    }
}
