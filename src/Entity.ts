module Sef {

    export class Entity {

        private static _nextId: number = 0;

        private _components: Hashmap;
        public componentsMask: BitSet;

        public id: number;


        constructor(private _world: World) {
            this.id = Entity._nextId++;
            this._components = new Hashmap();
            this.componentsMask = new BitSet();
        }

        /**
         * [add description]
         *
         * @param {Component}
         */
        public add<T extends Component>(c: T) {
            var type = ComponentManager.typeId(c);
            this._components.set(type, c);
            this.componentsMask.set(type);

            this._world.refresh(this);

            return this;
        }

        /**
         * [remove description]
         *
         * @param {Component}
         */
        public remove<T extends Component>(c: T) {
            var type = ComponentManager.typeId(c);
            this._components.delete(type);
            this.componentsMask.clear(type);

            this._world.refresh(this);

            return this;
        }

        public hasComponent<T extends Component>(c: T): boolean {
            return this.componentsMask.get(ComponentManager.typeId(c));
        }

        public get<T extends Component>(componentType: T) {
            return this._components.get(ComponentManager.typeId(componentType));
        }
    }
}

