"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var assetManifest = [
        // images
        { id: "back_button", src: "./Assets/images/backButton.png" },
        { id: "next_button", src: "./Assets/images/nextButton.png" },
        { id: "play_button", src: "./Assets/images/playButton.png" },
        { id: "forest", src: "./Assets/images/forest.png" },
        { id: "select_player_m", src: "./Assets/images/select_player_m.png" },
        { id: "select_player_f", src: "./Assets/images/select_player_f.png" },
        { id: "player_m", src: "./Assets/images/player_m.png" },
        { id: "player_m_dead", src: "./Assets/images/player_m_dead.png" },
        { id: "player_m_dead_big", src: "./Assets/images/player_m_dead_big.png" },
        { id: "player_m_win", src: "./Assets/images/player_m_win.png" },
        { id: "player_f", src: "./Assets/images/player_f.png" },
        { id: "player_f_dead", src: "./Assets/images/player_f_dead.png" },
        { id: "player_f_dead_big", src: "./Assets/images/player_f_dead_big.png" },
        { id: "player_f_win", src: "./Assets/images/player_f_win.png" },
        { id: "star_m", src: "./Assets/images/star_m.png" },
        { id: "star_f", src: "./Assets/images/star_f.png" },
        { id: "star_impact", src: "./Assets/images/star_impact.png" },
        { id: "bomb", src: "./Assets/images/bomb.png" },
        { id: "bomb_explosion", src: "./Assets/images/bomb_explosion.png" },
        { id: "baby_dragon_green", src: "./Assets/images/baby_dragon_green.png" },
        { id: "baby_dragon_red", src: "./Assets/images/baby_dragon_red.png" },
        { id: "dragon_boss_idle1", src: "./Assets/images/dragon_boss_idle1.png" },
        { id: "dragon_boss_idle2", src: "./Assets/images/dragon_boss_idle2.png" },
        { id: "dragon_boss_idle3", src: "./Assets/images/dragon_boss_idle3.png" },
        { id: "dragon_boss_spawn", src: "./Assets/images/dragon_boss_spawn.png" },
        { id: "dragon_boss_dying", src: "./Assets/images/dragon_boss_dying.png" },
        { id: "try_again_button", src: "./Assets/images/try_again_button.png" },
        { id: "play_again_button", src: "./Assets/images/play_again_button.png" },
        { id: "main_menu_button", src: "./Assets/images/main_menu_button.png" },
        { id: "instructions_button", src: "./Assets/images/instructionsButton.png" },
        { id: "cheat_button", src: "./Assets/images/cheatButton.png" },
        { id: "instructions1", src: "./Assets/images/instructions1.png" },
        { id: "instructions2", src: "./Assets/images/instructions2.png" },
        // audio
        { id: "background_theme", src: "./Assets/audio/background_theme.ogg" },
        { id: "boss_theme", src: "./Assets/audio/boss_theme.ogg" },
        { id: "throwing_star", src: "./Assets/audio/throwing_star.ogg" },
        { id: "throwing_star_impact", src: "./Assets/audio/throwing_star_impact.ogg" },
        { id: "explosion", src: "./Assets/audio/explosion.ogg" },
        { id: "player_gets_hit", src: "./Assets/audio/player_gets_hit.wav" }
    ];
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.Clean();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.INSTRUCTIONS1:
                console.log("switch to Instructions1 Scene");
                currentScene = new scenes.Instructions1();
                break;
            case scenes.State.INSTRUCTIONS2:
                console.log("switch to Instructions2 Scene");
                currentScene = new scenes.Instructions2();
                break;
            case scenes.State.CHARACTER_SELECT:
                console.log("switch to Character Select Scene");
                currentScene = new scenes.CharacterSelect();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.WIN:
                console.log("switch to Win Scene");
                currentScene = new scenes.Win();
                break;
            case scenes.State.LOSE:
                console.log("switch to Lose Scene");
                currentScene = new scenes.Lose();
                break;
        }
        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map