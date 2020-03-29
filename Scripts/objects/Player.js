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
            _this._reloadSpeed = 15;
            _this._reloadCounter = 0;
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
                    case "KeyJ":
                        _this._isThrowing = false;
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
                    case "KeyJ":
                        _this._isThrowing = true;
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
        Object.defineProperty(Player.prototype, "ThrowingStars", {
            get: function () {
                return this._throwingStars;
            },
            set: function (value) {
                this._throwingStars = value;
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
            this._throwingStars = new Array();
        };
        Player.prototype.Update = function () {
            var _this = this;
            if (this._up) {
                this.position = new objects.Vector2(this.x, this.y - this._speed);
                //this.y -= this._speed;
            }
            if (this._down) {
                this.position = new objects.Vector2(this.x, this.y + this._speed);
                //this.y += this._speed;
            }
            if (this._left) {
                this.position = new objects.Vector2(this.x - this._speed, this.y);
                //this.x -= this._speed;
            }
            if (this._right) {
                this.position = new objects.Vector2(this.x + this._speed, this.y);
                //this.x += this._speed;
            }
            // console.log('(x, y): (' + this.x + ', ' + this.y + ')');
            // console.log('(regX, regY): (' + this.regX + ', ' + this.regY + ')');
            // console.log('position(x, y): (' + this.position.x + ', ' + this.position.y + ')');
            // console.log(this.rotation);
            if (this._isThrowing) {
                if (this._reloadCounter == 0) {
                    var star = new objects.ThrowingStar(this.x, this.y);
                    this._throwingStars.push(star);
                    config.Game.CURRENT_SCENE.addChild(star);
                    this._reloadCounter = this._reloadSpeed;
                }
                else {
                    this._reloadCounter--;
                }
            }
            else {
                if (this._reloadCounter != 0) {
                    this._reloadCounter--;
                }
            }
            this._throwingStars.forEach(function (star) {
                star.Update();
                if (star.IsOffScreen()) {
                    _this._throwingStars.splice(_this._throwingStars.indexOf(star), 1);
                    config.Game.CURRENT_SCENE.removeChild(star);
                }
            });
            this._checkBounds();
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map