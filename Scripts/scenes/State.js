"use strict";
var scenes;
(function (scenes) {
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["INSTRUCTIONS1"] = 1] = "INSTRUCTIONS1";
        State[State["INSTRUCTIONS2"] = 2] = "INSTRUCTIONS2";
        State[State["INSTRUCTIONS3"] = 3] = "INSTRUCTIONS3";
        State[State["MINIGAMES"] = 4] = "MINIGAMES";
        State[State["DODGE"] = 5] = "DODGE";
        State[State["TARGET"] = 6] = "TARGET";
        State[State["CHARACTER_SELECT"] = 7] = "CHARACTER_SELECT";
        State[State["PLAY"] = 8] = "PLAY";
        State[State["WIN"] = 9] = "WIN";
        State[State["LOSE"] = 10] = "LOSE";
        State[State["NUM_OF_SCENES"] = 11] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map