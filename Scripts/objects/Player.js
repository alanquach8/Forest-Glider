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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player() {
            var _this = _super.call(this, config.Game.ASSETS.getResult(config.Game.SELECTED_CHARACTER), 50, config.Game.SCREEN_HEIGHT / 2, true) || this;
            _this._speed = 2;
            // player_f
            window.addEventListener('keyup', function (e) {
                switch (e.code) {
                    case "KeyW":
                        _this._up = false;
                        _this.rotation = 0;
                        break;
                    case "KeyS":
                        _this._down = false;
                        _this.rotation = 0;
                        break;
                    case "KeyA":
                        _this._left = false;
                        break;
                    case "KeyD":
                        _this._right = false;
                        break;
                }
            });
            window.addEventListener('keydown', function (e) {
                switch (e.code) {
                    case "KeyW":
                        _this._up = true;
                        _this.rotation = -15;
                        break;
                    case "KeyS":
                        _this._down = true;
                        _this.rotation = 15;
                        break;
                    case "KeyA":
                        _this._left = true;
                        break;
                    case "KeyD":
                        _this._right = true;
                        break;
                }
            });
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "Up", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._up;
            },
            set: function (value) {
                this._up = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Down", {
            get: function () {
                return this._down;
            },
            set: function (value) {
                this._down = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Left", {
            get: function () {
                return this._left;
            },
            set: function (value) {
                this._left = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Right", {
            get: function () {
                return this._right;
            },
            set: function (value) {
                this._right = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Speed", {
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
        Player.prototype._checkBounds = function () {
            if (this.x - this.halfWidth < 0) {
                this.x = this.halfWidth;
            }
            if (this.x + this.halfWidth > config.Game.SCREEN_WIDTH) {
                this.x = config.Game.SCREEN_WIDTH - this.halfWidth;
            }
            if (this.y - this.halfHeight < 0) {
                this.y = this.halfHeight;
            }
            if (this.y + this.halfHeight > config.Game.SCREEN_HEIGHT) {
                this.y = config.Game.SCREEN_HEIGHT - this.halfHeight;
            }
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
        };
        Player.prototype.Update = function () {
            if (this._up) {
                this.y -= this._speed;
            }
            if (this._down) {
                this.y += this._speed;
            }
            if (this._left) {
                this.x -= this._speed;
            }
            if (this._right) {
                this.x += this._speed;
            }
            // console.log('(x, y): (' + this.x + ', ' + this.y + ')');
            // console.log('(regX, regY): (' + this.regX + ', ' + this.regY + ')');
            // console.log('position(x, y): (' + this.position.x + ', ' + this.position.y + ')');
            // console.log(this.rotation);
            this._checkBounds();
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map