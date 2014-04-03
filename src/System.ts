module Sef {

    export class System {

        public components: number[];
        public entities: Hashmap;

        private _all = false;

        constructor() {
            this.components = [];
            this.entities = new Hashmap();
        }

        private registerComponent(c: any): void {
            this.components.push(Util.componentTypeId(c));
        }

        public forAllComponents(...components: any[]): System {
            this._all = true;

            for (var i = 0, max = components.length; i < max; i++){
                this.registerComponent(components[i]);
            }

            return this;
        }

        public forOneComponent(...components: any[]): System {
            this._all = false;

            for (var i = 0, max = components.length; i < max; i++){
                this.registerComponent(components[i]);
            }

            return this;
        }

        public refreshEntity(e: Entity): void {
            var eligible;
            if (this._all) {
                eligible = e.hasAllComponents(this.components);
            }
            else {
                eligible = e.hasOneComponent(this.components);
            }

            if (eligible) {
                this.entities.add(e.id, e);
            }
            else if (this.entities.has(e.id)) {
                this.entities.remove(e.id);
            }
        }

        public process(): void {
            var that = this;

            this.entities.forEach(function(idEntity, e) {
                that.update(e);
            });
        }

        public update(e: Entity): void {}

    }
}

