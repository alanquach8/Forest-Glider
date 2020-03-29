module objects
{
    export class ThrowingStar extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _speed:number = 20;
        private _damage:number = 1;
        // PUBLIC PROPERTIES
        public get Speed():number {
            return this._speed;
        }
        public set Speed(value:number) {
            this._speed = value;
        }
        public get Damage():number {
            return this._damage;
        }
        public set Damage(value:number) {
            this._damage = value;
        }
        // CONSTRUCTOR
        constructor(x:number, y:number)
        {
            super(config.Game.ASSETS.getResult(config.Game.THROWING_STAR), x, y, true);
            this.Start();
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
            this.position = new objects.Vector2(this.x + this._speed, this.y);
        }
        public Reset(): void 
        {
            
        }

        public IsOffScreen(): boolean
        {
            return this.x > config.Game.SCREEN_WIDTH;
        }
        
    }
}