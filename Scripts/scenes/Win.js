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
    var Win = /** @class */ (function (_super) {
        __extends(Win, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Win() {
            var _this = _super.call(this) || this;
            _this._labelColor = "#FFFF00";
            _this._finalScore = config.Game.FINAL_SCORE;
            _this._highScore = config.Game.HIGH_SCORE;
            _this.Start();
            return _this;
        }
        ;
        // PRIVATE METHODS
        // PUBLIC METHODS
        Win.prototype.Start = function () {
            this._winLabel = new objects.Label("YOU WIN", "70px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 50, true);
            this._playAgain = new objects.Button(config.Game.ASSETS.getResult("play_again_button"), config.Game.SCREEN_WIDTH / 2, 400, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH / 2, 450, true);
            if (config.Game.SELECTED_CHARACTER == "player_m") {
                this._winImage = new createjs.Bitmap(config.Game.ASSETS.getResult("player_m_win"));
            }
            else {
                this._winImage = new createjs.Bitmap(config.Game.ASSETS.getResult("player_f_win"));
            }
            this._winImage.x = 125;
            this._winImage.y = 125;
            this._finalScoreLabel = new objects.Label("Final Score: " + this._finalScore, "30px", "Consolas", this._labelColor, 450, 200, true);
            this._highScoreLabel = new objects.Label("High Score: " + this._highScore, "30px", "Consolas", this._labelColor, 450, 235, true);
            this._playAgain.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            this._mainMenu.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
            this.Main();
        };
        Win.prototype.Update = function () {
        };
        Win.prototype.Main = function () {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._winLabel);
            this.addChild(this._winImage);
            this.addChild(this._finalScoreLabel);
            this.addChild(this._highScoreLabel);
            this.addChild(this._playAgain);
            this.addChild(this._mainMenu);
        };
        Win.prototype.Clean = function () {
            this.removeAllChildren();
        };
        Win.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        return Win;
    }(objects.Scene));
    scenes.Win = Win;
})(scenes || (scenes = {}));
//# sourceMappingURL=Win.js.map