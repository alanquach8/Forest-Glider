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
     * @class Player
     * @extends {GameObject}
     */
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player() {
            var _this = _super.call(this, config.Game.ASSETS.getResult(config.Game.SELECTED_CHARACTER), 50, config.Game.SCREEN_HEIGHT / 2, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._life = 5;
            _this._score = 0;
            _this._invincible = false;
            _this._invincibleDuration = 100;
            _this._invincibleCounter = 0;
            _this._speed = 2;
            _this._reloadSpeed = 15;
            _this._reloadCounter = 0; // counts from 0 to reloadSpeed to throw stars at intervals
            _this._bombCount = 3;
            _this._bombReloadSpeed = 50;
            _this._bombReloadCounter = 0; // counts from 0 to bombReloadSpeed to throw bombs at intervals
            _this._win = false;
            _this._lose = false;
            _this._isDead = false;
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
                    case "KeyK":
                        _this._isThrowingBomb = false;
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
                    case "KeyK":
                        _this._isThrowingBomb = true;
                        break;
                }
            });
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "Life", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._life;
            },
            set: function (value) {
                this._life = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Score", {
            get: function () {
                return this._score;
            },
            set: function (value) {
                this._score = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Invincible", {
            get: function () {
                return this._invincible;
            },
            set: function (value) {
                this._invincible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Up", {
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
        Object.defineProperty(Player.prototype, "Bombs", {
            get: function () {
                return this._bombs;
            },
            set: function (value) {
                this._bombs = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "BombCount", {
            get: function () {
                return this._bombCount;
            },
            set: function (value) {
                this._bombCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Win", {
            set: function (value) {
                this._win = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "IsDead", {
            get: function () {
                return this._isDead;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "ReloadSpeed", {
            get: function () {
                return this._reloadSpeed;
            },
            set: function (value) {
                this._reloadSpeed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "ReloadCounter", {
            set: function (value) {
                this._reloadCounter = value;
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
            this._bombs = new Array();
        };
        Player.prototype.Update = function () {
            var _this = this;
            if (!this._lose) {
                if (this._life <= 0) {
                    this._lose = true;
                }
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
                if (this._isThrowing) {
                    if (this._reloadCounter == 0) {
                        var star = new objects.ThrowingStar(this.x, this.y);
                        this._throwingStars.push(star);
                        config.Game.CURRENT_SCENE.addChild(star);
                        createjs.Sound.play("throwing_star");
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
                if (this._isThrowingBomb && this._bombCount > 0) {
                    if (this._bombReloadCounter == 0) {
                        var bomb = new objects.Bomb(this.x, this.y);
                        this._bombs.push(bomb);
                        config.Game.CURRENT_SCENE.addChild(bomb);
                        this._bombReloadCounter = this._bombReloadSpeed;
                        this._bombCount--;
                    }
                    else {
                        this._bombReloadCounter--;
                    }
                }
                else {
                    if (this._bombReloadCounter != 0) {
                        this._bombReloadCounter--;
                    }
                }
                this._bombs.forEach(function (bomb) {
                    bomb.Update();
                });
                if (this._invincible) {
                    this._invincibleCounter--;
                    if (this._invincibleCounter % 5 == 0) {
                        this.alpha == 0.3 ? this.alpha = 0.8 : this.alpha = 0.3;
                    }
                    if (this._invincibleCounter <= 0) {
                        this.isColliding = false;
                        this._invincible = false;
                        this.alpha = 1;
                    }
                }
                if (!this._win) {
                    this._checkBounds();
                }
            }
            else { // player lost
                if (config.Game.SELECTED_CHARACTER == "player_m") {
                    this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("player_m_dead")).image;
                }
                else {
                    this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("player_f_dead")).image;
                }
                this.rotation = 0;
                this.alpha -= 0.005;
                if (this.alpha <= 0) {
                    this._isDead = true;
                }
            }
        };
        /**
         * Animation for when player gets hit
         * and enables invincibility state for brief moment
         *
         * @memberof Player
         */
        Player.prototype.GotHit = function () {
            createjs.Sound.play("player_gets_hit");
            this._invincible = true;
            this._invincibleCounter = this._invincibleDuration;
            this.alpha = 0.3;
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map