"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    /**
     * Author: Alan Quach
     * Student Number: 300974326
     * @export
     * @class Bomb
     * @extends {GameObject}
     */
    var Bomb = /** @class */ (function (_super) {
        __extends(Bomb, _super);
        // CONSTRUCTOR
        function Bomb(x, y) {
            var _this = _super.call(this, config.Game.ASSETS.getResult("bomb"), x, y, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._distanceTravelled = 0;
            _this._distanceUntilExplosion = 200;
            _this._speed = 5;
            _this._damage = 5;
            _this._exploded = false;
            return _this;
        }
        Object.defineProperty(Bomb.prototype, "Exploded", {
            // bomb reload on player, bomb count on player
            // PUBLIC PROPERTIES
            get: function () {
                return this._exploded;
            },
            set: function (value) {
                this._exploded = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bomb.prototype, "Damage", {
            get: function () {
                return this._damage;
            },
            set: function (value) {
                this._damage = value;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Bomb.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Bomb.prototype.Start = function () {
        };
        Bomb.prototype.Update = function () {
            this.position = new objects.Vector2(this.x + this._speed, this.y);
            this._distanceTravelled += this._speed;
            if ((this._distanceTravelled >= this._distanceUntilExplosion) && !this._exploded) {
                this.Explode();
            }
            if (this._exploded) {
                this.alpha -= 0.5;
            }
        };
        Bomb.prototype.Explode = function () {
            this._exploded = true;
            this._speed = 0;
        };
        Bomb.prototype.Reset = function () {
        };
        return Bomb;
    }(objects.GameObject));
    objects.Bomb = Bomb;
})(objects || (objects = {}));
//# sourceMappingURL=Bomb.js.map