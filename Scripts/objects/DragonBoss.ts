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

        // PUBLIC PROPERTIES

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
        }
        public Update(): void 
        {
            this._idleCounter++;
            if(this._idleCounter == 0)
            {
                this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle1")).image;
            }
            if(this._idleCounter == 15)
            {
                this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle2")).image;
            }
            if(this._idleCounter == 30)
            {
                this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("dragon_boss_idle3")).image;
            }
            if(this._idleCounter == 45)
            {
                this._idleCounter = 0;
            }
        }
        public Reset(): void 
        {
        }
        
    }
}