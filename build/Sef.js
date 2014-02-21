var Sef;
(function (Sef) {
    var Component = (function () {
        function Component() {
        }
        return Component;
    })();
    Sef.Component = Component;
})(Sef || (Sef = {}));
///<reference path="Entity.ts" />
///<reference path="Component.ts" />
///<reference path="System.ts" />
///<reference path="Sef.ts" />
var Sef;
(function (Sef) {
    var World = (function () {
        function World() {
            this._systems = [];
            this._entities = [];
        }
        /**
        * Register a system
        *
        * @param {system} System
        */
        World.prototype.setSystem = function (system) {
            this._systems.push(system);
        };

        /**
        * Create a new Entity
        */
        World.prototype.createEntity = function () {
            var e = new Sef.Entity(this);

            this._entities.push(e);

            return e;
        };

        World.prototype.refresh = function (e) {
            var systems = this._systems;

            for (var i = systems.length - 1; i >= 0; i--) {
                systems[i].refreshEntity(e);
            }
            ;
        };
        return World;
    })();
    Sef.World = World;
})(Sef || (Sef = {}));
///<reference path="Entity.ts" />
///<reference path="Component.ts" />
///<reference path="World.ts" />
///<reference path="Sef.ts" />
var Sef;
(function (Sef) {
    var System = (function () {
        function System() {
            this._components = [];
            this._entities = [];
        }
        System.prototype.registerComponent = function (c) {
            this._components.push(Sef.componentTypeId(c));
        };

        System.prototype.refreshEntity = function (e) {
            if (e.hasComponents(this._components)) {
                this._entities[e.id] = e;
            } else if (this._entities[e.id]) {
                this._entities[e.id] = undefined;
            }
        };

        System.prototype.update = function () {
        };
        return System;
    })();
    Sef.System = System;
})(Sef || (Sef = {}));
///<reference path="Component.ts" />
///<reference path="System.ts" />
///<reference path="World.ts" />
///<reference path="Sef.ts" />
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
            this._components[Sef.componentTypeId(c)] = c;

            this._world.refresh(this);

            return this;
        };

        /**
        * [remove description]
        *
        * @param {Component}
        */
        Entity.prototype.remove = function (c) {
            this._components[Sef.componentTypeId(c)] = undefined;

            this._world.refresh(this);

            return this;
        };

        /**
        * [hasComponents description]
        *
        * @param {Component[]}
        * @return {boolean}
        */
        Entity.prototype.hasComponents = function (components) {
            for (var i = components.length - 1; i >= 0; i--) {
                return (this._components[Sef.componentTypeId(components[i])] !== undefined);
            }

            return true;
        };

        Entity.prototype.get = function (componentType) {
            return this._components[Sef.componentTypeId(componentType)];
        };
        Entity._nextId = 0;
        return Entity;
    })();
    Sef.Entity = Entity;
})(Sef || (Sef = {}));
///<reference path="Entity.ts" />
///<reference path="Component.ts" />
///<reference path="System.ts" />
///<reference path="World.ts" />
var Sef;
(function (Sef) {
    /**
    * Next typeId for component (inheritance)
    *
    * @type {number}
    */
    var _nextComponentTypeId = 0;

    /**
    * Return the next typeId
    *
    * @return {number}
    */
    function nextComponentTypeId() {
        return _nextComponentTypeId++;
    }
    Sef.nextComponentTypeId = nextComponentTypeId;

    function componentTypeId(c) {
        if (typeof c === 'function') {
            if (c.typeId === undefined)
                c.typeId = nextComponentTypeId();

            return c.typeId;
        }

        if (c.constructor.typeId === undefined)
            c.constructor.typeId = nextComponentTypeId();

        return c.constructor.typeId;
    }
    Sef.componentTypeId = componentTypeId;
})(Sef || (Sef = {}));
