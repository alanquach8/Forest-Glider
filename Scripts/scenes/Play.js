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
            this._enemies = new Array();
            for (var i = 0; i < this._noOfEnemies; i++) {
                this._enemies.push(new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), Math.floor(util.Mathf.RandomRange(500, 2000)), Math.floor(util.Mathf.RandomRange(50, 400))));
            }
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
                        _this.removeChild(star);
                        _this._player.ThrowingStars.splice(_this._player.ThrowingStars.indexOf(star), 1);
                    }
                });
                enemy.Update();
                if (enemy.IsDead) {
                    _this._enemies.splice(_this._enemies.indexOf(enemy), 1);
                    _this.removeChild(enemy);
                    console.log(_this._enemies.length);
                }
            });
            // array of enemies - update
            // boss - update
            // collisions
            // collision: obj1 instanceof, obj2 instanceof
            //    this._ocean.Update();
            //    this._island.Update();
            //    this._plane.Update();
            //    managers.Collision.squaredRadiusCheck(this._plane, this._island);
            //    this._clouds.forEach(cloud => {
            //        cloud.Update();
            //        managers.Collision.squaredRadiusCheck(this._plane, cloud);
            //    });
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._forest);
            this.addChild(this._player);
            this._enemies.forEach(function (enemy) {
                _this.addChild(enemy);
            });
            // this.addChild(this._ocean);
            // this.addChild(this._island);
            // this.addChild(this._plane);
            // this._clouds.forEach(cloud => {
            //     this.addChild(cloud);
            // });
            // this.addChild(this._scoreBoard.LivesLabel);
            // this.addChild(this._scoreBoard.ScoreLabel);
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