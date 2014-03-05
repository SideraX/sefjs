module Sef {

    export class System {

        public components: number[] = [];
        public entities: Entity[] = [];

        public registerComponent(c: any): void {

            this.components.push(Util.componentTypeId(c));
        }

        public refreshEntity(e: Entity): void {
            console.log(e.hasComponents(this.components));
            if (e.hasComponents(this.components)) {
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

