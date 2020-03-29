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
            this._forest.Update();
            this._player.Update();
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
            this.addChild(this._forest);
            this.addChild(this._player);
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