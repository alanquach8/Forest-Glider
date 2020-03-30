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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // CONSTRUCTOR
        function Enemy(imageString, x, y, isCentered) {
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imageString, x, y, isCentered) || this;
            _this._hitByExplosion = false;
            return _this;
        }
        Object.defineProperty(Enemy.prototype, "Speed", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._speed;
            },
            set: function (value) {
                this._speed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "Life", {
            get: function () {
                return this._life;
            },
            set: function (value) {
                this._life = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "IsDead", {
            get: function () {
                return this._isDead;
            },
            set: function (value) {
                this._isDead = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "Damage", {
            get: function () {
                return this._damage;
            },
            set: function (value) {
                this._damage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "Points", {
            get: function () {
                return this._points;
            },
            set: function (value) {
                this._points = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "HitByExplosion", {
            get: function () {
                return this._hitByExplosion;
            },
            set: function (value) {
                this._hitByExplosion = value;
            },
            enumerable: true,
            configurable: true
        });
        Enemy.prototype.IsOffScreen = function () {
            return this.x < -110;
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map