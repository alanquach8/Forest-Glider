module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _playButton: objects.Button;
        private _instructionsButton: objects.Button;
        private _minigamesButton: objects.Button;

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
            this._playButton = new objects.Button(config.Game.ASSETS.getResult("play_button_start_scene"), config.Game.SCREEN_WIDTH/2, 250, true);
            this._instructionsButton = new objects.Button(config.Game.ASSETS.getResult("instructions_button"), config.Game.SCREEN_WIDTH/2, 300, true);
            this._minigamesButton = new objects.Button(config.Game.ASSETS.getResult("minigames_button"), config.Game.SCREEN_WIDTH/2, 350, true)
            this.Main();
        }
        
        public Update(): void 
        {
        }
        
        public Main(): void 
        {
            //this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(new createjs.Bitmap(config.Game.ASSETS.getResult("start_background")));
            this.addChild(this._welcomeLabel);

        
            this.addChild(this._playButton);

            this._playButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.CHARACTER_SELECT;
            });

            this.addChild(this._instructionsButton);

            this._instructionsButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.INSTRUCTIONS1;
            });

            this.addChild(this._minigamesButton);

            this._minigamesButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.MINIGAMES;
            });

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