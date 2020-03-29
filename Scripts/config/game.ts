module config
{
    export class Game
    {
        public static SCREEN_WIDTH:number = 640;
        public static SCREEN_HEIGHT:number = 480;
        public static SCENE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        

        public static CURRENT_SCENE: objects.Scene;
        public static SELECTED_CHARACTER: string = "player_m";
        public static THROWING_STAR: string = "star_m";




        // CURRENTLY NOT USING:
        public static CLOUD_NUM: number = 3;
        public static LIVES:number = 5;
        public static SCORE:number = 0;
        public static HIGH_SCORE:number = 0;
        public static SCORE_BOARD: managers.ScoreBoard;
    }
}