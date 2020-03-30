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
    var DragonBoss = /** @class */ (function (_super) {
        __extends(DragonBoss, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function DragonBoss(imageString, x, y, isCentered) {
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imageString, x, y, isCentered) || this;
            _this._damage = 1;
            _this._points = 10;
            _this._idleCounter = 0;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        DragonBoss.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        DragonBoss.prototype.Start = function () {
            this._speed = 0;
            this._life = 10;
            this._isDead = false;
        };
        DragonBoss.prototype.Update = function () {
            this._idleCounter++;
            if (this._idleCounter == 0) {
                this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle1")).image;
            }
            if (this._idleCounter == 15) {
                this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle2")).image;
            }
            if (this._idleCounter == 30) {
                this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle3")).image;
            }
            if (this._idleCounter == 45) {
                this._idleCounter = 0;
            }
        };
        DragonBoss.prototype.Reset = function () {
        };
        return DragonBoss;
    }(objects.Enemy));
    objects.DragonBoss = DragonBoss;
})(objects || (objects = {}));
//# sourceMappingURL=DragonBoss.js.map