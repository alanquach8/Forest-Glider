module scenes
{
    export class Lose extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _loseLabel: objects.Label;
        private _tryAgain: objects.Button;
        private _mainMenu: objects.Button;
        private _labelColor: string = "#FFFF00";
        private _deadImage: createjs.Bitmap;

        private _finalScore: number = config.Game.FINAL_SCORE;
        private _finalScoreLabel: objects.Label;
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
            this._loseLabel = new objects.Label("GAME OVER", "70px", "Consolas", this._labelColor, config.Game.SCREEN_WIDTH/2, 50, true);
            this._tryAgain = new objects.Button(config.Game.ASSETS.getResult("try_again_button"), config.Game.SCREEN_WIDTH/2, 400, true);
            this._mainMenu = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH/2, 450, true);
            
            if(config.Game.SELECTED_CHARACTER == "player_m")
            {
                this._deadImage = new createjs.Bitmap(config.Game.ASSETS.getResult("player_m_dead_big"));
            } else {
                this._deadImage = new createjs.Bitmap(config.Game.ASSETS.getResult("player_f_dead_big"));
            }
            this._deadImage.x = 180;
            this._deadImage.y = 150;

            this._finalScoreLabel = new objects.Label("Final Score: " + this._finalScore, "30px", "Consolas", this._labelColor, config.Game.SCREEN_WIDTH/2, 325, true);

            this._tryAgain.on("click", ()=>{
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
            this.addChild(this._loseLabel);
            this.addChild(this._deadImage);
            this.addChild(this._finalScoreLabel);
            this.addChild(this._tryAgain);
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