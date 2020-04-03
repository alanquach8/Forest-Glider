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
            this._enemies = new Array<objects.Enemy>();
            this._enemiesToSpawn = 1;
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
                        if(enemy.IsOffScreen())
                        {
                            this._lose = true;
                        }
                    });

                    this._player.ThrowingStars.forEach(star => {
                        this._enemies.forEach(enemy => {
                            managers.Collision.AABBCheck(star, enemy);
                            if(enemy.isColliding)
                            {
                                star.Impact();
                                enemy.isColliding = false;
                            }
                            if(star.alpha <= 0)
                            {
                                this.removeChild(star);
                                this._player.ThrowingStars.splice(this._player.ThrowingStars.indexOf(star), 1);
                            }
                            if(enemy.IsDead)
                            {
                                this._enemies.splice(this._enemies.indexOf(enemy), 1);
                                this.removeChild(enemy);
                                this._score++;
                            }
                        });
                        if(star.x > config.Game.SCREEN_WIDTH)
                        {
                            this._lose = true;
                        }
                    });
                }
            } else {
                // player lost
                if(!this._renderLoseScreen)
                {
                    if(this._score > config.Game.TARGET_HIGH_SCORE)
                    {
                        config.Game.TARGET_HIGH_SCORE = this._score;
                    }
                    let finalscore = new objects.Label("Final Score: " + this._score, "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 60, true);
                    let highscore = new objects.Label("High Score: " + config.Game.TARGET_HIGH_SCORE, "40px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 110, true);
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