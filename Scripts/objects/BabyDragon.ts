module objects
{
    export class BabyDragon extends Enemy
    {
        
        // PRIVATE INSTANCE MEMBERS
        protected _speed: number;
        protected _life: number;
        protected _isDead: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(imageString:object, x:number, y:number)
        {
            super(imageString, x, y);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
        }

        // PUBLIC METHODS
        public Start(): void 
        {
            this._speed = 1;
            this._life = 2;
            this._isDead = false;
        }
        public Update(): void 
        {
            // Baby Dragons fly leftward, swinging up/down
            // this.y - math.sin() - radians
            this.position = new objects.Vector2(this.x-this._speed, this.y);
            if(this.Life == 0)
            {
                this._isDead = true;
                // death animation before setting isDead=true
            }
        }
        public Reset(): void 
        {
        }
        
    }
}