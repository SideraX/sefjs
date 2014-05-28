module Sef {

    export class System {

        public entities: Hashmap;

        private _all: BitSet;
        private _one: BitSet;

        public world: World;
        public delta: number = 0;
        public time: number = 0;

        /**
         * [constructor description]
         */
        constructor() {
            this.entities = new Hashmap();
        }

        public init(): void {}

        /**
         * [forAllComponents description]
         * @param  {any[]}  ...components [description]
         * @return {System}               [description]
         */
        public forAllComponents(...components: any[]): System {
            this._all = new BitSet();

            for (var i = 0, max = components.length; i < max; i++){
                var type = ComponentManager.typeId(components[i]);
                this._all.set(type);
            }

            return this;
        }

        /**
         * [forOneComponent description]
         * @param  {any[]}  ...components [description]
         * @return {System}               [description]
         */
        public forOneComponent(...components: any[]): System {
            this._one = new BitSet();

            for (var i = 0, max = components.length; i < max; i++){
                var type = ComponentManager.typeId(components[i]);
                this._one.set(type);
            }

            return this;
        }

        /**
         * [refreshEntity description]
         * @param {Entity} e [description]
         */
        public refreshEntity(e: Entity): void {
            var eligible = false;

            if (this._all) {
                eligible = e.componentsMask.contains(this._all);
            }
            else if (this._one) {
                eligible = e.componentsMask.intersects(this._one);
            }

            if (eligible) {
                this.entities.set(e.id, e);
            }
            else if (this.entities.has(e.id)) {
                this.entities.remove(e.id);
            }
        }

        /**
         * [process description]
         */
        public process(time: number, delta: number): void {
            this.time = time;
            this.delta = delta;

            var entities = this.entities.values();

            for (var i = 0, max = entities.length; i < max; i++){
                this.update(entities[i]);
            }
        }


        /**
         * [update description]
         * @param {Entity} e [description]
         */
        public update(e: Entity): void {}

    }
}

