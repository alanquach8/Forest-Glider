module objects
{
    /**
     * Author: Alan Quach
     * Student Number: 300974326
     * @export
     * @class ThrowingStar
     * @extends {GameObject}
     */
    export class ThrowingStar extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _speed:number = 20;
        private _damage:number = 1;
        private _impact:boolean = false;
        private _playedImpactSound:boolean = false;
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
            if(this._impact)
            {
                this.alpha -= 0.1;
                this._speed = 0;
                this._damage = 0;
            }
        }
        public Reset(): void 
        {
            
        }

        /**
         * Animation + sound for when star hits en enemy
         *
         * @memberof ThrowingStar
         */
        public Impact(): void
        {
            this.image = new createjs.Bitmap(config.Game.ASSETS.getResult("star_impact")).image;
            if(!this._playedImpactSound)
            {
                createjs.Sound.play("throwing_star_impact");
                this._playedImpactSound = true;
            }
            
            this._impact = true;
        }

        public IsOffScreen(): boolean
        {
            return this.x > config.Game.SCREEN_WIDTH+this.width;
        }
        
    }
}