module objects
{
    export class DragonBoss extends Enemy
    {
        // PRIVATE INSTANCE MEMBERS
        protected _speed: number;
        protected _life: number;
        protected _isDying: boolean;
        protected _isDead: boolean;
        protected _damage: number = 1;
        protected _points: number = 10;
        private _idleCounter: number = 0;
        private _startBattle: boolean = false;
        private _attackCounter: number = 0;
        private _attackAt: number = 600;

        private _idle: boolean = true;
        private _attackCode: number;

        private _spawns: Array<objects.Enemy>;
        private _spawnCount: number = 5;
        private _spawnCounter: number = 0; // counts from 0 to spawnAt
        private _spawnAt: number = 60;
        private _spawned: number = 0; // counts from 0 to spawnCount

        private _prefireCount: number = 100;
        private _prefireCounter: number = 0;
        private _fireballCount: number = 3;
        private _fireballCounter: number = 0;
        private _fireballDelay: number = 60;
        private _fireballDelayCounter: number = 0;
        private _fireballs: Array<objects.Fireball>;

        // PUBLIC PROPERTIES
        public set StartBattle(value:boolean)
        {
            this._startBattle = value;
        }
        public get Spawns(): Array<objects.Enemy>
        {
            return this._spawns;
        }
        public get Fireballs(): Array<objects.Fireball>
        {
            return this._fireballs;
        }

        // CONSTRUCTOR
        constructor(imageString:object, x:number, y:number, isCentered:boolean = true)
        {
            super(imageString, x, y, isCentered);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
        }
        // PUBLIC METHODS
        public Start(): void 
        {
            this._speed = 0;
            this._life = 20;
            this._isDead = false;
            this._points = 20;
            this._spawns = Array<objects.Enemy>();
            this._fireballs = Array<objects.Fireball>();
        }
        public Update(): void 
        {
            if(!this._isDying)
            {
                if(this._life <= 0)
                {
                    this._isDying = true;
                }
                if(this._idle)
                {
                    this._idleCounter++;
                    if(this._idleCounter == 0)
                    {
                        this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle1")).image;
                    }
                    if(this._idleCounter == 20)
                    {
                        this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle2")).image;
                    }
                    if(this._idleCounter == 40)
                    {
                        this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle3")).image;
                    }
                    if(this._idleCounter == 59)
                    {
                        this._idleCounter = 0;
                    }
                    this._attackCounter++;
                    if(this._attackCounter == this._attackAt)
                    {
                        this._idle = false;
                        this._attackCounter = 0;
                        this._attackCode = Math.floor(util.Mathf.RandomRange(1,2));
                    }
                } else {
                    // ATTACK
                    if(this._attackCode == 3)
                    {
                        this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_spawn")).image;
                        if(this._spawned != this._spawnCount)
                        {
                            this._spawnCounter++;
                            if(this._spawnCounter == this._spawnAt)
                            {
                                let dragon = Math.floor(util.Mathf.RandomRange(1,2)) == 1 ? "baby_dragon_green" : "baby_dragon_red";
                                let spawn = new objects.BabyDragon(config.Game.ASSETS.getResult(dragon), this.x, this.y);
                                spawn.Speed = 1;
                                this.Spawns.push(spawn);
                                this._spawned++;
                                this._spawnCounter = 0;
                            }
                        } else {
                            this._idle = true;
                            this._spawned = 0;
                            this._spawnCounter = 0;
                        }
                    } else {
                        if(this._prefireCounter != this._prefireCount)
                        {
                            this._prefireCounter++;
                            this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_prefire")).image;
                        } else {
                            this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_fire")).image;
                            if(this._fireballCounter != this._fireballCount)
                            {
                                if(this._fireballDelayCounter != this._fireballDelay)
                                {
                                    this._fireballDelayCounter++;
                                } else {
                                    this._fireballCounter++;
                                    this._fireballDelayCounter = 0;
                                    // spit fire
                                    console.log('spit fire');
                                    let fireball = new objects.Fireball(this.x-70, this.y-10, config.Game.PLAYER.x, config.Game.PLAYER.y);
                                    this._fireballs.push(fireball);
                                    config.Game.CURRENT_SCENE.addChild(fireball);
                                }
                            } else {
                                this._idle = true;
                                this._fireballCounter = 0;
                                this._fireballDelayCounter = 0;
                                this._prefireCounter = 0;
                            }
                        }
                    }

                }
            } else { // isDying = true
                this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_dying")).image;
                this.alpha -= 0.01;
                if(this.alpha <= 0)
                {
                    this._isDead = true;
                }
            }
            
        }
        public Reset(): void 
        {
        }
        
    }
}