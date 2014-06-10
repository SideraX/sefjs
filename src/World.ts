module Sef {

    export class World {
        public systemsSetTimeout: System[] = [];
        public systemsAnimFrame: System[] = [];
        public systemsPassive: System[] = [];


        public entities: Entity[] = [];

        public timeSetTimeout: number = Date.now();
        public timeAnimFrame: number = Date.now();

        public fixedStep: number = 1 / 60 * 1000; //60Hz;
        public maxInterval: number = 1 / 20 * 1000; //20hz;

        private static _nextSystemType: number = 0;
        private systems: Hashmap = new Hashmap();

        constructor() {}

        /**
         * Register a system
         *
         * @param {system} System
         */
        public setSystem(system: System, passive: boolean = false, requestAnimFrame: boolean = true): System {
            if (passive) {
                this.systemsPassive.push(system);
            }
            else if (requestAnimFrame) {
                this.systemsAnimFrame.push(system);
            }
            else {
                this.systemsSetTimeout.push(system);
            }

            var type = World._nextSystemType++;
            system.constructor['type'] = type;
            this.systems.set(type, system);

            system.world = this;
            system.init();

            return system;
        }

        /**
         * [getSystem description]
         * @param  {[type]} systemType [description]
         * @return {System}            [description]
         */
        public getSystem(systemType): System {
            return this.systems.get(systemType.type);
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
            var l = this.systemsSetTimeout.length;
            var i;

            for (i = 0; i < l; i++){
                this.systemsSetTimeout[i].refreshEntity(e);
            }

            l = this.systemsAnimFrame.length;
            for (i = 0; i < l; i++){
                this.systemsAnimFrame[i].refreshEntity(e);
            }

            l = this.systemsPassive.length;
            for (i = 0; i < l; i++){
                this.systemsPassive[i].refreshEntity(e);
            }

        }

        /**
         * [refresh description]
         */
        public processSetTimeout(fn?): void {
            var now = Date.now();
            var delta = now - this.timeSetTimeout;
            delta = Math.min(delta, this.maxInterval);

            this.timeSetTimeout = now;

            var systems = this.systemsSetTimeout;

            this.loop(systems, this.timeSetTimeout, delta);

            if (typeof fn === 'function') {
                fn(this.timeSetTimeout, delta);
            }
        }

        public processAnimFrame(fn?): void {
            var now = Date.now();
            var delta = now - this.timeAnimFrame;
            delta = Math.min(delta, this.maxInterval);

            this.timeAnimFrame = now;

            var systems = this.systemsAnimFrame;

            this.loop(systems, this.timeAnimFrame, delta);

            if (typeof fn === 'function') {
                fn(this.timeAnimFrame, delta);
            }
        }

        public loop(systems: System[], time: number, delta: number): void {
            if (systems.length === 0) {
                return;
            }

            var deltaStep: number = 0;
            while (delta > 0.0) {
                deltaStep = Math.min(delta, this.fixedStep);
                for (var i = 0, max = systems.length; i < max; i++){
                    systems[i].process(time, deltaStep);
                }

                delta -= deltaStep;
            }
        }

        public startAnimFrame(fn?): void {
            if (this.systemsAnimFrame.length === 0) {
                return;
            }

            var processAnimFrame = () => {
                requestAnimationFrame(processAnimFrame);
                this.processAnimFrame(fn);
            }
            processAnimFrame();
        }

        public startSetTimeout(fn?): void {
            if (this.systemsSetTimeout.length === 0) {
                return;
            }

            var processSetTimeout = () => {
                setTimeout(processSetTimeout, this.fixedStep);
                this.processSetTimeout(fn);
            }
            processSetTimeout();
        }

    }
}
