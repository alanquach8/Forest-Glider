module objects
{
    /**
     * Author: Alan Quach
     * Student Number: 300974326
     * @export
     * @class BabyDragon
     * @extends {Enemy}
     */
    export class BabyDragon extends Enemy
    {
        
        // PRIVATE INSTANCE MEMBERS
        protected _speed: number;
        protected _life: number;
        protected _isDying: boolean;
        protected _isDead: boolean;
        protected _damage: number = 1;
        protected _points: number = 1;

        private _spawnPosition: objects.Vector2;
        private _float: number;
        private _floatSpeed: number = 3;
        private _up: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(imageString:object, x:number, y:number, isCentered:boolean = true)
        {
            super(imageString, x, y, isCentered);
            this._spawnPosition = new objects.Vector2(x, y);
            this._float = Math.floor(util.Mathf.RandomRange(10, 100));
            this._float % 2 == 0 ? this._up = true : this._up = false;
            console.log(this._up);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
        }

        // PUBLIC METHODS
        public Start(): void 
        {
            this._speed = Math.floor(util.Mathf.RandomRange(1,3));
            this._life = 2;
            this._isDead = false;
        }
        public Update(): void 
        {
            // Baby Dragons fly leftward, swinging up/down
            // this.y - math.sin() - radians
            if(this._up)
            {
                this.position = new objects.Vector2(this.x-this._speed, this.y+this._floatSpeed);
                if(this.y >= this._spawnPosition.y + this._float)
                {
                    this._up = false;
                }
            } else {
                this.position = new objects.Vector2(this.x-this._speed, this.y-this._floatSpeed);
                if(this.y <= this._spawnPosition.y - this._float)
                {
                    this._up = true;
                }
            }
            
            if(this.Life <= 0)
            {
                this._isDying = true;
                // death animation before setting isDead=true
            }
            if(this._isDying)
            {
                this._speed = 0;
                this.alpha -= 0.1;
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