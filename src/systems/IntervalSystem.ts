module Sef {

    export class IntervalSystem extends System {

        public acc: number;
        /**
         * [constructor description]
         */
        constructor(public interval = 100) {
            super();

            this.acc = 0;
        }

        /**
         * [process description]
         */
        public process(): void {
            this.acc += this.world.delta;


            if (this.acc < this.interval) {
                return;
            }

            this.acc -= this.interval;
            super.process();
        }


    }
}
