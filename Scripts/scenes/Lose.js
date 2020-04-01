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
    var Lose = /** @class */ (function (_super) {
        __extends(Lose, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Lose() {
            var _this = _super.call(this) || this;
            _this._labelColor = "#FFFF00";
            _this._finalScore = config.Game.FINAL_SCORE;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Lose.prototype.Start = function () {
            this._loseLabel = new objects.Label("YOU LOSE", "70px", "Consolas", this._labelColor, config.Game.SCREEN_WIDTH / 2, 50, true);
            this._tryAgain = new objects.Button(config.Game.ASSETS.getResult("try_again_button"), config.Game.SCREEN_WIDTH / 2, 400, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH / 2, 450, true);
            if (config.Game.SELECTED_CHARACTER == "player_m") {
                this._deadImage = new createjs.Bitmap(config.Game.ASSETS.getResult("player_m_dead_big"));
            }
            else {
                this._deadImage = new createjs.Bitmap(config.Game.ASSETS.getResult("player_f_dead_big"));
            }
            this._deadImage.x = 180;
            this._deadImage.y = 150;
            this._finalScoreLabel = new objects.Label("Final Score: " + this._finalScore, "30px", "Consolas", this._labelColor, config.Game.SCREEN_WIDTH / 2, 325, true);
            this._tryAgain.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            this._mainMenu.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
            this.Main();
        };
        Lose.prototype.Update = function () {
        };
        Lose.prototype.Main = function () {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._loseLabel);
            this.addChild(this._deadImage);
            this.addChild(this._finalScoreLabel);
            this.addChild(this._tryAgain);
            this.addChild(this._mainMenu);
        };
        Lose.prototype.Clean = function () {
            this.removeAllChildren();
        };
        Lose.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        return Lose;
    }(objects.Scene));
    scenes.Lose = Lose;
})(scenes || (scenes = {}));
//# sourceMappingURL=Lose.js.map