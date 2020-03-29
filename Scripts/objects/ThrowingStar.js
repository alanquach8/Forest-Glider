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
    var ThrowingStar = /** @class */ (function (_super) {
        __extends(ThrowingStar, _super);
        // CONSTRUCTOR
        function ThrowingStar(x, y) {
            var _this = _super.call(this, config.Game.ASSETS.getResult(config.Game.THROWING_STAR), x, y, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._speed = 20;
            _this.Start();
            return _this;
        }
        Object.defineProperty(ThrowingStar.prototype, "Speed", {
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
        // PRIVATE METHODS
        ThrowingStar.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        ThrowingStar.prototype.Start = function () {
        };
        ThrowingStar.prototype.Update = function () {
            this.x += this._speed;
        };
        ThrowingStar.prototype.Reset = function () {
        };
        ThrowingStar.prototype.IsOffScreen = function () {
            return this.x > config.Game.SCREEN_WIDTH;
        };
        return ThrowingStar;
    }(objects.GameObject));
    objects.ThrowingStar = ThrowingStar;
})(objects || (objects = {}));
//# sourceMappingURL=ThrowingStar.js.map