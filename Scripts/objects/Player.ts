module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _life:number = 5;
        private _score:number = 0;
        private _invincible:boolean = false;
        private _invincibleDuration = 100;
        private _invincibleCounter = 0;

        private _up:boolean;
        private _down:boolean;
        private _left:boolean;
        private _right:boolean;
        private _speed:number = 2;

        private _isThrowing:boolean;
        private _throwingStars:Array<objects.ThrowingStar>;
        private _reloadSpeed:number = 15;
        private _reloadCounter:number = 0;

        private _bombs:Array<objects.Bomb>;
        private _isThrowingBomb:boolean;
        private _bombCount:number = 50;
        private _bombReloadSpeed: number = 50;
        private _bombReloadCounter: number = 0;

        // PUBLIC PROPERTIES
        public get Life():number {
            return this._life;
        }
        public set Life(value:number) {
            this._life = value;
        }
        public get Score():number {
            return this._score;
        }
        public set Score(value:number) {
            this._score = value;
        }
        public get Invincible():boolean {
            return this._invincible;
        }
        public set Invincible(value:boolean) {
            this._invincible = value;
        }
        public get Up():boolean {
            return this._up;
        }
        public set Up(value:boolean) {
            this._up = value;
        }
        public get Down():boolean {
            return this._down;
        }
        public set Down(value:boolean) {
            this._down = value;
        }
        public get Left():boolean {
            return this._left;
        }
        public set Left(value:boolean) {
            this._left = value;
        }
        public get Right():boolean {
            return this._right;
        }
        public set Right(value:boolean) {
            this._right = value;
        }
        public get Speed():number {
            return this._speed;
        }
        public set Speed(value:number) {
            this._speed = value;
        }
        public get ThrowingStars():Array<objects.ThrowingStar> {
            return this._throwingStars;
        }
        public set ThrowingStars(value:Array<objects.ThrowingStar>) {
            this._throwingStars = value;
        }
        public get Bombs():Array<objects.Bomb> {
            return this._bombs;
        }
        public set Bombs(value:Array<objects.Bomb>) {
            this._bombs = value;
        }
        public get BombCount():number {
            return this._bombCount;
        }
        public set BombCount(value:number) {
            this._bombCount = value;
        }
        

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult(config.Game.SELECTED_CHARACTER), 50, config.Game.SCREEN_HEIGHT/2, true);
            // player_f

            window.addEventListener('keyup', (e) => {
                switch(e.code) {
                    case "KeyW":
                        this._up = false;
                        this.rotation = 0;
                        break;
                    case "KeyS":
                        this._down = false;
                        this.rotation = 0;
                        break;
                    case "KeyA":
                        this._left = false;
                        break;
                    case "KeyD":
                        this._right = false;
                        break;
                    case "KeyJ":
                        this._isThrowing = false;
                        break;
                    case "KeyK":
                        this._isThrowingBomb = false;
                        break;
                }
            });

            window.addEventListener('keydown', (e) => {
                switch(e.code) {
                    case "KeyW":
                        this._up = true;
                        this.rotation = -15;
                        break;
                    case "KeyS":
                        this._down = true;
                        this.rotation = 15;
                        break;
                    case "KeyA":
                        this._left = true;
                        break;
                    case "KeyD":
                        this._right = true;
                        break;
                    case "KeyJ":
                        this._isThrowing = true;
                        break;
                    case "KeyK":
                        this._isThrowingBomb = true;
                        break;
                }
            });
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            if(this.x - this.halfWidth < 0) {
                this.x = this.halfWidth;
            }
            if(this.x + this.halfWidth > config.Game.SCREEN_WIDTH) {
                this.x = config.Game.SCREEN_WIDTH - this.halfWidth;
            }
            if(this.y - this.halfHeight < 0) {
                this.y = this.halfHeight;
            }
            if(this.y + this.halfHeight > config.Game.SCREEN_HEIGHT) {
                this.y = config.Game.SCREEN_HEIGHT - this.halfHeight;
            }
        }

        // PUBLIC METHODS


        public Start(): void 
        {
            this._throwingStars = new Array<objects.ThrowingStar>();
            this._bombs = new Array<objects.Bomb>();
        }

        public Update(): void 
        {
            if(this._up)
            {
                this.position = new objects.Vector2(this.x, this.y-this._speed);
                //this.y -= this._speed;
            }
            if(this._down)
            {
                this.position = new objects.Vector2(this.x, this.y+this._speed);
                //this.y += this._speed;
            }
            if(this._left)
            {
                this.position = new objects.Vector2(this.x-this._speed, this.y);
                //this.x -= this._speed;
            }
            if(this._right)
            {
                this.position = new objects.Vector2(this.x+this._speed, this.y);
                //this.x += this._speed;
            }

            if(this._isThrowing)
            {
                if(this._reloadCounter == 0)
                {
                    let star = new objects.ThrowingStar(this.x, this.y);
                    this._throwingStars.push(star);
                    config.Game.CURRENT_SCENE.addChild(star);
                    createjs.Sound.play("throwing_star");
                    this._reloadCounter = this._reloadSpeed;
                } else {
                    this._reloadCounter--;
                }
                
            } else {
                if(this._reloadCounter != 0)
                {
                    this._reloadCounter--;
                }
            }
            this._throwingStars.forEach(star => {
                star.Update();
                if(star.IsOffScreen())
                {
                    this._throwingStars.splice(this._throwingStars.indexOf(star), 1);
                    config.Game.CURRENT_SCENE.removeChild(star);
                }
            });

            if(this._isThrowingBomb && this._bombCount > 0)
            {
                if(this._bombReloadCounter == 0)
                {
                    let bomb = new objects.Bomb(this.x, this.y);
                    this._bombs.push(bomb);
                    config.Game.CURRENT_SCENE.addChild(bomb);
                    this._bombReloadCounter = this._bombReloadSpeed;
                    this._bombCount--;
                } else {
                    this._bombReloadCounter--;
                }
            } else {
                if(this._bombReloadCounter != 0)
                {
                    this._bombReloadCounter--;
                }
            }
            this._bombs.forEach(bomb => {
                bomb.Update();
            });

            if(this._invincible)
            {
                this._invincibleCounter--;
                if(this._invincibleCounter % 5 == 0)
                {
                    this.alpha == 0.3 ? this.alpha = 0.8 : this.alpha = 0.3;
                }
                if(this._invincibleCounter <= 0)
                {
                    this.isColliding = false;
                    this._invincible = false;
                    this.alpha = 1;
                }
            }
            this._checkBounds();
        }

        public GotHit(): void
        {
            createjs.Sound.play("player_gets_hit");
            this._invincible = true;
            this._invincibleCounter = this._invincibleDuration;
            this.alpha = 0.3;
        }

        public Reset(): void 
        {
        }

        
    }
}