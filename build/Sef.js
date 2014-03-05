var Sef;
(function (Sef) {
    var Component = (function () {
        function Component() {
        }
        return Component;
    })();
    Sef.Component = Component;
})(Sef || (Sef = {}));
var Sef;
(function (Sef) {
    var Entity = (function () {
        function Entity(_world) {
            this._world = _world;
            this._components = [];
            this.id = Entity._nextId++;
        }
        /**
        * [add description]
        *
        * @param {Component}
        */
        Entity.prototype.add = function (c) {
            this._components[Sef.Util.componentTypeId(c)] = c;

            this._world.refresh(this);

            return this;
        };

        /**
        * [remove description]
        *
        * @param {Component}
        */
        Entity.prototype.remove = function (c) {
            this._components[Sef.Util.componentTypeId(c)] = undefined;

            this._world.refresh(this);

            return this;
        };

        Entity.prototype.hasComponent = function (c) {
            return (this._components[Sef.Util.componentTypeId(c)] !== undefined);
        };

        /**
        * [hasComponents description]
        *
        * @param {Component[]}
        * @return {boolean}
        */
        Entity.prototype.hasComponents = function (components) {
            if (components.length === 0)
                return false;

            for (var i = components.length - 1; i >= 0; i--) {
                return (this._components[components[i]] !== undefined);
            }

            return true;
        };

        Entity.prototype.get = function (componentType) {
            return this._components[Sef.Util.componentTypeId(componentType)];
        };
        Entity._nextId = 0;
        return Entity;
    })();
    Sef.Entity = Entity;
})(Sef || (Sef = {}));
var Sef;
(function (Sef) {
    var Util = (function () {
        function Util() {
        }
        /**
        * Return the next typeId
        *
        * @return {number}
        */
        Util.nextComponentTypeId = function () {
            return Util._nextComponentTypeId++;
        };

        Util.componentTypeId = function (c) {
            if (typeof c === 'function') {
                if (c.typeId === undefined)
                    c.typeId = Util.nextComponentTypeId();

                return c.typeId;
            }

            if (c.constructor.typeId === undefined)
                c.constructor.typeId = Util.nextComponentTypeId();

            return c.constructor.typeId;
        };
        Util._nextComponentTypeId = 0;
        return Util;
    })();
    Sef.Util = Util;
})(Sef || (Sef = {}));
var Sef;
(function (Sef) {
    var System = (function () {
        function System() {
            this.components = [];
            this.entities = [];
        }
        System.prototype.registerComponent = function (c) {
            this.components.push(Sef.Util.componentTypeId(c));
        };

        System.prototype.refreshEntity = function (e) {
            console.log(e.hasComponents(this.components));
            if (e.hasComponents(this.components)) {
                this.entities[e.id] = e;
            } else if (this.entities[e.id]) {
                this.entities[e.id] = undefined;
            }
        };

        System.prototype.process = function () {
            for (var i = this.entities.length - 1; i >= 0; i--) {
                this.update(this.entities[i]);
            }
        };

        System.prototype.update = function (e) {
        };
        return System;
    })();
    Sef.System = System;
})(Sef || (Sef = {}));
var Sef;
(function (Sef) {
    var World = (function () {
        function World() {
            this.systems = [];
            this.entities = [];
        }
        /**
        * Register a system
        *
        * @param {system} System
        */
        World.prototype.setSystem = function (system) {
            this.systems.push(system);
        };

        /**
        * Create a new Entity
        */
        World.prototype.createEntity = function () {
            var e = new Sef.Entity(this);

            this.entities.push(e);

            return e;
        };

        /**
        * [refresh description]
        */
        World.prototype.refresh = function (e) {
            var systems = this.systems;

            for (var i = systems.length - 1; i >= 0; i--) {
                systems[i].refreshEntity(e);
            }
        };

        /**
        * [refresh description]
        */
        World.prototype.process = function () {
            var systems = this.systems;

            for (var i = systems.length - 1; i >= 0; i--) {
                systems[i].process();
            }
        };
        return World;
    })();
    Sef.World = World;
})(Sef || (Sef = {}));
//# sourceMappingURL=Sef.js.map
