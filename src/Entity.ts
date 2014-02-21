///<reference path="Component.ts" />
///<reference path="System.ts" />
///<reference path="World.ts" />
///<reference path="Sef.ts" />


module Sef {

    export class Entity {

        private static _nextId: number = 0;

        private _components: Component[] = [];

        public id: number;


        constructor(private _world: World) {
            this.id = Entity._nextId++;
        }

        /**
         * [add description]
         *
         * @param {Component}
         */
        public add(c: Component) {
            this._components[componentTypeId(c)] = c;

            this._world.refresh(this);

            return this;
        }

        /**
         * [remove description]
         *
         * @param {Component}
         */
        public remove(c: Component) {
            this._components[componentTypeId(c)] = undefined;

            this._world.refresh(this);

            return this;
        }

        /**
         * [hasComponents description]
         *
         * @param {Component[]}
         * @return {boolean}
         */
        public hasComponents(components: Component[]) {
            for (var i = components.length - 1; i >= 0; i--) {

                return (this._components[componentTypeId(components[i])] !== undefined);
            }

            return true;
        }

        public get(componentType: any) {

            return this._components[componentTypeId(componentType)];
        }
    }
}

