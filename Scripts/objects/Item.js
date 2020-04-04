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
     * @class Item
     * @extends {GameObject}
     */
    var Item = /** @class */ (function (_super) {
        __extends(Item, _super);
        // CONSTRUCTOR
        function Item(id, x, y) {
            var _this = this;
            if (id == 1) {
                _this = _super.call(this, config.Game.ASSETS.getResult("bomb_item"), x, y, true) || this;
            }
            if (id == 2) {
                _this = _super.call(this, config.Game.ASSETS.getResult("life_item"), x, y, true) || this;
            }
            if (id == 3) {
                _this = _super.call(this, config.Game.ASSETS.getResult("star_item"), x, y, true) || this;
            }
            _this._id = id;
            _this._obtained = false;
            return _this;
        }
        Object.defineProperty(Item.prototype, "Obtained", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._obtained;
            },
            set: function (value) {
                this._obtained = value;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Item.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Item.prototype.Start = function () {
        };
        Item.prototype.Update = function () {
            this.position = new objects.Vector2(this.x - 0.5, this.y);
        };
        Item.prototype.Reset = function () {
        };
        Item.prototype.Reward = function () {
            config.Game.PLAYER.Score += 5;
            if (this._id == 1) {
                config.Game.PLAYER.BombCount++;
            }
            if (this._id == 2) {
                config.Game.PLAYER.Life++;
            }
            if (this._id == 3) {
                // reload speed = 5 is fastest
                if (config.Game.PLAYER.ReloadSpeed > 5) {
                    config.Game.PLAYER.ReloadSpeed -= 5;
                }
            }
        };
        Item.prototype.IsOffScreen = function () {
            return this.x < -this.width;
        };
        return Item;
    }(objects.GameObject));
    objects.Item = Item;
})(objects || (objects = {}));
//# sourceMappingURL=Item.js.map