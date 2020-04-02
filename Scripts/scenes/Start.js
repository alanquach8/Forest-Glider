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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            //instantiate a new Text object
            this._welcomeLabel = new objects.Label("Forest Glider", "80px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 50, true);
            // buttons
            this._playButton = new objects.Button(config.Game.ASSETS.getResult("play_button"), config.Game.SCREEN_WIDTH / 2, 430, true);
            this._instructionsButton = new objects.Button(config.Game.ASSETS.getResult("instructions_button"), 100, 430, true);
            this._cheatButton = new objects.Button(config.Game.ASSETS.getResult("cheat_button"), config.Game.SCREEN_WIDTH - 100, 430, true);
            this.Main();
        };
        Start.prototype.Update = function () {
        };
        Start.prototype.Main = function () {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._welcomeLabel);
            this.addChild(this._playButton);
            this._playButton.on("click", function () {
                config.Game.SCENE = scenes.State.CHARACTER_SELECT;
            });
            this.addChild(this._instructionsButton);
            this._instructionsButton.on("click", function () {
                config.Game.SCENE = scenes.State.INSTRUCTIONS1;
            });
            this.addChild(this._cheatButton);
        };
        Start.prototype.Clean = function () {
            this.removeAllChildren();
        };
        Start.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map