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
        private _spawns: Array<objects.Enemy>;
        private _spawnCount: number = 5;
        private _spawnCounter: number = 0; // counts from 0 to spawnAt
        private _spawnAt: number = 60;
        private _spawned: number = 0; // counts from 0 to spawnCount

        // PUBLIC PROPERTIES
        public set StartBattle(value:boolean)
        {
            this._startBattle = value;
        }
        public get Spawns(): Array<objects.Enemy>
        {
            return this._spawns;
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
            this._life = 10;
            this._isDead = false;
            this._points = 20;
            this._spawns = Array<objects.Enemy>();
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
                    }
                } else {
                    // ATTACK
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
                    // this._attackCounter = 0;
                    // let attack = Math.floor(util.Mathf.RandomRange(1,10));
                    // console.log('attack: ' + attack)
                    // if(attack < 11)
                    // {
                    //     for(let i=0; i<this._spawnCount; i++)
                    //     {
                    //         let spawn = new objects.BabyDragon(config.Game.ASSETS.getResult("baby_dragon_green"), this.x, this.y);
                    //         spawn.Speed = 0;
                    //         this._spawns.push(spawn);
                    //     }
                    // }

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