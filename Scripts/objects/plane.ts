module objects
{
    export class Plane extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalPosition:number;
        private _engineSound : createjs.AbstractSoundInstance;

        // PUBLIC PROPERTIES
        
        // readonly property
        public get engineSound() : createjs.AbstractSoundInstance 
        {
            return this._engineSound;
        }
        

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult("plane"), 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // left boundary
            if(this.position.x <= this.halfWidth)
            {
                this.position = new Vector2(this.halfWidth, this.position.y);
            }

            // right boundary

            if(this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth)
            {
                this.position = new Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        }        

        private _move(): void
        {
            let newPositionX = util.Mathf.Lerp(this.position.x, this.stage.mouseX, 0.05);
            this.position = new Vector2(newPositionX, this._verticalPosition);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.name = "plane";
            this._verticalPosition = 430; // locked to the bottom of the screen
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.volume = 0.25;
            this._engineSound.loop = -1; // loop forever
        }

        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }

        public Reset(): void 
        {

        }

        
    }

}