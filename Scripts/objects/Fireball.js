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
    var Fireball = /** @class */ (function (_super) {
        __extends(Fireball, _super);
        // CONSTRUCTOR
        function Fireball(x, y, player_x, player_y) {
            var _this = _super.call(this, config.Game.ASSETS.getResult("fireball"), x, y, true) || this;
            // player's x,y position
            // speed
            // see Vector2 methods
            // get fireball image
            _this._towards = new objects.Vector2(player_x, player_y);
            _this.Start();
            return _this;
        }
        Object.defineProperty(Fireball.prototype, "Damage", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._damage;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Fireball.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Fireball.prototype.Start = function () {
            this._speed = 5;
            this._damage = 2;
            var x = -(this.x - this._towards.x);
            var y = -(this.y - this._towards.y);
            this._towards = new objects.Vector2(x, y);
            this._towards.normalize();
        };
        Fireball.prototype.Update = function () {
            this.position = new objects.Vector2(this.x + (this._towards.x * this._speed), this.y + (this._towards.y * this._speed));
        };
        Fireball.prototype.Reset = function () {
        };
        Fireball.prototype.IsOffScreen = function () {
            return this.x < -this.width || this.x > config.Game.SCREEN_WIDTH + this.width || this.y < -this.height || this.y > config.Game.SCREEN_HEIGHT + this.height;
        };
        return Fireball;
    }(objects.GameObject));
    objects.Fireball = Fireball;
})(objects || (objects = {}));
//# sourceMappingURL=Fireball.js.map