module scenes
{
    export class Minigames extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _minigamesLabel: objects.Label;

        private _dodgeGameBox: createjs.Shape;
        private _dodgeGameLabel: objects.Label;

        private _targetGameBox: createjs.Shape;
        private _targetGameLabel: objects.Label;

        private _descriptionBox: createjs.Shape;
        private _descriptionLabel: objects.Label;

        private _mainMenu: objects.Button;
        // PUBLIC PROPERTIES
        public get DescriptionLabel(): objects.Label
        {
            return this._descriptionLabel;
        }
        public set DescriptionLabel(value:objects.Label)
        {
            this._descriptionLabel = value;
        }
        // CONSTRUCTOR
        constructor()
        {
            super();
            this.Start();
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        public Start(): void 
        {
            this._minigamesLabel = new objects.Label("MINIGAMES", "80px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 50, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH/2, 425, true);
            this.Main();
        }

        public Update(): void 
        {
        }

        public Main(): void 
        {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._minigamesLabel);

            this.addChild(this._mainMenu);
            this._mainMenu.on("click", ()=>{
                config.Game.SCENE = scenes.State.START;
            });

            this._dodgeGameBox = this.DrawRectangle(15, 190, 200, 45, "#115023");
            this._dodgeGameLabel = new objects.Label("Dodge Game", "25px", "Consolas", "#FFFF00", 25, 200, false);
            this.addChild(this._dodgeGameBox);
            this.addChild(this._dodgeGameLabel);
            this._dodgeGameBox.on("mouseover", this.DisplayDodgeDesc);
            this._dodgeGameBox.on("mouseout", this.RemoveDescription);
            this._dodgeGameBox.on("click", ()=>{
                config.Game.SCENE = scenes.State.DODGE;
            });

            this._targetGameBox = this.DrawRectangle(15, 250, 200, 45, "#115023");
            this._targetGameLabel = new objects.Label("Target Game", "25px", "Consolas", "#FFFF00", 25, 260, false);
            this.addChild(this._targetGameBox);
            this.addChild(this._targetGameLabel);
            this._targetGameBox.on("mouseover", this.DisplayTargetDesc);
            this._targetGameBox.on("mouseout", this.RemoveDescription);
            this._targetGameBox.on("click", ()=>{
                config.Game.SCENE = scenes.State.TARGET;
            });
        }

        public Clean(): void 
        {
            this.removeAllChildren();
        }

        public DisplayDodgeDesc(): void
        {
            this.alpha = 0.7;
            console.log('description');
            console.log(this.parent);
            this.parent.DescriptionLabel = new objects.Label("Dodge as many enemies as possible without getting hit", "15px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 320, true);
            this.parent.addChild(this.parent.DescriptionLabel);
        }

        public DisplayTargetDesc(): void
        {
            this.alpha = 0.7;
            console.log('description');
            console.log(this.parent);
            this.parent.DescriptionLabel = new objects.Label("Hit as many enemies as possible without stars going off screen", "15px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 320, true);
            this.parent.addChild(this.parent.DescriptionLabel);
        }

        public RemoveDescription(): void
        {
            this.alpha = 1;
            this.parent.removeChild(this.parent.DescriptionLabel);
        }

        public DrawRectangle(x:number, y:number, w:number, h:number, color:string): createjs.Shape
        {
            let shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        }
        
    }
}