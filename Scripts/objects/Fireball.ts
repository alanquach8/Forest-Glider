module objects
{
    export class Fireball extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _towards: objects.Vector2;
        private _speed: number;
        private _damage: number;
        // PUBLIC PROPERTIES
        public get Damage():number
        {
            return this._damage;
        }
        // CONSTRUCTOR
        constructor(x:number, y:number, player_x:number, player_y:number)
        {
            super(config.Game.ASSETS.getResult("fireball"), x, y, true)
            // player's x,y position
            // speed
            // see Vector2 methods
            // get fireball image
            this._towards = new objects.Vector2(player_x, player_y);
            this.Start();
        }
        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
        }
        // PUBLIC METHODS
        public Start(): void 
        {
            this._speed = 5;
            this._damage = 2;
            let x = -(this.x - this._towards.x);
            let y = -(this.y - this._towards.y);
            this._towards = new objects.Vector2(x, y);
            this._towards.normalize();
        }
        public Update(): void 
        {
            this.position = new objects.Vector2(this.x+(this._towards.x*this._speed), this.y+(this._towards.y*this._speed));
        }
        public Reset(): void 
        {
        }

        public IsOffScreen(): boolean
        {
            return this.x < -this.width || this.x > config.Game.SCREEN_WIDTH+this.width || this.y < -this.height || this.y > config.Game.SCREEN_HEIGHT+this.height;
        }
        
    }
}