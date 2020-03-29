module objects
{
    export class ThrowingStar extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _speed:number = 20;
        // PUBLIC PROPERTIES
        public get Speed():number {
            return this._speed;
        }
        public set Speed(value:number) {
            this._speed = value;
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
            this.x += this._speed;
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