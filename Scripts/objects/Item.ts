module objects
{
    /**
     * Author: Alan Quach
     * Student Number: 300974326
     * @export
     * @class Item
     * @extends {GameObject}
     */
    export class Item extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _id:number;
        private _obtained:boolean;
        // PUBLIC PROPERTIES
        public get Obtained():boolean
        {
            return this._obtained;
        }
        public set Obtained(value:boolean)
        {
            this._obtained = value;
        }
        // CONSTRUCTOR
        constructor(id:number, x:number, y:number)
        {
            if(id == 1)
            {
                super(config.Game.ASSETS.getResult("bomb_item"), x, y, true);
            }
            if(id == 2)
            {
                super(config.Game.ASSETS.getResult("life_item"), x, y, true);
            }
            if(id == 3)
            {
                super(config.Game.ASSETS.getResult("star_item"), x, y, true);
            }
            this._id = id;
            this._obtained = false;
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
            this.position = new objects.Vector2(this.x - 0.5, this.y);
        }
        public Reset(): void 
        {
        }

        public Reward(): void
        {
            config.Game.PLAYER.Score += 5;
            if(this._id == 1)
            {
                config.Game.PLAYER.BombCount++;
            }
            if(this._id == 2)
            {
                config.Game.PLAYER.Life++;
            }
            if(this._id == 3)
            {
                // reload speed = 5 is fastest
                if(config.Game.PLAYER.ReloadSpeed > 5) 
                {
                    config.Game.PLAYER.ReloadSpeed -= 5;
                }
            }
        }

        public IsOffScreen():boolean
        {
            return this.x < -this.width;
        }
        
    }
}