module objects
{
    /**
     * Author: Alan Quach
     * Student Number: 300974326
     * @export
     * @class Bomb
     * @extends {GameObject}
     */
    export class Bomb extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _distanceTravelled: number = 0;
        private _distanceUntilExplosion: number = 200;
        private _speed: number = 5;
        private _damage: number = 5;
        private _exploded: boolean = false;
        // bomb reload on player, bomb count on player

        // PUBLIC PROPERTIES
        public get Exploded(): boolean 
        {
            return this._exploded;
        }
        public set Exploded(value:boolean)
        {
            this._exploded = value;
        }
        public get Damage(): number
        {
            return this._damage;
        }
        public set Damage(value:number)
        {
            this._damage = value;
        }

        // CONSTRUCTOR
        constructor(x:number, y:number)
        {
            super(config.Game.ASSETS.getResult("bomb"), x, y, true);
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
        }

        // PUBLIC METHODS
        public Start(): void 
        {
        }
        public Update(): void 
        {
            this.position = new objects.Vector2(this.x+this._speed, this.y);
            this._distanceTravelled += this._speed;
            if((this._distanceTravelled >= this._distanceUntilExplosion) && !this._exploded)
            {
                this.Explode();
            }
            if(this._exploded)
            {
                this.alpha -= 0.5;
            }
        }

        public Explode(): void
        {
            this._exploded = true;
            this._speed = 0;
        }
        public Reset(): void 
        {
        }
        
    }
}