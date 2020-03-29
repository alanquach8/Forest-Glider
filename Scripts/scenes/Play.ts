module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _forest?: objects.Forest;
        private _player?: objects.Player;

        private _enemies?: Array<objects.Enemy>;
        private _noOfEnemies: number = 10;
        
        private _explosions?: Array<objects.Explosion>;
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
            this._forest = new objects.Forest();
            this._player = new objects.Player();

            this._enemies = new Array<objects.Enemy>();
            let anEnemy = new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), -100, -100);
            anEnemy.Speed = 0;
            this._enemies.push(anEnemy); // 1 enemy offscreen for update function to function properly
            for(let i=0; i<this._noOfEnemies; i++)
            {
                this._enemies.push(new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), Math.floor(util.Mathf.RandomRange(500, 2000)), Math.floor(util.Mathf.RandomRange(50, 400))));
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
            this._forest.Update();
            this._player.Update();

            this._enemies.forEach(enemy => {
                this._player.ThrowingStars.forEach(star => {
                    managers.Collision.AABBCheck(star, enemy);
                    if(enemy.isColliding)
                    {
                        star.Impact()
                        // this.removeChild(star);
                        // this._player.ThrowingStars.splice(this._player.ThrowingStars.indexOf(star), 1);
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
                    explosion.Update();
                    if(explosion.alpha <= 0)
                    {
                        this.removeChild(explosion);
                        this._explosions.splice(this._explosions.indexOf(explosion), 1);
                    }
                });
                enemy.Update();
                if(enemy.IsDead)
                {
                    this._enemies.splice(this._enemies.indexOf(enemy), 1);
                    this.removeChild(enemy);
                    console.log(this._enemies.length);
                }
            });
            // array of enemies - update
            // boss - update
            // collisions
                // collision: obj1 instanceof, obj2 instanceof



        //    this._ocean.Update();

        //    this._island.Update();

        //    this._plane.Update();

        //    managers.Collision.squaredRadiusCheck(this._plane, this._island);

        //    this._clouds.forEach(cloud => {
        //        cloud.Update();
        //        managers.Collision.squaredRadiusCheck(this._plane, cloud);
        //    });

        }
        
        public Main(): void 
        {
            this.addChild(this._forest);

            this.addChild(this._player);

            this._enemies.forEach(enemy => {
                this.addChild(enemy);
            });
            // this.addChild(this._ocean);

            // this.addChild(this._island);

            // this.addChild(this._plane);

            // this._clouds.forEach(cloud => {
            //     this.addChild(cloud);
            // });

            // this.addChild(this._scoreBoard.LivesLabel);

            // this.addChild(this._scoreBoard.ScoreLabel);
        }

        public Clean():void
        {
            // this._plane.engineSound.stop();
            this.removeAllChildren();
        }

        
    }
}