module scenes
{
    export class Win extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _winLabel: objects.Label;
        private _playAgain: objects.Button;
        private _mainMenu: objects.Button;
        private _labelColor: string = "#FFFF00";
        private _winImage: createjs.Bitmap;

        private _finalScore: number = config.Game.FINAL_SCORE;;
        private _finalScoreLabel: objects.Label;
        private _highScore: number = config.Game.HIGH_SCORE;
        private _highScoreLabel: objects.Label;
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
            this._winLabel = new objects.Label("YOU WIN", "70px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 50, true);
            this._playAgain = new objects.Button(config.Game.ASSETS.getResult("play_again_button"), config.Game.SCREEN_WIDTH/2, 400, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH/2, 450, true);

            if(config.Game.SELECTED_CHARACTER == "player_m")
            {
                this._winImage = new createjs.Bitmap(config.Game.ASSETS.getResult("player_m_win"));
            } else {
                this._winImage = new createjs.Bitmap(config.Game.ASSETS.getResult("player_f_win"));
            }
            this._winImage.x = 125;
            this._winImage.y = 125;

            this._finalScoreLabel = new objects.Label("Final Score: " + this._finalScore, "30px", "Consolas", this._labelColor, 450, 200, true);
            this._highScoreLabel = new objects.Label("High Score: " + this._highScore, "30px", "Consolas", this._labelColor, 450, 235, true);

            this._playAgain.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });

            this._mainMenu.on("click", ()=>{
                config.Game.SCENE = scenes.State.START;
            });

            this.Main();
        }
        public Update(): void 
        {
        }
        public Main(): void 
        {
            this.addChild(this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black"));
            this.addChild(this._winLabel);
            this.addChild(this._winImage);
            this.addChild(this._finalScoreLabel);
            this.addChild(this._highScoreLabel);
            this.addChild(this._playAgain);
            this.addChild(this._mainMenu);
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