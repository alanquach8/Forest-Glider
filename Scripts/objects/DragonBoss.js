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
     * @class DragonBoss
     * @extends {Enemy}
     */
    var DragonBoss = /** @class */ (function (_super) {
        __extends(DragonBoss, _super);
        // CONSTRUCTOR
        function DragonBoss(imageString, x, y, isCentered) {
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imageString, x, y, isCentered) || this;
            _this._damage = 1;
            _this._points = 10;
            _this._idleCounter = 0;
            _this._startBattle = false;
            _this._attackCounter = 0;
            _this._attackAt = 600;
            _this._idle = true;
            _this._spawned = 0; // counts from 0 to spawnCount to spawn certain amount
            _this._spawnCount = 5;
            _this._spawnCounter = 0; // counts from 0 to spawnAt to spawn at intervals
            _this._spawnAt = 60;
            _this._prefireCount = 100;
            _this._prefireCounter = 0; // counts from 0 to prefireCount to change animation
            _this._fireballCount = 3;
            _this._fireballCounter = 0; // counts from 0 to fireballCount to shoot certain amount of fireballs
            _this._fireballDelay = 80;
            _this._fireballDelayCounter = 0; // counts from 0 to fireballDelay to shoot fireballs at intervals
            _this.Start();
            return _this;
        }
        Object.defineProperty(DragonBoss.prototype, "StartBattle", {
            // PUBLIC PROPERTIES
            set: function (value) {
                this._startBattle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragonBoss.prototype, "Spawns", {
            get: function () {
                return this._spawns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragonBoss.prototype, "Fireballs", {
            get: function () {
                return this._fireballs;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        DragonBoss.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        DragonBoss.prototype.Start = function () {
            this._speed = 0;
            this._life = 100;
            this._isDead = false;
            this._points = 20;
            this._spawns = Array();
            this._fireballs = Array();
        };
        DragonBoss.prototype.Update = function () {
            if (!this._isDying) {
                if (this._life <= 0) {
                    this._isDying = true;
                }
                if (this._idle) {
                    this._idleCounter++;
                    if (this._idleCounter == 0) {
                        this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle1")).image;
                    }
                    if (this._idleCounter == 20) {
                        this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle2")).image;
                    }
                    if (this._idleCounter == 40) {
                        this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle3")).image;
                    }
                    if (this._idleCounter == 59) {
                        this._idleCounter = 0;
                    }
                    this._attackCounter++;
                    if (this._attackCounter == this._attackAt) {
                        this._idle = false;
                        this._attackCounter = 0;
                        this._attackCode = Math.floor(util.Mathf.RandomRange(1, 2));
                    }
                }
                else {
                    // ATTACK
                    if (this._attackCode == 1) {
                        this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_spawn")).image;
                        if (this._spawned != this._spawnCount) {
                            this._spawnCounter++;
                            if (this._spawnCounter == this._spawnAt) {
                                var dragon = Math.floor(util.Mathf.RandomRange(1, 2)) == 1 ? "baby_dragon_green" : "baby_dragon_red";
                                var spawn = new objects.BabyDragon(config.Game.ASSETS.getResult(dragon), this.x, this.y);
                                spawn.Speed = 1;
                                this.Spawns.push(spawn);
                                this._spawned++;
                                this._spawnCounter = 0;
                            }
                        }
                        else {
                            this._idle = true;
                            this._spawned = 0;
                            this._spawnCounter = 0;
                        }
                    }
                    else {
                        if (this._prefireCounter != this._prefireCount) {
                            this._prefireCounter++;
                            this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_prefire")).image;
                        }
                        else {
                            this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_fire")).image;
                            if (this._fireballCounter != this._fireballCount) {
                                if (this._fireballDelayCounter != this._fireballDelay) {
                                    this._fireballDelayCounter++;
                                }
                                else {
                                    this._fireballCounter++;
                                    this._fireballDelayCounter = 0;
                                    // spit fire
                                    console.log('spit fire');
                                    var fireball = new objects.Fireball(this.x - 70, this.y - 10, config.Game.PLAYER.x, config.Game.PLAYER.y);
                                    this._fireballs.push(fireball);
                                    config.Game.CURRENT_SCENE.addChild(fireball);
                                }
                            }
                            else {
                                this._idle = true;
                                this._fireballCounter = 0;
                                this._fireballDelayCounter = 0;
                                this._prefireCounter = 0;
                            }
                        }
                    }
                }
            }
            else { // isDying = true
                this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_dying")).image;
                this.alpha -= 0.01;
                if (this.alpha <= 0) {
                    this._isDead = true;
                }
            }
        };
        DragonBoss.prototype.Reset = function () {
        };
        return DragonBoss;
    }(objects.Enemy));
    objects.DragonBoss = DragonBoss;
})(objects || (objects = {}));
//# sourceMappingURL=DragonBoss.js.map