///<reference path="Entity.ts" />
///<reference path="Component.ts" />
///<reference path="World.ts" />
///<reference path="Util.ts" />

module Sef {

    export class System {

        private _components: Component[] = [];
        private _entities: Entity[] = [];

        public registerComponent(c: any) {

            this._components.push(Util.componentTypeId(c));
        }

        public refreshEntity(e: Entity) {
            if (e.hasComponents(this._components)) {
                this._entities[e.id] = e;
            }
            else if (this._entities[e.id]) {
                this._entities[e.id] = undefined;
            }
        }

        public update() {}

    }
}

