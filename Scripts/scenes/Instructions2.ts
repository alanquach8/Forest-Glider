module scenes
{
    export class Instructions2 extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _instructionsLabel: objects.Label;
        private _back: objects.Button;
        private _mainMenu: objects.Button;
        // private _next: objects.Button;
        private _instructions: createjs.Bitmap;

        // PUBLIC PROPERTIES

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
            this._instructionsLabel = new objects.Label("Instructions", "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 40, true);
            this._back = new objects.Button(config.Game.ASSETS.getResult("back_button"), 85, 425, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH/2, 425, true);
            // this._next = new objects.Button(config.Game.ASSETS.getResult("next_button"), 555, 425, true);
            this._instructions = new createjs.Bitmap(config.Game.ASSETS.getResult("instructions2"));
            this._instructions.x = 20;
            this._instructions.y = 85;
            this.Main();
        }
        public Update(): void 
        {
        }
        public Main(): void 
        {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._instructionsLabel);
            this.addChild(this._instructions);

            this.addChild(this._back);
            this._back.on("click", ()=>{
                config.Game.SCENE = scenes.State.INSTRUCTIONS1;
            });
            
            this.addChild(this._mainMenu);
            this._mainMenu.on("click", ()=>{
                config.Game.SCENE = scenes.State.START;
            });

            // this.addChild(this._next);
            // this._next.on("click", ()=>{
            //     config.Game.SCENE = scenes.State.INSTRUCTIONS3;
            // });
        }
        public Clean(): void 
        {
            this.removeAllChildren();
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