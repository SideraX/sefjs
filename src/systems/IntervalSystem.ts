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
            var interval = this.interval;

            this.acc += this.world.delta;


            if (this.acc < interval) {
                return;
            }

            this.acc -= interval;
            super.process();
        }


    }
}
