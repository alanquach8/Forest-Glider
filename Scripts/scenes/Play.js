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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // private _ocean?: objects.Ocean;
        // private _plane?: objects.Plane;
        // private _island?: objects.Island;
        // private _cloudNumber:number;
        // private _clouds?: objects.Cloud[];
        // private _scoreBoard: managers.ScoreBoard;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this._noOfEnemies = 10;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            config.Game.CURRENT_SCENE = this;
            this._forest = new objects.Forest();
            this._player = new objects.Player();
            this._labelArea = this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, 50, "#000000");
            this._labelArea.alpha = 0.5;
            this._lifeLabel = new objects.Label("Life: " + this._player.Life, "20px", "Consolas", "#FFFFFF", 0, 0, false);
            this._bombsLabel = new objects.Label("Bombs: " + this._player.BombCount, "20px", "Consolas", "#FFFFFF", 0, 25, false);
            this._enemies = new Array();
            var anEnemy = new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), -100, -100);
            this._enemies.push(anEnemy);
            for (var i = 0; i < this._noOfEnemies; i++) {
                this._enemies.push(new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), Math.floor(util.Mathf.RandomRange(500, 2000)), Math.floor(util.Mathf.RandomRange(50, 400))));
            }
            this._explosions = new Array();
            // this._ocean = new objects.Ocean();
            // this._plane = new objects.Plane();
            // this._island = new objects.Island();
            // this._cloudNumber = config.Game.CLOUD_NUM;
            // this._clouds = new Array<objects.Cloud>();
            // // create an array of cloud objects
            // for (let index = 0; index < this._cloudNumber; index++) 
            // {
            //     this._clouds[index] = new objects.Cloud();             
            // }
            // this._scoreBoard = new managers.ScoreBoard();
            // config.Game.SCORE_BOARD = this._scoreBoard;
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._forest.Update();
            this._player.Update();
            this._enemies.forEach(function (enemy) {
                _this._player.ThrowingStars.forEach(function (star) {
                    managers.Collision.AABBCheck(star, enemy);
                    if (enemy.isColliding) {
                        star.Impact();
                        // this.removeChild(star);
                        // this._player.ThrowingStars.splice(this._player.ThrowingStars.indexOf(star), 1);
                    }
                    if (star.alpha <= 0) {
                        _this.removeChild(star);
                        _this._player.ThrowingStars.splice(_this._player.ThrowingStars.indexOf(star), 1);
                    }
                });
                _this._player.Bombs.forEach(function (bomb) {
                    managers.Collision.AABBCheck(bomb, enemy);
                    if (bomb.Exploded) {
                        var explosion = new objects.Explosion(bomb.x, bomb.y, bomb.Damage);
                        _this._explosions.push(explosion);
                        _this.addChild(explosion);
                    }
                    if (bomb.alpha <= 0) {
                        _this.removeChild(bomb);
                        _this._player.Bombs.splice(_this._player.Bombs.indexOf(bomb), 1);
                    }
                });
                _this._explosions.forEach(function (explosion) {
                    managers.Collision.AABBCheck(explosion, enemy);
                });
                enemy.Update();
                if (enemy.IsDead) {
                    _this._enemies.splice(_this._enemies.indexOf(enemy), 1);
                    _this.removeChild(enemy);
                    console.log(_this._enemies.length);
                }
            });
            this._explosions.forEach(function (explosion) {
                explosion.Update();
                if (explosion.alpha <= 0) {
                    _this.removeChild(explosion);
                    _this._explosions.splice(_this._explosions.indexOf(explosion), 1);
                }
            });
            this.UpdateLabels();
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._forest);
            this.addChild(this._player);
            this._enemies.forEach(function (enemy) {
                _this.addChild(enemy);
            });
            this.addChild(this._labelArea);
            this.addChild(this._lifeLabel);
            this.addChild(this._bombsLabel);
            // this.addChild(this._ocean);
            // this.addChild(this._island);
            // this.addChild(this._plane);
            // this._clouds.forEach(cloud => {
            //     this.addChild(cloud);
            // });
            // this.addChild(this._scoreBoard.LivesLabel);
            // this.addChild(this._scoreBoard.ScoreLabel);
        };
        Play.prototype.UpdateLabels = function () {
            this.removeChild(this._lifeLabel);
            this.removeChild(this._bombsLabel);
            this._lifeLabel = new objects.Label("Life: " + this._player.Life, "20px", "Consolas", "#FFFFFF", 0, 0, false);
            this._bombsLabel = new objects.Label("Bombs: " + this._player.BombCount, "20px", "Consolas", "#FFFFFF", 0, 25, false);
            this.addChild(this._lifeLabel);
            this.addChild(this._bombsLabel);
        };
        Play.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        Play.prototype.Clean = function () {
            // this._plane.engineSound.stop();
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map