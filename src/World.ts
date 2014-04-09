module Sef {

    export class World {
        public systems: System[] = [];
        public entities: Entity[] = [];

        public time: number;
        public delta: number;

        constructor() {
            this.time = Date.now();
        }

        /**
         * Register a system
         *
         * @param {system} System
         */
        public setSystem(system: System): void {
            system.world = this;
            this.systems.push(system);
            system.init();
        }

        /**
         * Create a new Entity
         */
        public createEntity(): Entity {
            var e = new Entity(this);

            this.entities.push(e);

            return e;
        }

        /**
         * [refresh description]
         */
        public refresh(e: Entity): void {
            var systems = this.systems;

            for (var i = 0, max = systems.length; i < max; i++){
                systems[i].refreshEntity(e);
            }
        }

        /**
         * [refresh description]
         */
        public process(): void {
            var now = Date.now();
            this.delta = now - this.time;
            this.time = now;

            var systems = this.systems;

            for (var i = 0, max = systems.length; i < max; i++){
                systems[i].process();
            }
        }
    }
}

