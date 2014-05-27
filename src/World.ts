module Sef {

    export class World {
        public systemsSetTimeout: System[] = [];
        public systemsAnimFrame: System[] = [];
        public renderingSystem: System;

        public entities: Entity[] = [];

        public timeSetTimeout: number = Date.now();
        public timeAnimFrame: number = Date.now();

        public fixedStep: number = 1 / 60 * 1000; //60Hz;
        public maxInterval: number = 1 / 20 * 1000; //20hz;

        constructor() {}

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
                this.systemsSetTimeout.push(system);
            }

            system.world = this;
            system.init();
        }

        public setRenderingSystem(system: System): void {
            this.renderingSystem = system;

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
            var l = this.systemsSetTimeout.length;
            var i;

            for (i = 0; i < l; i++){
                this.systemsSetTimeout[i].refreshEntity(e);
            }

            l = this.systemsAnimFrame.length;
            for (i = 0; i < l; i++){
                this.systemsAnimFrame[i].refreshEntity(e);
            }

            if (this.renderingSystem) {
                this.renderingSystem.refreshEntity(e);
            }
        }

        /**
         * [refresh description]
         */
        public processSetTimeout(): void {
            var now = Date.now();
            var delta = now - this.timeSetTimeout;
            delta = Math.min(delta, this.maxInterval);

            this.timeSetTimeout = now;

            var systems = this.systemsSetTimeout;

            this.logicWorldLoop(systems, this.timeSetTimeout, delta);
        }

        public processAnimFrame(): void {
            var now = Date.now();
            var delta = now - this.timeAnimFrame;
            delta = Math.min(delta, this.maxInterval);

            this.timeAnimFrame = now;

            var systems = this.systemsAnimFrame;

            this.logicWorldLoop(systems, this.timeAnimFrame, delta);
            this.renderingSystem.process(this.timeAnimFrame, delta);

        }

        public logicWorldLoop(systems: System[], time: number, delta: number): void {
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

        public start(): void {

            if (typeof this.renderingSystem === 'undefined') {
                throw new Error('World.renderingSystem is not set.');
            }

            var processAnimFrame = () => {
                requestAnimationFrame(processAnimFrame);
                this.processAnimFrame();
            }
            processAnimFrame();

            var processSetTimeout = () => {
                setTimeout(processSetTimeout, this.fixedStep);
                this.processSetTimeout();
            }
            processSetTimeout();
        }
    }
}
