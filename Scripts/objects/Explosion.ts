module objects
{
    export class Explosion extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _damage:number;
        // PUBLIC PROPERTIES
        public get Damage():number 
        {
            return this._damage;
        }
        public set Damage(value:number) 
        {
            this._damage = value;
        }
        // CONSTRUCTOR
        constructor(x:number, y:number, damage:number)
        {
            super(config.Game.ASSETS.getResult("bomb_explosion"), x, y, true);
            this._damage = damage;
            this.Start();
        }
        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
        }
        // PUBLIC METHODS

        public Start(): void 
        {
            let explosionSound = createjs.Sound.play("explosion");
            explosionSound.volume = 0.1;
        }
        public Update(): void 
        {
            this.alpha -= 0.05;
        }
        public Reset(): void 
        {
        }
    }
}