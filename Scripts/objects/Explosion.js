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
     * @class Explosion
     * @extends {GameObject}
     */
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        // CONSTRUCTOR
        function Explosion(x, y, damage) {
            var _this = _super.call(this, config.Game.ASSETS.getResult("bomb_explosion"), x, y, true) || this;
            _this._damage = damage;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Explosion.prototype, "Damage", {
            // PUBLIC PROPERTIES
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
        Explosion.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Explosion.prototype.Start = function () {
            var explosionSound = createjs.Sound.play("explosion");
            explosionSound.volume = 0.1;
        };
        Explosion.prototype.Update = function () {
            this.alpha -= 0.05;
        };
        Explosion.prototype.Reset = function () {
        };
        return Explosion;
    }(objects.GameObject));
    objects.Explosion = Explosion;
})(objects || (objects = {}));
//# sourceMappingURL=Explosion.js.map