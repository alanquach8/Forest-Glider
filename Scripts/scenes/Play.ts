module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _labelArea?: createjs.Shape;
        private _lifeLabel?: objects.Label;
        private _bombsLabel?: objects.Label;
        private _scoreLabel?: objects.Label;
        private _labelColor: string = "#FFFF00";
        
        private _forest?: objects.Forest;
        private _player?: objects.Player;

        private _enemies?: Array<objects.Enemy>;
        private _maxNoOfEnemies: number = 3;
        private _noOfEnemies: number = this._maxNoOfEnemies;
        
        private _explosions?: Array<objects.Explosion>;

        private _backgroundTheme?: createjs.AbstractSoundInstance;

        private _bossBattle?: boolean = false;
        private _boss?: objects.DragonBoss;
        private _spawningBoss?: boolean = false;
        private _warningLabel?: objects.Label;
        private _warningLabelPlaced?: boolean = false;
        private _warningLabelFlash?: boolean = false;

        private _win: boolean = false;
        private _lose: boolean = false;
        // private _ocean?: objects.Ocean;
        // private _plane?: objects.Plane;
        // private _island?: objects.Island;

        // private _cloudNumber:number;
        // private _clouds?: objects.Cloud[];

        // private _scoreBoard: managers.ScoreBoard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            config.Game.CURRENT_SCENE = this;
            this._backgroundTheme = createjs.Sound.play("background_theme");
            this._backgroundTheme.loop = -1; // loop forever
            this._backgroundTheme.volume = 0.05; // 10% volume

            this._forest = new objects.Forest();
            this._player = new objects.Player();

            this._labelArea = this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, 50, "#000000");
            this._labelArea.alpha = 0.5;
            this._lifeLabel = new objects.Label("Life: " + this._player.Life, "20px", "Consolas", this._labelColor, 0, 0, false);
            this._bombsLabel = new objects.Label("Bombs: " + this._player.BombCount, "20px", "Consolas", this._labelColor, 0, 25, false);
            this._scoreLabel = new objects.Label("Score: " + this._player.Score, "20px", "Consolas", this._labelColor, config.Game.SCREEN_WIDTH/2, 0, false);

            this._enemies = new Array<objects.Enemy>();
            // let anEnemy = new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), -100, -100);
            // anEnemy.Speed = 0;
            // this._enemies.push(anEnemy);
            for(let i=0; i<this._maxNoOfEnemies; i++)
            {
                let dragon = Math.floor(util.Mathf.RandomRange(1,2)) == 1 ? "baby_dragon_green" : "baby_dragon_red"
                this._enemies.push(new objects.BabyDragon(config.Game.ASSETS.getResult(dragon), Math.floor(util.Mathf.RandomRange(500, 1200)), Math.floor(util.Mathf.RandomRange(50, 400))));
                this._noOfEnemies--;
            }

            this._explosions = new Array<objects.Explosion>();
            // this._ocean = new objects.Ocean();
            // this._plane = new objects.Plane();
            // this._island = new objects.Island();

            // this._cloudNumber = config.Game.CLOUD_NUM;
            // this._clouds = new Array<objects.Cloud>();

            // // create an array of cloud objects
            // for (let index = 0; index < this._cloudNumber; index++) 
            // {
            //     this._clouds[index] = new objects.Cloud();             
            // }

            // this._scoreBoard = new managers.ScoreBoard();
            // config.Game.SCORE_BOARD = this._scoreBoard;
            
             this.Main();
        }        
        
        public Update(): void 
        {
            if(this._player.IsDead)
            {
                // LOSE SCENE HERE
                config.Game.FINAL_SCORE = this._player.Score;
                config.Game.SCENE = scenes.State.LOSE;
            }
            if(!this._spawningBoss)
            {
                if(!this._bossBattle)
                {
                    if(this._noOfEnemies == 0 && this._enemies.length == 0)
                    {
                        this._bossBattle = true;
                        console.log('BOSS BATTLE');
                        this._backgroundTheme.stop();
                        this._backgroundTheme = createjs.Sound.play("boss_theme");
                        this._backgroundTheme.loop = -1;
                        this._backgroundTheme.volume = 0.05;
                        // spawn boss
                        this._boss = new objects.DragonBoss(config.Game.ASSETS.getResult("dragon_boss_idle1"), config.Game.SCREEN_WIDTH+100, config.Game.SCREEN_HEIGHT/2);
                        this._enemies.push(this._boss);
                        this.addChild(this._boss);
                        this._spawningBoss = true;
                    }
                }

                this._forest.Update();
                this._player.Update();

                if(this._boss != null) { 
                    this._boss.Update();
                    //console.log("BOSS HP: " + this._boss.Life); 
                    // ALL BOSS ATTACK UPDATES HERE
                    // boss monster spawns
                    this._boss.Spawns.forEach(spawn => {
                        this._enemies.push(spawn);
                        this.addChild(spawn);
                        this._boss.Spawns.splice(this._boss.Spawns.indexOf(spawn), 1);
                    });
                    // boss fire balls

                    if(this._boss.IsDead)
                    {
                        this._win = true;
                        this._player.Win = true;
                        console.log('win: ' + this._win + ', lose: ' + this._lose);
                        this._player.Speed = 0;
                        this._player.position = new objects.Vector2(this._player.x+5, this._player.y);
                        if(this._player.x > config.Game.SCREEN_WIDTH + 100)
                        {
                            // WIN SCENE HERE
                            config.Game.FINAL_SCORE = this._player.Score;
                            if(this._player.Score > config.Game.HIGH_SCORE)
                            {
                                config.Game.HIGH_SCORE = this._player.Score;
                            }
                            config.Game.SCENE = scenes.State.WIN;
                        }
                    }
                }

                this._enemies.forEach(enemy => {
                    if(!this._player.Invincible)
                    {
                        managers.Collision.AABBCheck(this._player, enemy);
                    }
                    this._player.ThrowingStars.forEach(star => {
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
                    });
                    this._player.Bombs.forEach(bomb => {
                        managers.Collision.AABBCheck(bomb, enemy);
                        if(bomb.Exploded)
                        {
                            let explosion = new objects.Explosion(bomb.x, bomb.y, bomb.Damage)
                            this._explosions.push(explosion);
                            this.addChild(explosion);
                        }
                        if(bomb.alpha <= 0)
                        {
                            this.removeChild(bomb);
                            this._player.Bombs.splice(this._player.Bombs.indexOf(bomb), 1);
                        }
                    });
                    this._explosions.forEach(explosion => {
                        managers.Collision.AABBCheck(explosion, enemy);
                    });
                    enemy.Update();
                    if(enemy.IsDead)
                    {
                        this._enemies.splice(this._enemies.indexOf(enemy), 1);
                        this.removeChild(enemy);
                        console.log(this._enemies.length);
                        this._player.Score += enemy.Points;
                    }
                    if(enemy.IsOffScreen())
                    {
                        this._enemies.splice(this._enemies.indexOf(enemy), 1);
                        this.removeChild(enemy);
                        console.log(this._enemies.length);
                    }
                });

                this._explosions.forEach(explosion => {
                    explosion.Update();
                    if(explosion.alpha <= 0)
                    {
                        this.removeChild(explosion);
                        this._explosions.splice(this._explosions.indexOf(explosion), 1);
                    }
                });

                if(this._explosions.length <= 0)
                {
                    this._enemies.forEach(enemy => {
                        enemy.HitByExplosion = false;
                    });
                }

                this.UpdateLabels();
            } else {
                // spawning boss
                if(this._boss.x >= config.Game.SCREEN_WIDTH-105)
                {
                    if(!this._warningLabelPlaced)
                    {
                        this._warningLabel = new objects.Label("WARNING!!!", "80px", "Consolas", "red", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2, true);
                        this.addChild(this._warningLabel);
                        this._warningLabelPlaced = true;
                    } else {
                        this.removeChild(this._warningLabel);
                        if(!this._warningLabelFlash)
                        {
                            this._warningLabel.alpha -= 0.1;
                        } else {
                            this._warningLabel.alpha += 0.1;
                        }
                        if(this._warningLabel.alpha <= 0 || this._warningLabel.alpha >= 1)
                        {
                            this._warningLabelFlash = !this._warningLabelFlash;
                        }
                        this.addChild(this._warningLabel);
                    }
                    
                    this._boss.Update();
                    this._boss.position = new objects.Vector2(this._boss.x-0.5, this._boss.y);
                } else {
                    this._spawningBoss = false;
                    this.removeChild(this._warningLabel);
                    this._boss.StartBattle = true;
                }
                
            }
            

        }
        
        public Main(): void 
        {
            this.addChild(this._forest);

            this.addChild(this._player);

            this._enemies.forEach(enemy => {
                this.addChild(enemy);
            });

            this.addChild(this._labelArea);
            this.addChild(this._lifeLabel);
            this.addChild(this._bombsLabel);
            // this.addChild(this._ocean);

            // this.addChild(this._island);

            // this.addChild(this._plane);

            // this._clouds.forEach(cloud => {
            //     this.addChild(cloud);
            // });

            // this.addChild(this._scoreBoard.LivesLabel);

            // this.addChild(this._scoreBoard.ScoreLabel);
        }

        public UpdateLabels(): void
        {
            this.removeChild(this._lifeLabel);
            this.removeChild(this._bombsLabel);
            this.removeChild(this._scoreLabel);
           
            this._lifeLabel = new objects.Label("Life: " + this._player.Life, "20px", "Consolas", this._labelColor, 0, 0, false);
            this._bombsLabel = new objects.Label("Bombs: " + this._player.BombCount, "20px", "Consolas", this._labelColor, 0, 25, false);
            this._scoreLabel = new objects.Label("Score: " + this._player.Score, "20px", "Consolas", this._labelColor, config.Game.SCREEN_WIDTH/2, 0, false);

            this.addChild(this._lifeLabel);
            this.addChild(this._bombsLabel);
            this.addChild(this._scoreLabel);
        }

        public DrawRectangle(x:number, y:number, w:number, h:number, color:string): createjs.Shape
        {
            let shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        }

        public Clean():void
        {
            // this._plane.engineSound.stop();
            this.removeAllChildren();
        }

        
    }
}