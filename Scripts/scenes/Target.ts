module scenes
{
    export class Target extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _background: createjs.Bitmap;
        private _labelArea: createjs.Shape;
        private _scoreLabel: objects.Label;
        private _score: number = 0;
        private _player: objects.Player;
        private _lose: boolean = false;
        private _enemies?: Array<objects.Enemy>;
        private _enemiesToSpawn: number;
        private _enemySpeed: number;
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
            config.Game.CURRENT_SCENE = this;
            this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("minigame_background"));
            this._background.alpha = 0.9;
            this._labelArea = this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, 50, "#000000");
            this._labelArea.alpha = 0.5;
            this._scoreLabel = new objects.Label("Score: " + this._score, "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 20, true);
            this._player = new objects.Player();
            this._player.BombCount = 0;
            this._enemies = new Array<objects.Enemy>();
            this._enemiesToSpawn = 1;
            this._enemySpeed = 1;
            this.Main();
        }

        public Update(): void 
        {
            if(!this._lose)
            {
                this.UpdateScore();
                this._player.Update();
                // enemies get faster 
            } else {
                // player lost
            }
        }

        public Main(): void 
        {
            this.addChild(this._background);
            this.addChild(this._player);
            this.addChild(this._labelArea);
            this.addChild(this._scoreLabel);
        }

        public UpdateScore(): void
        {
            this.removeChild(this._scoreLabel);
            this._scoreLabel = new objects.Label("Score: " + this._score, "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 20, true);
            this.addChild(this._scoreLabel);
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