module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _playButton: objects.Button;
        private _instructionsButton: objects.Button;
        private _cheatButton: objects.Button;

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
             //instantiate a new Text object
            this._welcomeLabel = new objects.Label("Forest Glider", "80px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 50, true);
            // buttons
            this._playButton = new objects.Button(config.Game.ASSETS.getResult("play_button"), config.Game.SCREEN_WIDTH/2, 430, true);
            this._instructionsButton = new objects.Button(config.Game.ASSETS.getResult("instructions_button"), 100, 430, true);
            this._cheatButton = new objects.Button(config.Game.ASSETS.getResult("cheat_button"), config.Game.SCREEN_WIDTH-100, 430, true);

            this.Main();
        }
        
        public Update(): void 
        {
        }
        
        public Main(): void 
        {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._welcomeLabel);

        
            this.addChild(this._playButton);

            this._playButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.CHARACTER_SELECT;
            });

            this.addChild(this._instructionsButton);

            this._instructionsButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.INSTRUCTIONS1;
            });
            
            this.addChild(this._cheatButton);

        }

        public Clean():void
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