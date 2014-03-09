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
            this._components[Util.componentTypeId(c)] = c;

            this._world.refresh(this);

            return this;
        }

        /**
         * [remove description]
         *
         * @param {Component}
         */
        public remove(c: Component) {
            this._components[Util.componentTypeId(c)] = undefined;

            this._world.refresh(this);

            return this;
        }

        public hasComponent(c: any): boolean {
            return (this._components[Util.componentTypeId(c)] !== undefined);
        }

        /**
         * [hasComponents description]
         *
         * @param {Component[]}
         * @return {boolean}
         */
        public hasAllComponents(components: number[]): boolean {
            if (components.length === 0)
                return false;

            for (var i = components.length - 1; i >= 0; i--) {
                if (this._components[components[i]] === undefined)
                    return false;
            }

            return true;
        }

        public hasOneComponent(components: number[]): boolean {
            if (components.length === 0)
                return false;

            for (var i = components.length - 1; i >= 0; i--) {
                if (this._components[components[i]] !== undefined)
                    return true;
            }

            return false;

        }

        public get(componentType: any) {

            return this._components[Util.componentTypeId(componentType)];
        }
    }
}

