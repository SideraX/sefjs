module Sef {

    export class System {

        public components: number[] = [];
        public entities: Entity[] = [];

        private _all = false;

        private registerComponent(c: any): void {
            this.components.push(Util.componentTypeId(c));
        }

        public forAllComponents(...components: any[]): System {
            this._all = true;

            for (var i = components.length - 1; i >= 0; i--) {
                this.registerComponent(components[i]);
            }

            return this;
        }

        public forOneComponent(...components: any[]): System {
            this._all = false;

            for (var i = components.length - 1; i >= 0; i--) {
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
                this.entities[e.id] = e;
            }
            else if (this.entities[e.id]) {
                this.entities[e.id] = undefined;
            }
        }

        public process(): void {
            for (var i = this.entities.length - 1; i >= 0; i--) {
                this.update(this.entities[i]);
            }
        }

        public update(e: Entity): void {}

    }
}

