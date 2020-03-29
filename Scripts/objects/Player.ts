module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _up:boolean;
        private _down:boolean;
        private _left:boolean;
        private _right:boolean;
        private _speed:number = 2;

        private _isThrowing:boolean;
        private _throwingStars:Array<objects.ThrowingStar>;
        private _reloadSpeed:number = 15;
        private _reloadCounter:number = 0;

        // PUBLIC PROPERTIES
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
            this._throwingStars = new Array<ThrowingStar>();
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
            // console.log('(x, y): (' + this.x + ', ' + this.y + ')');
            // console.log('(regX, regY): (' + this.regX + ', ' + this.regY + ')');
            // console.log('position(x, y): (' + this.position.x + ', ' + this.position.y + ')');
            // console.log(this.rotation);
            if(this._isThrowing)
            {
                if(this._reloadCounter == 0)
                {
                    let star = new objects.ThrowingStar(this.x, this.y);
                    this._throwingStars.push(star);
                    config.Game.CURRENT_SCENE.addChild(star);
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
            this._checkBounds();
        }

        public Reset(): void 
        {
        }

        
    }
}