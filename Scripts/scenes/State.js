"use strict";
var scenes;
(function (scenes) {
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["INSTRUCTIONS1"] = 1] = "INSTRUCTIONS1";
        State[State["INSTRUCTIONS2"] = 2] = "INSTRUCTIONS2";
        State[State["CHARACTER_SELECT"] = 3] = "CHARACTER_SELECT";
        State[State["PLAY"] = 4] = "PLAY";
        State[State["WIN"] = 5] = "WIN";
        State[State["LOSE"] = 6] = "LOSE";
        State[State["NUM_OF_SCENES"] = 7] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map