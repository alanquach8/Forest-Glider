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
    var Minigames = /** @class */ (function (_super) {
        __extends(Minigames, _super);
        // CONSTRUCTOR
        function Minigames() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Minigames.prototype, "DescriptionLabel", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._descriptionLabel;
            },
            set: function (value) {
                this._descriptionLabel = value;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        // PUBLIC METHODS
        Minigames.prototype.Start = function () {
            this._minigamesLabel = new objects.Label("MINIGAMES", "80px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 50, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH / 2, 425, true);
            this.Main();
        };
        Minigames.prototype.Update = function () {
        };
        Minigames.prototype.Main = function () {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._minigamesLabel);
            this.addChild(this._mainMenu);
            this._mainMenu.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
            this._dodgeGameBox = this.DrawRectangle(15, 190, 200, 45, "#115023");
            this._dodgeGameLabel = new objects.Label("Dodge Game", "25px", "Consolas", "#FFFF00", 25, 200, false);
            this.addChild(this._dodgeGameBox);
            this.addChild(this._dodgeGameLabel);
            this._dodgeGameBox.on("mouseover", this.DisplayDodgeDesc);
            this._dodgeGameBox.on("mouseout", this.RemoveDescription);
            this._dodgeGameBox.on("click", function () {
                config.Game.SCENE = scenes.State.DODGE;
            });
            this._targetGameBox = this.DrawRectangle(15, 250, 200, 45, "#115023");
            this._targetGameLabel = new objects.Label("Target Game", "25px", "Consolas", "#FFFF00", 25, 260, false);
            this.addChild(this._targetGameBox);
            this.addChild(this._targetGameLabel);
            this._targetGameBox.on("mouseover", this.DisplayTargetDesc);
            this._targetGameBox.on("mouseout", this.RemoveDescription);
            this._targetGameBox.on("click", function () {
                config.Game.SCENE = scenes.State.TARGET;
            });
        };
        Minigames.prototype.Clean = function () {
            this.removeAllChildren();
        };
        Minigames.prototype.DisplayDodgeDesc = function () {
            this.alpha = 0.7;
            console.log('description');
            console.log(this.parent);
            this.parent.DescriptionLabel = new objects.Label("Dodge as many enemies as possible without getting hit", "15px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 320, true);
            this.parent.addChild(this.parent.DescriptionLabel);
        };
        Minigames.prototype.DisplayTargetDesc = function () {
            this.alpha = 0.7;
            console.log('description');
            console.log(this.parent);
            this.parent.DescriptionLabel = new objects.Label("Hit as many enemies as possible without stars going off screen", "15px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 320, true);
            this.parent.addChild(this.parent.DescriptionLabel);
        };
        Minigames.prototype.RemoveDescription = function () {
            this.alpha = 1;
            this.parent.removeChild(this.parent.DescriptionLabel);
        };
        Minigames.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        return Minigames;
    }(objects.Scene));
    scenes.Minigames = Minigames;
})(scenes || (scenes = {}));
//# sourceMappingURL=Minigames.js.map