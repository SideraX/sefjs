module Sef {

    export class Entity {

        private static _nextId: number = 0;

        private _components: Hashmap;
        public componentsMask: BitSet;

        public id: number;


        constructor(private _world: World) {
            this.id = Entity._nextId++;
            this._components = new Hashmap();
            this.componentsMask = new BitSet(Util.maxComponents);
        }

        /**
         * [add description]
         *
         * @param {Component}
         */
        public add(c: Component) {
            var type = Util.componentTypeId(c);
            this._components.add(type, c);
            this.componentsMask.set(type);

            this._world.refresh(this);

            return this;
        }

        /**
         * [remove description]
         *
         * @param {Component}
         */
        public remove(c: Component) {
            var type = Util.componentTypeId(c);
            this._components.remove(type);
            this.componentsMask.clear(type);

            this._world.refresh(this);

            return this;
        }

        public hasComponent(c: any): boolean {
            return this.componentsMask.get(Util.componentTypeId(c));
        }

        public get(componentType: any) {
            return this._components.getValue(Util.componentTypeId(componentType));
        }
    }
}

