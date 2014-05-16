module Sef {

    export class World {
        public systems: System[] = [];
        public systemsAnimFrame: System[] = [];
        public entities: Entity[] = [];

        public time: number = Date.now();
        public delta: number;

        constructor(public interval: number = 50) {}

        /**
         * Register a system
         *
         * @param {system} System
         */
        public setSystem(system: System, requestAnimFrame: boolean = true): void {
            if (requestAnimFrame) {
                this.systemsAnimFrame.push(system);
            }
            else {
                this.systems.push(system);
            }

            system.world = this;
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
            var l = this.systems.length;
            var i;

            for (i = 0; i < l; i++){
                this.systems[i].refreshEntity(e);
            }

            l = this.systemsAnimFrame.length;
            for (i = 0; i < l; i++){
                this.systemsAnimFrame[i].refreshEntity(e);
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

        public processAnimFrame(): void {
            var systems = this.systemsAnimFrame;

            for (var i = 0, max = systems.length; i < max; i++){
                systems[i].process();
            }
        }

        public start(): void {
            var that = this;

            function processAnimFrame() {
                requestAnimationFrame(processAnimFrame);
                that.processAnimFrame();
            }
            processAnimFrame();

            function process() {
                setTimeout(process, that.interval);
                that.process();
            }
            process();
        }
    }
}
