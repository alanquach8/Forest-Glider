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
    var CharacterSelect = /** @class */ (function (_super) {
        __extends(CharacterSelect, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function CharacterSelect() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        CharacterSelect.prototype.Start = function () {
            var _this = this;
            this._selectLabel = new objects.Label("Select Character", "60px", "Consolas", "#FFFFFF", 0, 0, false);
            this._background = this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black");
            this._charMBorder = this.DrawRectangle(45, 95, 250, 250, "#00FF33");
            this._charFBorder = this.DrawRectangle(345, 95, 250, 250, "#000000");
            this._characterM = new objects.Button(config.Game.ASSETS.getResult("select_player_m"), 50, 100);
            this._characterF = new objects.Button(config.Game.ASSETS.getResult("select_player_f"), 350, 100);
            config.Game.SELECTED_CHARACTER = "player_m";
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("back_button"), 100, 400);
            this._playButton = new objects.Button(config.Game.ASSETS.getResult("play_button"), 300, 400);
            this._characterM.on("click", function () {
                config.Game.SELECTED_CHARACTER = "player_m";
                _this._charMBorder = _this.DrawRectangle(45, 95, 250, 250, "#00FF33");
                _this._charFBorder = _this.DrawRectangle(345, 95, 250, 250, "#000000");
                _this.Update();
            });
            this._characterF.on("click", function () {
                config.Game.SELECTED_CHARACTER = "player_f";
                _this._charMBorder = _this.DrawRectangle(45, 95, 250, 250, "#000000");
                _this._charFBorder = _this.DrawRectangle(345, 95, 250, 250, "#00FF33");
                _this.Update();
            });
            this._backButton.on("click", function () {
                config.Game.SELECTED_CHARACTER = "player_m";
                config.Game.SCENE = scenes.State.START;
            });
            this._playButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            this.Main();
        };
        CharacterSelect.prototype.Update = function () {
            this.removeAllChildren();
            this.Main();
        };
        CharacterSelect.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._selectLabel);
            this.addChild(this._charMBorder);
            this.addChild(this._charFBorder);
            this.addChild(this._characterM);
            this.addChild(this._characterF);
            this.addChild(this._backButton);
            this.addChild(this._playButton);
        };
        CharacterSelect.prototype.Clean = function () {
            this.removeAllChildren();
        };
        CharacterSelect.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        return CharacterSelect;
    }(objects.Scene));
    scenes.CharacterSelect = CharacterSelect;
})(scenes || (scenes = {}));
//# sourceMappingURL=CharacterSelect.js.map