module scenes
{
    export class CharacterSelect extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _selectLabel:objects.Label;
        private _background:createjs.Shape;

        private _charMBorder:createjs.Shape;
        private _charFBorder:createjs.Shape;
        private _characterM:objects.Button;
        private _characterF:objects.Button;

        private _backButton:objects.Button;
        private _playButton:objects.Button;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        public Start(): void 
        {
            this._selectLabel = new objects.Label("Select Character", "60px", "Consolas", "#FFFF00", 0, 0, false);
            this._background = this.DrawRectangle(0, 0, config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT, "black");

            this._charMBorder = this.DrawRectangle(45, 95, 250, 250, "#00FF33");
            this._charFBorder = this.DrawRectangle(345, 95, 250, 250, "#000000");
            this._characterM = new objects.Button(config.Game.ASSETS.getResult("select_player_m"), 50, 100);
            this._characterF = new objects.Button(config.Game.ASSETS.getResult("select_player_f"), 350, 100);
            config.Game.SELECTED_CHARACTER = "player_m";
            config.Game.THROWING_STAR = "star_m";

            this._backButton = new objects.Button(config.Game.ASSETS.getResult("back_button"), 100, 400, true);
            this._playButton = new objects.Button(config.Game.ASSETS.getResult("play_button"), config.Game.SCREEN_WIDTH/2, 400, true);

            this._characterM.on("click", ()=>{
                config.Game.SELECTED_CHARACTER = "player_m";
                config.Game.THROWING_STAR = "star_m";
                this._charMBorder = this.DrawRectangle(45, 95, 250, 250, "#00FF33");
                this._charFBorder = this.DrawRectangle(345, 95, 250, 250, "#000000");
                this.Update();
            });

            this._characterF.on("click", ()=>{
                config.Game.SELECTED_CHARACTER = "player_f";
                config.Game.THROWING_STAR = "star_f";
                this._charMBorder = this.DrawRectangle(45, 95, 250, 250, "#000000");
                this._charFBorder = this.DrawRectangle(345, 95, 250, 250, "#00FF33");
                this.Update();
            });

            this._backButton.on("click", ()=>{
                config.Game.SELECTED_CHARACTER = "player_m";
                config.Game.SCENE = scenes.State.START;
            });

            this._playButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });

            this.Main();
        }
        public Update(): void 
        {
            this.removeAllChildren();
            this.Main();
        }
        public Main(): void 
        {
            this.addChild(this._background);
            this.addChild(this._selectLabel);
            this.addChild(this._charMBorder);
            this.addChild(this._charFBorder);
            this.addChild(this._characterM);
            this.addChild(this._characterF);
            this.addChild(this._backButton);
            this.addChild(this._playButton);
        }
        public Clean(): void 
        {
            this.removeAllChildren();
        }

        public DrawRectangle(x:number, y:number, w:number, h:number, color:string): createjs.Shape
        {
            let shape = new createjs.Shape();
            shape.graphics.beginFill(color);
            shape.graphics.drawRect(x, y, w, h);
            shape.graphics.endFill();
            return shape;
        }
        
    }
}