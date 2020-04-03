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
var scenes;
(function (scenes) {
    var Target = /** @class */ (function (_super) {
        __extends(Target, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Target() {
            var _this = _super.call(this) || this;
            _this._score = 0;
            _this._lose = false;
            _this._renderLoseScreen = false;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Target.prototype.Start = function () {
            var _this = this;
            config.Game.CURRENT_SCENE = this;
            this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("minigame_background"));
            this._background.alpha = 0.9;
            this._labelArea = this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, 50, "#000000");
            this._labelArea.alpha = 0.5;
            this._scoreLabel = new objects.Label("Score: " + this._score, "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 20, true);
            this._player = new objects.Player();
            this._player.BombCount = 0;
            this._enemies = new Array();
            this._enemiesToSpawn = 1;
            this._enemySpeed = 1;
            this._backgroundTheme = createjs.Sound.play("background_theme");
            this._backgroundTheme.loop = -1; // loop forever
            this._backgroundTheme.volume = 0.05; // 10% volume
            this._mainMenuButton = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH / 2, 400, true);
            this._mainMenuButton.on("click", function () {
                _this._backgroundTheme.stop();
                config.Game.SCENE = scenes.State.START;
            });
            this.Main();
        };
        Target.prototype.Update = function () {
            var _this = this;
            if (!this._lose) {
                this.UpdateScore();
                this._player.Update();
                if (this._enemies.length == 0) {
                    for (var i = 0; i < this._enemiesToSpawn; i++) {
                        var dragon = Math.floor(util.Mathf.RandomRange(1, 2)) == 1 ? "baby_dragon_green" : "baby_dragon_red";
                        var enemy = new objects.BabyDragon(config.Game.ASSETS.getResult(dragon), Math.floor(util.Mathf.RandomRange(config.Game.SCREEN_WIDTH, config.Game.SCREEN_WIDTH + 100)), Math.floor(util.Mathf.RandomRange(50, 400)));
                        enemy.Speed = this._enemySpeed;
                        this._enemies.push(enemy);
                        this.addChild(enemy);
                    }
                }
                else {
                    this._enemies.forEach(function (enemy) {
                        enemy.Update();
                        if (enemy.IsOffScreen()) {
                            _this._lose = true;
                        }
                    });
                    this._player.ThrowingStars.forEach(function (star) {
                        _this._enemies.forEach(function (enemy) {
                            managers.Collision.AABBCheck(star, enemy);
                            if (enemy.isColliding) {
                                star.Impact();
                                enemy.isColliding = false;
                            }
                            if (star.alpha <= 0) {
                                _this.removeChild(star);
                                _this._player.ThrowingStars.splice(_this._player.ThrowingStars.indexOf(star), 1);
                            }
                            if (enemy.IsDead) {
                                _this._enemies.splice(_this._enemies.indexOf(enemy), 1);
                                _this.removeChild(enemy);
                                _this._score++;
                            }
                        });
                        if (star.x > config.Game.SCREEN_WIDTH) {
                            _this._lose = true;
                        }
                    });
                }
            }
            else {
                // player lost
                if (!this._renderLoseScreen) {
                    if (this._score > config.Game.TARGET_HIGH_SCORE) {
                        config.Game.TARGET_HIGH_SCORE = this._score;
                    }
                    var finalscore = new objects.Label("Final Score: " + this._score, "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 60, true);
                    var highscore = new objects.Label("High Score: " + config.Game.TARGET_HIGH_SCORE, "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 110, true);
                    this._loseScreen = this.DrawRectangle(20, 20, config.Game.SCREEN_WIDTH - 40, config.Game.SCREEN_HEIGHT - 40, "#000000");
                    this._loseScreen.alpha = 0.7;
                    this.addChild(this._loseScreen);
                    this.addChild(finalscore);
                    this.addChild(highscore);
                    this.addChild(this._mainMenuButton);
                    this._renderLoseScreen = true;
                }
            }
        };
        Target.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._player);
            this.addChild(this._labelArea);
            this.addChild(this._scoreLabel);
        };
        Target.prototype.UpdateScore = function () {
            this.removeChild(this._scoreLabel);
            this._scoreLabel = new objects.Label("Score: " + this._score, "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 20, true);
            this.addChild(this._scoreLabel);
        };
        Target.prototype.Clean = function () {
            this.removeAllChildren();
        };
        Target.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        return Target;
    }(objects.Scene));
    scenes.Target = Target;
})(scenes || (scenes = {}));
//# sourceMappingURL=Target.js.map