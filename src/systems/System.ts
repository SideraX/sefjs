module Sef {

    export class System {

        public entities: Hashmap;

        private _all: BitSet;
        private _one: BitSet;
        private _exclude: BitSet;

        public world: World;
        public delta: number = 0;
        public time: number = 0;

        private _systemsInstance: {type: any; variable: string}[] = [];

        /**
         * [constructor description]
         */
        constructor() {
            this.entities = new Hashmap();
        }

        /**
         * [init description]
         */
        public init(): void {
            for (var i = 0, max = this._systemsInstance.length; i < max; i++){
                this[this._systemsInstance[i].variable] = this.world.getSystem(this._systemsInstance[i].type);
            }
        }

        /**
         * [getSystemInstance description]
         * @param {any}    systemType [description]
         * @param {string} variable   [description]
         */
        public getSystemInstance(systemType: any, variable: string) {
            this._systemsInstance.push({type: systemType, variable: variable});
        }

        /**
         * [forAllComponents description]
         * @param  {any[]}  ...components [description]
         * @return {System}               [description]
         */
        public forAllComponents(...components: any[]): System {
            this._all = new BitSet();

            var type: number;
            for (var i = 0, max = components.length; i < max; i++){
                type = ComponentManager.typeId(components[i]);
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

            var type: number;
            for (var i = 0, max = components.length; i < max; i++){
                type = ComponentManager.typeId(components[i]);
                this._one.set(type);
            }

            return this;
        }

        public excludeComponents(...components: any[]): System {
            this._exclude = new BitSet();

            var type: number;
            for (var i = 0, max = components.length; i < max; i++){
                type = ComponentManager.typeId(components[i]);
                this._exclude.set(type);
            }

            return this;
        }

        /**
         * [refreshEntity description]
         * @param {Entity} e [description]
         */
        public refreshEntity(e: Entity): void {
            var interested = true;

            if (this._all) {
                interested = e.componentsMask.contains(this._all);
            }
            if (interested && this._exclude) {
                interested = !e.componentsMask.intersects(this._exclude);
            }
            if (interested && this._one) {
                interested = e.componentsMask.intersects(this._one);
            }

            if (interested) {
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

