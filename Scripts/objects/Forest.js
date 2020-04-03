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
    var Forest = /** @class */ (function (_super) {
        __extends(Forest, _super);
        // CONSTRUCTOR
        function Forest() {
            var _this = _super.call(this, config.Game.ASSETS.getResult("forest")) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Forest.prototype, "HorizontalSpeed", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._horizontalSpeed;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Forest.prototype._checkBounds = function () {
            if (this.x + this.width <= 960) {
                this.Reset();
            }
        };
        // PUBLIC METHODS
        Forest.prototype.Start = function () {
            this._horizontalSpeed = 3;
            this.alpha = 0.90;
        };
        Forest.prototype.Update = function () {
            this.position = objects.Vector2.add(this.position, new objects.Vector2(-this._horizontalSpeed, 0));
            this._checkBounds();
        };
        Forest.prototype.Reset = function () {
            this.position = new objects.Vector2(0, 0);
        };
        return Forest;
    }(objects.GameObject));
    objects.Forest = Forest;
})(objects || (objects = {}));
//# sourceMappingURL=Forest.js.map