module Sef {

    export class Entity {

        private static _nextId: number = 0;

        private _components: Hashmap;

        public id: number;


        constructor(private _world: World) {
            this.id = Entity._nextId++;
            this._components = new Hashmap();
        }

        /**
         * [add description]
         *
         * @param {Component}
         */
        public add(c: Component) {
            this._components.add(Util.componentTypeId(c), c);

            this._world.refresh(this);

            return this;
        }

        /**
         * [remove description]
         *
         * @param {Component}
         */
        public remove(c: Component) {
            this._components.remove(Util.componentTypeId(c));

            this._world.refresh(this);

            return this;
        }

        public hasComponent(c: any): boolean {
            return this._components.has(Util.componentTypeId(c));
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

            for (var i = 0, max = components.length; i < max; i++){
                if (this._components.has(components[i]) === false)
                    return false;
            }

            return true;
        }

        public hasOneComponent(components: number[]): boolean {
            if (components.length === 0)
                return false;

            for (var i = 0, max = components.length; i < max; i++){
                if (this._components.has(components[i]))
                    return true;
            }

            return false;

        }

        public get(componentType: any) {
            return this._components.getValue(Util.componentTypeId(componentType));
        }
    }
}

