module scenes
{
    export class Dodge extends objects.Scene
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

        private _renderLoseScreen:boolean = false;
        private _loseScreen: createjs.Shape;
        private _mainMenuButton: objects.Button;

        private _backgroundTheme?: createjs.AbstractSoundInstance;
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
            this._player.ReloadCounter = 100;
            this._player.Life = 1;
            this._enemies = new Array<objects.Enemy>();
            this._enemiesToSpawn = 2;
            this._enemySpeed = 1;

            this._backgroundTheme = createjs.Sound.play("background_theme");
            this._backgroundTheme.loop = -1; // loop forever
            this._backgroundTheme.volume = 0.05; // 10% volume

            this._mainMenuButton = new objects.Button(config.Game.ASSETS.getResult("main_menu_button"), config.Game.SCREEN_WIDTH/2, 400, true);
            this._mainMenuButton.on("click", ()=>{
                this._backgroundTheme.stop();
                config.Game.SCENE = scenes.State.START;
            });

            this.Main();
        }

        public Update(): void 
        {
            if(!this._lose)
            {
                this.UpdateScore();
                this._player.Update();
                this._player.ReloadCounter = 100;
                if(this._enemies.length == 0)
                {
                    for(let i=0; i<this._enemiesToSpawn; i++)
                    {
                        let dragon = Math.floor(util.Mathf.RandomRange(1,2)) == 1 ? "baby_dragon_green" : "baby_dragon_red";
                        let enemy = new objects.BabyDragon(config.Game.ASSETS.getResult(dragon), Math.floor(util.Mathf.RandomRange(config.Game.SCREEN_WIDTH, config.Game.SCREEN_WIDTH+100)), Math.floor(util.Mathf.RandomRange(50, 400)));
                        enemy.Speed = this._enemySpeed;
                        this._enemies.push(enemy);
                        this.addChild(enemy);
                    }
                } else {
                    this._enemies.forEach(enemy => {
                        enemy.Update();
                        managers.Collision.AABBCheck(this._player, enemy);
                        if(this._player.Life == 0)
                        {
                            this._lose = true;
                        }
                        if(enemy.IsOffScreen())
                        {
                            this._score++;
                            this._enemies.splice(this._enemies.indexOf(enemy), 1);
                        }
                    });
                }

                this._enemySpeed = this._score > 10 ? Math.floor(this._score/10) : 1;
                this._enemiesToSpawn = this._score > 20 ? Math.floor(this._score/10)+1 : 2;
            } else {
                // player lost
                if(!this._renderLoseScreen)
                {
                    if(this._score > config.Game.DODGE_HIGH_SCORE)
                    {
                        config.Game.DODGE_HIGH_SCORE = this._score;
                    }
                    let finalscore = new objects.Label("Final Score: " + this._score, "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 60, true);
                    let highscore = new objects.Label("High Score: " + config.Game.DODGE_HIGH_SCORE, "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 110, true);
                    this._loseScreen = this.DrawRectangle(20, 20, config.Game.SCREEN_WIDTH-40, config.Game.SCREEN_HEIGHT-40, "#000000");
                    this._loseScreen.alpha = 0.7;
                    this.addChild(this._loseScreen);
                    this.addChild(finalscore);
                    this.addChild(highscore);
                    this.addChild(this._mainMenuButton);
                    this._renderLoseScreen = true;
                }
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