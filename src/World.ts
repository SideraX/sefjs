///<reference path="Entity.ts" />
///<reference path="Component.ts" />
///<reference path="System.ts" />
///<reference path="Sef.ts" />

module Sef {

    export class World {
        private _systems: System[] = [];
        private _entities: Entity[] = [];

        /**
         * Register a system
         *
         * @param {system} System
         */
        public setSystem(system: System) {
            this._systems.push(system);
        }

        /**
         * Create a new Entity
         */
        public createEntity() {
            var e = new Entity(this);

            this._entities.push(e);

            return e;
        }

        public refresh(e: Entity) {
            var systems = this._systems;

            for (var i = systems.length - 1; i >= 0; i--) {
                systems[i].refreshEntity(e);
            };
        }
    }
}

