module objects
{
    /**
     * Author: Alan Quach
     * Student Number: 300974326
     * Abstract class that all enemies will inherit from
     * @export
     * @abstract
     * @class Enemy
     * @extends {GameObject}
     */
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
        private _hitByExplosion:boolean = false;

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
        get HitByExplosion():boolean
        {
            return this._hitByExplosion;
        }
        set HitByExplosion(value:boolean)
        {
            this._hitByExplosion = value;
        }

        // CONSTRUCTOR
        constructor(imageString:object, x:number, y:number, isCentered:boolean = true)
        {
            super(imageString, x, y, isCentered);
        }

        // PRIVATE METHODS
        protected abstract _checkBounds(): void;

        // PUBLIC METHODS
        public abstract Start(): void;
        public abstract Update(): void;
        public abstract Reset(): void;

        public IsOffScreen(): boolean
        {
            return this.x < -110;
        }
        
    }
}