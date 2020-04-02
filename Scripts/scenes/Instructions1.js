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
    var Instructions1 = /** @class */ (function (_super) {
        __extends(Instructions1, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Instructions1() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Instructions1.prototype.Start = function () {
            this._instructionsLabel = new objects.Label("Instructions", "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 40, true);
            this._back = new objects.Button(config.Game.ASSETS.getResult("back_button"), 85, 425, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH / 2, 425, true);
            this._next = new objects.Button(config.Game.ASSETS.getResult("next_button"), 555, 425, true);
            this._instructions = new createjs.Bitmap(config.Game.ASSETS.getResult("instructions1"));
            this._instructions.x = 20;
            this._instructions.y = 85;
            this.Main();
        };
        Instructions1.prototype.Update = function () {
        };
        Instructions1.prototype.Main = function () {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._instructionsLabel);
            this.addChild(this._instructions);
            this.addChild(this._back);
            this._back.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
            this.addChild(this._mainMenu);
            this._mainMenu.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
            this.addChild(this._next);
            this._next.on("click", function () {
                config.Game.SCENE = scenes.State.INSTRUCTIONS2;
            });
        };
        Instructions1.prototype.Clean = function () {
            this.removeAllChildren();
        };
        Instructions1.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        return Instructions1;
    }(objects.Scene));
    scenes.Instructions1 = Instructions1;
})(scenes || (scenes = {}));
//# sourceMappingURL=Instructions1.js.map