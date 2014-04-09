module Sef {

    export class IntervalSystem extends System {

        public delta: number;
        /**
         * [constructor description]
         */
        constructor(public interval = 100) {
            super();

            this.delta = 0;
        }

        /**
         * [process description]
         */
        public process(): void {
            this.delta += this.world.delta;

            if (this.delta < this.interval) {
                return;
            }

            super.process();

            this.delta = 0;
        }


    }
}
