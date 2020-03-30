module objects
{
    export abstract class Enemy extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        // life, points, speed
        // speed
        protected abstract _speed:number;
        protected abstract _life:number;
        protected abstract _isDying:boolean;
        protected abstract _isDead:boolean;
        protected abstract _damage:number;
        protected abstract _points:number;

        // PUBLIC PROPERTIES
        get Speed():number
        {
            return this._speed;
        }
        set Speed(value:number)
        {
            this._speed = value;
        }
        get Life():number
        {
            return this._life;
        }
        set Life(value:number)
        {
            this._life = value;
        }
        get IsDead():boolean
        {
            return this._isDead;
        }
        set IsDead(value:boolean)
        {
            this._isDead = value;
        }
        get Damage():number
        {
            return this._damage;
        }
        set Damage(value:number)
        {
            this._damage = value;
        }
        get Points():number
        {
            return this._points;
        }
        set Points(value:number)
        {
            this._points = value;
        }

        // CONSTRUCTOR
        constructor(imageString:object, x:number, y:number)
        {
            super(imageString, x, y, true);
        }

        // PRIVATE METHODS
        protected abstract _checkBounds(): void;

        // PUBLIC METHODS
        public abstract Start(): void;
        public abstract Update(): void;
        public abstract Reset(): void;
        
    }
}