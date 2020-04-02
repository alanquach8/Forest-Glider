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
    var Instructions2 = /** @class */ (function (_super) {
        __extends(Instructions2, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Instructions2() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Instructions2.prototype.Start = function () {
            this._instructionsLabel = new objects.Label("Instructions", "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 40, true);
            this._back = new objects.Button(config.Game.ASSETS.getResult("back_button"), 85, 425, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH / 2, 425, true);
            // this._next = new objects.Button(config.Game.ASSETS.getResult("next_button"), 555, 425, true);
            this._instructions = new createjs.Bitmap(config.Game.ASSETS.getResult("instructions2"));
            this._instructions.x = 20;
            this._instructions.y = 85;
            this.Main();
        };
        Instructions2.prototype.Update = function () {
        };
        Instructions2.prototype.Main = function () {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._instructionsLabel);
            this.addChild(this._instructions);
            this.addChild(this._back);
            this._back.on("click", function () {
                config.Game.SCENE = scenes.State.INSTRUCTIONS1;
            });
            this.addChild(this._mainMenu);
            this._mainMenu.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
            // this.addChild(this._next);
            // this._next.on("click", ()=>{
            //     config.Game.SCENE = scenes.State.INSTRUCTIONS3;
            // });
        };
        Instructions2.prototype.Clean = function () {
            this.removeAllChildren();
        };
        Instructions2.prototype.DrawRectangle = function (x, y, w, h, color) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        };
        return Instructions2;
    }(objects.Scene));
    scenes.Instructions2 = Instructions2;
})(scenes || (scenes = {}));
//# sourceMappingURL=Instructions2.js.map