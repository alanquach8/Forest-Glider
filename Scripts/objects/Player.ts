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
        }

        public Update(): void 
        {
            if(this._up)
            {
                this.y -= this._speed;
            }
            if(this._down)
            {
                this.y += this._speed;
            }
            if(this._left)
            {
                this.x -= this._speed;
            }
            if(this._right)
            {
                this.x += this._speed;
            }
            // console.log('(x, y): (' + this.x + ', ' + this.y + ')');
            // console.log('(regX, regY): (' + this.regX + ', ' + this.regY + ')');
            // console.log('position(x, y): (' + this.position.x + ', ' + this.position.y + ')');
            // console.log(this.rotation);
            this._checkBounds();
        }

        public Reset(): void 
        {
        }

        
    }
}