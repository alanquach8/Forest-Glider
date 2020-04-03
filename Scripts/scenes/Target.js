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
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Target.prototype.Start = function () {
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
            this.Main();
        };
        Target.prototype.Update = function () {
            if (!this._lose) {
                this.UpdateScore();
                this._player.Update();
                // enemies get faster 
            }
            else {
                // player lost
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