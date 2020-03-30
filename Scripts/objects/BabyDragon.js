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
    var BabyDragon = /** @class */ (function (_super) {
        __extends(BabyDragon, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function BabyDragon(imageString, x, y) {
            var _this = _super.call(this, imageString, x, y) || this;
            _this._damage = 1;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        BabyDragon.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        BabyDragon.prototype.Start = function () {
            this._speed = 1;
            this._life = 2;
            this._isDead = false;
        };
        BabyDragon.prototype.Update = function () {
            // Baby Dragons fly leftward, swinging up/down
            // this.y - math.sin() - radians
            this.position = new objects.Vector2(this.x - this._speed, this.y);
            if (this.Life <= 0) {
                this._isDying = true;
                // death animation before setting isDead=true
            }
            if (this._isDying) {
                this._speed = 0;
                this.alpha -= 0.1;
                if (this.alpha <= 0) {
                    this._isDead = true;
                }
            }
        };
        BabyDragon.prototype.Reset = function () {
        };
        return BabyDragon;
    }(objects.Enemy));
    objects.BabyDragon = BabyDragon;
})(objects || (objects = {}));
//# sourceMappingURL=BabyDragon.js.map