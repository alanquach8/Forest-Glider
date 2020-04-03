module objects
{
    export class Forest extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _horizontalSpeed?:number;

        // PUBLIC PROPERTIES
        public get HorizontalSpeed():number
        {
            return this._horizontalSpeed;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult("forest"));

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            if(this.x + this.width <= 960)
            {
                this.Reset();
            }
            
        }

        // PUBLIC METHODS
        public Start(): void 
        {
            this._horizontalSpeed = 3;
            this.alpha = 0.90;
        }
        public Update(): void 
        {
            this.position = Vector2.add(this.position, new Vector2(-this._horizontalSpeed, 0));
            this._checkBounds();
        }
        public Reset(): void 
        {
            this.position = new Vector2(0, 0);
        }
        
    }
}